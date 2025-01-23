const express = require("express");
const { ObjectId } = require("mongodb");

const searchRouter = (db) => {
    const router = express.Router();
    const collection = db.collection("auction_items");

    // Search with pagination and sorting
    router.get("/", async (req, res) => {
        try {
            const query = req.query.q || "";
            const sortBy = req.query.sortBy || "title";
            const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;

            const results = await collection
                .find({
                    $or: [
                        { title: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } }
                    ]
                })
                .sort({ [sortBy]: sortOrder })
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray();

            res.json(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Get item by ID
    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const item = await collection.findOne({ _id: new ObjectId(id) });
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ error: "Item not found" });
            }
        } catch (error) {
            console.error("Error fetching item:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};

module.exports = searchRouter;

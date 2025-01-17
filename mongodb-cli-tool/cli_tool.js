const { MongoClient } = require("mongodb");
const express = require("express");
const yargs = require("yargs");
const searchRouter = require("./router/searchRouter");
const SEED_DATA = require("./utils/seed-data");
<<<<<<< HEAD
const cors = require("cors")
require("dotenv").config();
=======
const cors = require("cors");
require('dotenv').config();
>>>>>>> c8b3bb6 (added .env file and respective changed to the cli tool and gitignore to make use of the .env file)

const app = express();
const port = 3000;

app.use(cors());

async function seedData(db) {
    try {
        const collection = db.collection("auction_items");
        await collection.insertMany(SEED_DATA);
        console.log("Data seeded successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

async function deleteData(db) {
    try {
        const collection = db.collection("auction_items");
        await collection.deleteMany({});
        console.log("Data deleted successfully.");
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

async function performAction(action, db) {
    switch (action) {
        case "seed":
            await seedData(db);
            break;
        case "delete":
            await deleteData(db);
            break;
        default:
            console.error("Unknown action. Use 'seed' or 'delete'.");
    }
}

(async function main() {
    const argv = yargs
    .option("action", {
        alias: "a",
        choices: ["seed", "delete"],
        demandOption: true,
        describe: "Action to perform: seed or delete data.",
        type: "string"
    })
    .option("db", {
        alias: "d",
<<<<<<< HEAD
        default: process.env.MONGODB_URI, // Use environment variable for MongoDB URI
=======
        default: process.env.MONGODB_URI,
>>>>>>> c8b3bb6 (added .env file and respective changed to the cli tool and gitignore to make use of the .env file)
        describe: "MongoDB connection string.",
        type: "string"
    })
    .option("dbname", {
        alias: "n",
<<<<<<< HEAD
        default: process.env.DB_NAME, // Use environment variable for database name
=======
        default: process.env.DB_NAME,
>>>>>>> c8b3bb6 (added .env file and respective changed to the cli tool and gitignore to make use of the .env file)
        describe: "Database name.",
        type: "string"
    })
    .help()
    .argv;

    const client = new MongoClient(argv.db);

    try {
        await client.connect();
        const db = client.db(argv.dbname);

        await performAction(argv.action, db);

        // Use Routers
        app.use("/search", searchRouter(db));

        app.listen(port, () => {
            console.log(`API server running at http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
    process.on("SIGINT", async () => {
        console.log("Shutting down server...");
        await client.close();
        process.exit(0);
    });
})();

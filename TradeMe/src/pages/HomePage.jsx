import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import "./HomePage.css";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const pageSize = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null); // Reset error state
    
                // Fetch the items directly from your API
                const response = await axios.get("http://localhost:3000/search", {
                    params: { q: query },
                });
    
                // Slice the items based on page and pageSize
                const allItems = response.data || [];
                const startIndex = (page - 1) * pageSize;
                const paginatedItems = allItems.slice(startIndex, startIndex + pageSize);
    
                setItems(paginatedItems);
                setTotalPages(Math.ceil(allItems.length / pageSize)); // Calculate total pages
            } catch (error) {
                console.error("Error fetching items:", error);
                setError("Failed to fetch items. Please try again later.");
            }
        };
    
        fetchData();
    }, [query, page]);
    

    return (
        <div className="home-page">
            <SearchBar onSearch={(query) => { setQuery(query); setPage(1); }} />
            {error && <p className="error-message">{error}</p>}
            <div className="items-grid">
                {items.length === 0 ? (
                    <p>No items found for your search.</p>
                ) : (
                    items.map((item) => <ItemCard key={item._id} item={item} />)
                )}
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default HomePage;

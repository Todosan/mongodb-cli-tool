import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./SearchPage.css";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");
    const pageSize = 10;

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:3000/search", {
                params: { q: query, page, pageSize, sortBy, sortOrder },
            });
            setResults(response.data); // Always replace, not append
        } catch (err) {
            console.error("Error fetching search results:", err);
            setError("Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    }, [query, page, pageSize, sortBy, sortOrder]);

    useEffect(() => {
        fetchData(); // Fetches whenever dependencies change
    }, [fetchData]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset to first page
    };

    const toggleSortOrder = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    return (
        <div className="search-page">
            <header className="navbar">
                <h1 className="logo">Trade Me Clone</h1>
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </header>

            <main>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}

                <table className="results-table">
                    <thead>
                        <tr>
                            <th onClick={() => toggleSortOrder("title")}>
                                Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => toggleSortOrder("description")}>
                                Description {sortBy === "description" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => toggleSortOrder("start_price")}>
                                Start Price {sortBy === "start_price" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                            <th onClick={() => toggleSortOrder("reserve_price")}>
                                Reserve Price {sortBy === "reserve_price" && (sortOrder === "asc" ? "↑" : "↓")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item) => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>${item.start_price}</td>
                                <td>${item.reserve_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="pagination-button"
                    >
                        Previous
                    </button>
                    <button onClick={() => setPage(page + 1)} className="pagination-button">
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SearchPage;

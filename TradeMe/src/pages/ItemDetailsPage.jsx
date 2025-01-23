import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ItemDetailsPage.css";

const ItemDetailsPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/search/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
        <div className="item-details">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>Start Price: ${item.start_price}</p>
            <p>Reserve Price: ${item.reserve_price}</p>
        </div>
    );
};

export default ItemDetailsPage;

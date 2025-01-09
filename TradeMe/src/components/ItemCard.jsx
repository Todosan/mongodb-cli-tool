import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ item }) => (
    <div className="item-card">
        <Link to={`/item/${item._id}`}>
            <h2>{item.title}</h2>
        </Link>
        <p>{item.description}</p>
        <p>Start Price: ${item.start_price}</p>
    </div>
);

ItemCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        start_price: PropTypes.number.isRequired,
        reserve_price: PropTypes.number,
    }).isRequired,
};

export default ItemCard;

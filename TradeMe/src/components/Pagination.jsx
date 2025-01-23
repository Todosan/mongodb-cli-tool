import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="pagination">
        <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
        >
            Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
        >
            Next
        </button>
    </div>
);

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

import PropTypes from "prop-types";

import ArrowTertiary from "../assets/arrow-tertiary.svg";
import ArrowPrimary from "../assets/arrow-primary.svg";

Pagination.propTypes = {
  page: PropTypes.int,
  setPage: PropTypes.func,
  totalPages: PropTypes.int,
};

export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex w-full items-center justify-center gap-1 pt-10">
      <button
        className={`${page > 1 ? "bg-highlight hover:bg-highlight-light" : "bg-secondary hover:bg-tertiary/30"} flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50`}
        onClick={() => page > 0 && setPage(page - 1)}
        disabled={page === 1}
      >
        <img
          className="h-3 rotate-90"
          src={page > 0 ? ArrowPrimary : ArrowTertiary}
        />
      </button>
      {Array(totalPages)
        .fill()
        .map((_, index) => (
          <button
            className={`${page === index + 1 ? "bg-highlight text-primary hover:bg-highlight-light hover:text-primary" : "bg-secondary text-tertiary hover:bg-tertiary/30"} h-10 w-10 rounded-xl`}
            key={index}
            onClick={() => index === 0 && setPage(index)}
          >
            {index + 1}
          </button>
        ))}
      <button
        className={`${page < totalPages ? "bg-highlight hover:bg-highlight-light" : "bg-secondary hover:bg-tertiary/30"} flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50`}
        onClick={() => {}}
        disabled={page === totalPages}
      >
        <img className="h-3 -rotate-90" src={ArrowPrimary} />
      </button>
    </div>
  );
}

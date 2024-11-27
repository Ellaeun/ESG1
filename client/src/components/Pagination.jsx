import { useState } from "react";
import PropTypes from "prop-types";

import ArrowTertiary from "../assets/arrow-tertiary.svg";
import ArrowPrimary from "../assets/arrow-primary.svg";

Pagination.propTypes = {
  p: PropTypes.string,
};

export default function Pagination({ p }) {
  const [tableIndex, setTableIndex] = useState();

  return (
    <div className="flex w-full items-center justify-center gap-1 pt-5">
      <button
        className={`${tableIndex > 0 ? "bg-highlight" : "bg-secondary"} hover:bg-highlight-light flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50`}
        onClick={() => tableIndex > 0 && setTableIndex(tableIndex - 1)}
        disabled={tableIndex === 0}
      >
        <img
          className="h-3 rotate-90"
          src={tableIndex > 0 ? ArrowPrimary : ArrowTertiary}
        />
      </button>
      {Array(4)
        .fill()
        .map((_, index) => (
          <button
            className={`${tableIndex === index ? "bg-highlight text-primary hover:bg-highlight-light hover:text-primary" : "bg-secondary text-tertiary hover:bg-tertiary/30"} h-10 w-10 rounded-xl`}
            key={index}
            onClick={() => index === 0 && setTableIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      <button
        className={`bg-highlight hover:bg-highlight-light flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50`}
        onClick={() => {}}
        // disabled={!canProceedIndexes[tableIndex]}
      >
        <img className="h-3 -rotate-90" src={ArrowPrimary} />
      </button>
    </div>
  );
}

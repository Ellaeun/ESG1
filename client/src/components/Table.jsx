import PropTypes from "prop-types";

import ExpandTertiary from "../assets/expand-tertiary.svg";

Table.propTypes = {
  columnNames: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  skipFirst: PropTypes.bool.isRequired,
  compressedAt: PropTypes.int,
};

export default function Table({ columnNames, data, skipFirst, compressedAt }) {
  return (
    <table className="flex w-full flex-col gap-5 text-tertiary">
      <thead className="flex w-full">
        <tr className="flex w-full rounded-2xl bg-secondary q-text-sm">
          {columnNames.map((name, index) =>
            index !== compressedAt ? (
              <th className="w-full py-5" key={index}>
                {name}
              </th>
            ) : (
              [
                <td
                  className="flex h-full w-20 border-l-2 border-r-2 border-tertiary px-2"
                  key={index + "compressed"}
                >
                  <img src={ExpandTertiary} />
                </td>,
                <th className="w-full py-5" key={index}>
                  {name}
                </th>,
              ]
            ),
          )}
        </tr>
      </thead>
      <tbody className="flex w-full flex-col">
        {data.map((row, rowIndex) => (
          <tr
            className="flex w-full cursor-pointer rounded-t-2xl border-b-2 py-4 text-center q-text-sm hover:bg-secondary"
            key={rowIndex}
            onClick={() => {}}
          >
            {Object.entries(row)
              .slice(skipFirst ? 1 : 0)
              .map(([key, value], index) =>
                index !== compressedAt ? (
                  <td className="w-full" key={key + value}>
                    {value}
                  </td>
                ) : (
                  [
                    <td
                      className="w-20 px-2"
                      key={key + value + "compressed"}
                    />,
                    <td className="w-full" key={key + value}>
                      {value}
                    </td>,
                  ]
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

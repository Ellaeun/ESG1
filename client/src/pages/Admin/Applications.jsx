import PropTypes from "prop-types";

import Pagination from "../../components/Pagination.jsx";

Applications.propTypes = {
  p: PropTypes.string,
};

export default function Applications({ p }) {
  return (
    <div className="h-full w-full py-5">
      <table className="flex w-full flex-col gap-5 text-tertiary">
        <thead className="flex w-full px-5">
          <tr className="flex w-full rounded-2xl bg-secondary py-5 q-text-sm">
            <th className="w-full">Full Name</th>
            <th className="w-full">Applicant Type</th>
            <th className="w-full">Preferred Course</th>
            <th className="w-full">Date Submitted</th>
            <th className="w-full">Status</th>
          </tr>
        </thead>
        <tbody className="flex w-full flex-col px-5">
          {Array(20)
            .fill()
            .map((_, index) => (
              <tr
                className="flex w-full py-4 text-center q-text-sm"
                key={index}
              >
                <td className="w-full">123</td>
                <td className="w-full">123</td>
                <td className="w-full">123</td>
                <td className="w-full">123</td>
                <td className="w-full">123</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

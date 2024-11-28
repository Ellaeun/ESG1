import PropTypes from "prop-types";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

Waitlist.propTypes = {
  p: PropTypes.string,
};

export default function Waitlist({ p }) {
  return (
    <div className="h-full w-full py-5">
      <Table
        columnNames={[
          "Full Name",
          "Applicant Type",
          "Preferred Course",
          "Date Submitted",
        ]}
        data={[]}
      />
      <Pagination />
    </div>
  );
}

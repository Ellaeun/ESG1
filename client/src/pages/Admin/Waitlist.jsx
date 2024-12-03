import PropTypes from "prop-types";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

Waitlist.propTypes = {
  p: PropTypes.string,
};

export default function Waitlist({ p }) {
  return (
    <div className="h-full w-full">
      <Table
        columnNames={[
          "Full Name",
          "Applicant Type",
          "Preferred Program",
          "Date Submitted",
        ]}
        data={[]}
      />
      <Pagination />
    </div>
  );
}

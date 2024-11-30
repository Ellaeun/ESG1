import PropTypes from "prop-types";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

Appointments.propTypes = {
  p: PropTypes.string,
};

export default function Appointments({ p }) {
  return (
    <div className="h-full w-full">
      <Table
        columnNames={[
          "Full Name",
					"Academic Status",
          "Preferred Course",
          "Date Scheduled",
          "Enrollment Status",
        ]}
        data={[]}
      />
      <Pagination />
    </div>
  );
}

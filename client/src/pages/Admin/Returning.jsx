import PropTypes from "prop-types";

import Table from "../../components/Table.jsx";
import Pagination from "../../components/Pagination.jsx";

Returning.propTypes = {
  p: PropTypes.string,
};

export default function Returning({ p }) {
	const data = [
		{ fullName: "John Doe", academicStatus: "Regular", course: "Computer Science", yearStanding: "Freshman" },
		{ fullName: "Jane Smith", academicStatus: "Irregular", course: "Business Administration", yearStanding: "Sophomore" },
		{ fullName: "Alice Johnson", academicStatus: "Regular", course: "Nursing", yearStanding: "Junior" },
		{ fullName: "Bob Brown", academicStatus: "Regular", course: "Engineering", yearStanding: "Senior" },
		{ fullName: "Clara White", academicStatus: "Irregular", course: "Education", yearStanding: "Freshman" },
		{ fullName: "David Lee", academicStatus: "Regular", course: "Information Technology", yearStanding: "Sophomore" },
		{ fullName: "Emily Green", academicStatus: "Irregular", course: "Psychology", yearStanding: "Junior" },
		{ fullName: "Frank Black", academicStatus: "Regular", course: "Architecture", yearStanding: "Senior" },
		{ fullName: "Grace Adams", academicStatus: "Regular", course: "Medicine", yearStanding: "Freshman" },
		{ fullName: "Harry Walker", academicStatus: "Irregular", course: "Law", yearStanding: "Sophomore" },
		{ fullName: "Ivy Carter", academicStatus: "Regular", course: "Pharmacy", yearStanding: "Junior" },
		{ fullName: "Jack Wilson", academicStatus: "Irregular", course: "Arts", yearStanding: "Senior" },
		{ fullName: "Kara Roberts", academicStatus: "Regular", course: "Economics", yearStanding: "Freshman" },
		{ fullName: "Liam Hughes", academicStatus: "Irregular", course: "Biology", yearStanding: "Sophomore" },
		{ fullName: "Mia Thompson", academicStatus: "Regular", course: "Physics", yearStanding: "Junior" }
	]
	
  return (
    <div className="h-full w-full">
      <Table
        columnNames={[
          "Full Name",
          "Academic Status",
          "Program",
          "Year Standing",
        ]}
        data={data}
      />
      <Pagination />
    </div>
  );
}

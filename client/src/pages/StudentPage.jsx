import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";

// import AcademicRecordTertiary from "../components/academic-record-tertiary.svg"

StudentPage.propTypes = {
	email: PropTypes.string.isRequired,
};

export default function StudentPage({ email }) {
	return (
		<div className="bg-secondary">
			<Nav>
				<div className="w-full h-full bg-emerald-300">
					Student
				</div>
			</Nav>
		</div>
	);
}

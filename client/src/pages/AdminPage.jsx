import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";

import StudentRecordsTertiary from "../assets/student-records-tertiary.svg";

AdminPage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default function AdminPage({ email }) {
  return (
    <div className="bg-secondary">
      <Nav>
        <div className="h-full w-full bg-emerald-300">Admin</div>
      </Nav>
    </div>
  );
}

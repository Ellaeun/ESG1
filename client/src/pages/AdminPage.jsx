import { useState } from "react";
import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";

import ManageEnrollmentTertiary from "../assets/manage-enrollment-tertiary.svg";
import AcademicRecordsTertiary from "../assets/academic-records-tertiary.svg";
import StudentRecordsTertiary from "../assets/student-records-tertiary.svg";
import AccountManagementTertiary from "../assets/account-management-tertiary.svg";
import LogoutTertiary from "../assets/logout-tertiary.svg";
import ManageEnrollmentPrimary from "../assets/manage-enrollment-primary.svg";
import AcademicRecordsPrimary from "../assets/academic-records-primary.svg";
import StudentRecordsPrimary from "../assets/student-records-primary.svg";
import AccountManagementPrimary from "../assets/account-management-primary.svg";
import LogoutPrimary from "../assets/logout-primary.svg";

AdminPage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default function AdminPage({ email }) {
  const [currentTab, setCurrentTab] = useState("Manage Enrollment");

  return (
    <div className="flex h-screen w-screen bg-secondary font-montserrat">
      <div className="absolute left-0 z-0 h-[100vh] w-[100vh] rounded-full bg-[radial-gradient(circle,_rgba(19,71,19,1),_rgba(19,71,19,0),_rgba(19,71,19,0))] opacity-60" />
      <Nav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          {
            iconTertiary: ManageEnrollmentTertiary,
            iconPrimary: ManageEnrollmentPrimary,
            name: "Manage Enrollment",
          },
          {
            iconTertiary: AcademicRecordsTertiary,
            iconPrimary: AcademicRecordsPrimary,
            name: "Academic Records",
          },
          {
            iconTertiary: StudentRecordsTertiary,
            iconPrimary: StudentRecordsPrimary,
            name: "Student Records",
          },
          {
            iconTertiary: AccountManagementTertiary,
            iconPrimary: AccountManagementPrimary,
            name: "Account Management",
          },
          {
            iconTertiary: LogoutTertiary,
            iconPrimary: LogoutPrimary,
            name: "Log Out",
          },
        ]}
      >
        <div className="h-full w-full bg-emerald-300">Student</div>
      </Nav>
    </div>
  );
}

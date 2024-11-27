import { useState } from "react";
import PropTypes from "prop-types";

import Nav from "../../components/Nav.jsx";

import AcademicRecordTertiary from "../../assets/academic-record-tertiary.svg";
import StudentInfoTertiary from "../../assets/student-info-tertiary.svg";
import EnrollNowTertiary from "../../assets/enroll-now-tertiary.svg";
import LogOutTertiary from "../../assets/log-out-tertiary.svg";
import AcademicRecordPrimary from "../../assets/academic-record-primary.svg";
import StudentInfoPrimary from "../../assets/student-info-primary.svg";
import EnrollNowPrimary from "../../assets/enroll-now-primary.svg";
import LogOutPrimary from "../../assets/log-out-primary.svg";

StudentPage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default function StudentPage({ email }) {
  const [currentTab, setCurrentTab] = useState("Academic Record");

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-secondary font-montserrat">
      <div className="absolute left-0 z-0 h-[100vh] w-[100vh] rounded-full bg-[radial-gradient(circle,_rgba(19,71,19,1),_rgba(19,71,19,0),_rgba(19,71,19,0))] opacity-50" />
      <Nav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={[
          {
            iconTertiary: AcademicRecordTertiary,
            iconPrimary: AcademicRecordPrimary,
            name: "Academic Record",
          },
          {
            iconTertiary: StudentInfoTertiary,
            iconPrimary: StudentInfoPrimary,
            name: "Student Info",
          },
          {
            iconTertiary: EnrollNowTertiary,
            iconPrimary: EnrollNowPrimary,
            name: "Enroll Now",
          },
          {
            iconTertiary: LogOutTertiary,
            iconPrimary: LogOutPrimary,
            name: "Log Out",
          },
        ]}
      >
        <div className="h-full w-full bg-emerald-300">Student</div>
      </Nav>
    </div>
  );
}

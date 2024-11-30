import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";

import AcademicRecord from "./student/AcademicRecord.jsx";
import StudentInfo from "./student/StudentInfo.jsx";

import AcademicRecordTertiary from "../assets/academic-record-tertiary.svg";
import StudentInfoTertiary from "../assets/student-info-tertiary.svg";
import EnrollNowTertiary from "../assets/enroll-now-tertiary.svg";
import LogOutTertiary from "../assets/log-out-tertiary.svg";
import AcademicRecordPrimary from "../assets/academic-record-primary.svg";
import StudentInfoPrimary from "../assets/student-info-primary.svg";
import EnrollNowPrimary from "../assets/enroll-now-primary.svg";
import LogOutPrimary from "../assets/log-out-primary.svg";
import SearchTertiary from "../assets/search-tertiary.svg";
import SortTertiary from "../assets/sort-tertiary.svg";
import ArrowTertiary from "../assets/arrow-tertiary.svg";

StudentPage.propTypes = {};

export default function StudentPage() {
  const [currentTab, setCurrentTab] = useState("Academic Record");
  const [currentSubTab, setCurrentSubTab] = useState("None");
  const studentInfoSubTabs = [
    "Personal Information",
    "Family Information",
    "Education Information",
  ];

  useEffect(() => {
    switch (currentTab) {
      case "Academic Record":
        setCurrentSubTab("None");
        break;
      case "Student Info":
        setCurrentSubTab("Personal Information");
        break;
    }
  }, [currentTab]);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-secondary font-montserrat">
      <div className="absolute left-0 z-0 h-[100vh] w-[100vh] rounded-full bg-[radial-gradient(circle,_rgba(19,71,19,0.80),_rgba(19,71,19,0),_rgba(19,71,19,0))] opacity-55" />
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
        <div className="scrollable-div flex h-full w-full flex-col gap-5 overflow-y-scroll py-5 pr-10 text-tertiary">
          <div className="flex items-center justify-between">
            <div className="px-2">
              <h1 className="q-text-xl">Welcome, Juan A. Dela Cruz!</h1>
              <h1 className="q-text-base">
                Bachelor of Science in Computer Science Student
              </h1>
            </div>
            <div className="rounded-full bg-white p-1">
              <img className="invisible h-16 w-16" />
            </div>
          </div>
          {currentTab === "Academic Record" && (
            <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 q-text-base">
              <p className="px-5">Search</p>
              <div className="flex gap-2">
                <button className="border border-tertiary p-3 q-rounded-xl hover:bg-secondary">
                  <img className="w-3" src={SearchTertiary} />
                </button>
                <button className="border border-tertiary p-3 q-rounded-xl hover:bg-secondary">
                  <img className="w-3" src={SortTertiary} />
                </button>
              </div>
            </div>
          )}
          <div className="flex h-fit w-full">
            <div className="flex h-fit w-full flex-col rounded-3xl bg-component">
              {currentTab === "Academic Record" && (
                <div className="flex items-center justify-between overflow-hidden px-5">
                  <div className="flex items-center gap-5 p-5 py-2 pl-5">
                    <h1 className="py-3 q-text-xl">Year 1 Sem 1</h1>
                    <div className="flex gap-2">
                      <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                        <img className="w-3 rotate-90" src={ArrowTertiary} />
                      </button>
                      <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                        <img className="w-3 -rotate-90" src={ArrowTertiary} />
                      </button>
                    </div>
                  </div>
                  <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                    <img className="w-3 rotate-180" src={ArrowTertiary} />
                  </button>
                </div>
              )}
              {currentTab === "Student Info" && (
                <div className="flex gap-5 py-2 pl-10 pr-5">
                  {studentInfoSubTabs.map((subTab, index) => (
                    <button
                      className="py-3 text-tertiary hover:text-tertiary/80"
                      onClick={() => setCurrentSubTab(subTab)}
                      key={index}
                    >
                      {subTab}
                      <div
                        className={`${currentSubTab === subTab ? "visible" : "invisible"} h-1 w-full rounded-full bg-tertiary`}
                      />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex h-full w-full justify-center rounded-3xl bg-white p-5">
                {currentTab === "Academic Record" && <AcademicRecord />}
                {currentTab === "Student Info" && (
                  <StudentInfo
                    currentSubTab={currentSubTab}
                    studentInfoSubTabs={studentInfoSubTabs}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Nav>
    </div>
  );
}

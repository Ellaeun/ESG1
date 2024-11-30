import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";
import Applications from "./admin/Applications.jsx";
import Returning from "./admin/Returning.jsx";
import Waitlist from "./admin/Waitlist.jsx";
import Appointments from "./admin/Appointments.jsx";
import EnrollmentSettings from "./admin/EnrollmentSettings.jsx";
import CurrentStudents from "./admin/CurrentStudents.jsx";

import ManageEnrollmentTertiary from "../assets/manage-enrollment-tertiary.svg";
import AcademicRecordsTertiary from "../assets/academic-records-tertiary.svg";
import StudentRecordsTertiary from "../assets/student-records-tertiary.svg";
import AccountManagementTertiary from "../assets/account-management-tertiary.svg";
import LogOutTertiary from "../assets/log-out-tertiary.svg";
import ManageEnrollmentPrimary from "../assets/manage-enrollment-primary.svg";
import AcademicRecordsPrimary from "../assets/academic-records-primary.svg";
import StudentRecordsPrimary from "../assets/student-records-primary.svg";
import AccountManagementPrimary from "../assets/account-management-primary.svg";
import LogOutPrimary from "../assets/log-out-primary.svg";
import SearchTertiary from "../assets/search-tertiary.svg";
import SortTertiary from "../assets/sort-tertiary.svg";
import ArrowTertiary from "../assets/arrow-tertiary.svg";

AdminPage.propTypes = {};

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState("Manage Enrollment");
  const [currentSubTab, setCurrentSubTab] = useState("Applications");
  const manageEnrollmentSubTabs = [
    "Applications",
    "Returning",
    "Waitlist",
    "Appointments",
    "Enrollment Settings",
  ];
  const studentRecordsSubTabs = [
    "Current Students",
    "Graduates",
    "All Students",
  ];

  useEffect(() => {
    switch (currentTab) {
      case "Manage Enrollment":
        setCurrentSubTab("Applications");
        break;
      case "Student Records":
        setCurrentSubTab("Current Students");
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
            iconTertiary: LogOutTertiary,
            iconPrimary: LogOutPrimary,
            name: "Log Out",
          },
        ]}
      >
        <div className="scrollable-div flex h-full w-full flex-col gap-5 overflow-y-scroll py-5 pr-10 text-tertiary">
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
          <div className="flex h-fit w-full">
            <div className="flex h-fit w-full flex-col rounded-3xl bg-component">
              <div className="flex items-center justify-between overflow-hidden px-5">
                <div className="flex gap-5 py-2 pl-10 pr-5">
                  {currentTab === "Manage Enrollment" &&
                    manageEnrollmentSubTabs.map((subTab, index) => (
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
                  {currentTab === "Student Records" &&
                    studentRecordsSubTabs.map((subTab, index) => (
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
                <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                  <img className="w-3 rotate-180" src={ArrowTertiary} />
                </button>
              </div>
              <div className="h-full w-full rounded-3xl bg-white p-5">
                {currentSubTab === "Applications" && <Applications />}
                {currentSubTab === "Returning" && <Returning />}
                {currentSubTab === "Waitlist" && <Waitlist />}
                {currentSubTab === "Appointments" && <Appointments />}
                {currentSubTab === "Enrollment Settings" && (
                  <EnrollmentSettings />
                )}
                {currentSubTab === "Current Students" && <CurrentStudents />}
              </div>
            </div>
          </div>
        </div>
      </Nav>
    </div>
  );
}

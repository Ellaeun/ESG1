import { useState } from "react";
import PropTypes from "prop-types";

import Nav from "../../components/Nav.jsx";
import Applications from "./Applications.jsx";

import ManageEnrollmentTertiary from "../../assets/manage-enrollment-tertiary.svg";
import AcademicRecordsTertiary from "../../assets/academic-records-tertiary.svg";
import StudentRecordsTertiary from "../../assets/student-records-tertiary.svg";
import AccountManagementTertiary from "../../assets/account-management-tertiary.svg";
import LogOutTertiary from "../../assets/log-out-tertiary.svg";
import ManageEnrollmentPrimary from "../../assets/manage-enrollment-primary.svg";
import AcademicRecordsPrimary from "../../assets/academic-records-primary.svg";
import StudentRecordsPrimary from "../../assets/student-records-primary.svg";
import AccountManagementPrimary from "../../assets/account-management-primary.svg";
import LogOutPrimary from "../../assets/log-out-primary.svg";
import SearchTertiary from "../../assets/search-tertiary.svg";
import SortTertiary from "../../assets/sort-tertiary.svg";
import ArrowTertiary from "../../assets/arrow-tertiary.svg";

AdminPage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default function AdminPage({ email }) {
  const [currentTab, setCurrentTab] = useState("Manage Enrollment");
  const [currentSubTab, setCurrentSubTab] = useState("Applications");

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-secondary font-montserrat">
      <div className="absolute left-0 z-0 h-[100vh] w-[100vh] rounded-full bg-[radial-gradient(circle,_rgba(19,71,19,1),_rgba(19,71,19,0),_rgba(19,71,19,0))] opacity-50" />
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
        <div className="flex h-full w-full flex-col gap-5 py-5 pr-10 overflow-y-auto scrollable-div">
          <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 text-tertiary q-text-base">
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
          <div className="flex h-fit w-full flex-col rounded-3xl bg-component">
            <div className="flex items-center justify-between px-5">
              <div className="flex gap-5 p-5 py-2 pl-5">
                <button
                  className="py-3 text-tertiary hover:text-tertiary/80"
                  onClick={() => setCurrentSubTab("Applications")}
                >
                  Applications
                  <div
                    className={`${currentSubTab === "Applications" ? "visible" : "invisible"} h-1 w-full rounded-full bg-tertiary`}
                  />
                </button>
                <button
                  className="py-3 text-tertiary hover:text-tertiary/80"
                  onClick={() => setCurrentSubTab("Returning")}
                >
                  Returning
                  <div
                    className={`${currentSubTab === "Returning" ? "visible" : "invisible"} h-1 w-full rounded-full bg-tertiary`}
                  />
                </button>
                <button
                  className="py-3 text-tertiary hover:text-tertiary/80"
                  onClick={() => setCurrentSubTab("Waitlist")}
                >
                  Waitlist
                  <div
                    className={`${currentSubTab === "Waitlist" ? "visible" : "invisible"} h-1 w-full rounded-full bg-tertiary`}
                  />
                </button>
                <button
                  className="py-3 text-tertiary hover:text-tertiary/80"
                  onClick={() => setCurrentSubTab("Appointments")}
                >
                  Appointments
                  <div
                    className={`${currentSubTab === "Appointments" ? "visible" : "invisible"} h-1 w-full rounded-full bg-tertiary`}
                  />
                </button>
                <button
                  className="py-3 text-tertiary hover:text-tertiary/80"
                  onClick={() => setCurrentSubTab("Enrollment Settings")}
                >
                  Enrollment Settings
                  <div
                    className={`${currentSubTab === "Enrollment Settings" ? "visible" : "invisible"} h-1 w-full rounded-full bg-tertiary`}
                  />
                </button>
              </div>
              <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                <img className="w-3 rotate-180" src={ArrowTertiary} />
              </button>
            </div>
            <div className="h-full w-full rounded-3xl bg-white">
              {currentSubTab === "Applications" && <Applications />}
              {currentSubTab === "Returning" && (
                <div className="h-1 w-full rounded-full bg-tertiary" />
              )}
              {currentSubTab === "Waitlist" && (
                <div className="h-1 w-full rounded-full bg-tertiary" />
              )}
              {currentSubTab === "Appointments" && (
                <div className="h-1 w-full rounded-full bg-tertiary" />
              )}
              {currentSubTab === "Enrollment Settings" && (
                <div className="h-1 w-full rounded-full bg-tertiary" />
              )}
            </div>
          </div>
        </div>
      </Nav>
    </div>
  );
}

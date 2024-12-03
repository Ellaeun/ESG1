import { useState } from "react";
import PropTypes from "prop-types";

import Nav from "../components/Nav.jsx";
import AcademicRecord from "../components/AcademicRecord";
import StudentInfo from "../components/StudentInfo";
import ArrowTertiary from "../assets/arrow-tertiary.svg";
import SearchTertiary from "../assets/search-tertiary.svg";
import SortTertiary from "../assets/sort-tertiary.svg";

const studentInfoSubTabs = ["Personal Info", "Academic Progress", "Health Record"];

export default function MedicalAssessment() {
  const [currentTab, setCurrentTab] = useState("Academic Record");
  const [currentSubTab, setCurrentSubTab] = useState("None");

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-secondary font-montserrat">
      <div className="scrollable-div flex h-full w-full flex-col gap-5 overflow-y-scroll py-5 pr-10 text-tertiary">
        <div className="flex items-center justify-between">
          <div className="px-2">
            <h1 className="q-text-xl">Welcome, Juan A. Dela Cruz!</h1>
            <h1 className="q-text-base">Bachelor of Science in Computer Science Student</h1>
          </div>
          <div className="rounded-full bg-white p-1">
            <img className="invisible h-16 w-16" alt="Profile" />
          </div>
        </div>

        {currentTab === "Academic Record" && (
          <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-4 q-text-base">
            <p className="px-5">Search</p>
            <div className="flex gap-2">
              <button className="border border-tertiary p-3 q-rounded-xl hover:bg-secondary">
                <img className="w-3" src={SearchTertiary} alt="Search Icon" />
              </button>
              <button className="border border-tertiary p-3 q-rounded-xl hover:bg-secondary">
                <img className="w-3" src={SortTertiary} alt="Sort Icon" />
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
                      <img className="w-3 rotate-90" src={ArrowTertiary} alt="Rotate Left Arrow" />
                    </button>
                    <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                      <img className="w-3 -rotate-90" src={ArrowTertiary} alt="Rotate Right Arrow" />
                    </button>
                  </div>
                </div>
                <button className="h-fit w-fit border border-tertiary p-3 q-rounded-xl hover:bg-white">
                  <img className="w-3 rotate-180" src={ArrowTertiary} alt="Rotate Bottom Arrow" />
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
              {currentTab === "Student Info" && <StudentInfo currentSubTab={currentSubTab} />}
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

MedicalAssessment.propTypes = {
};

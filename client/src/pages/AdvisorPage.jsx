import { useState } from "react";
import PropTypes from "prop-types";
import SortTertiary from "../assets/sort-tertiary.svg";
import SearchTertiary from "../assets/search-tertiary.svg";
import ArrowTertiary from "../assets/arrow-tertiary.svg";

const AcademicRecord = () => (
  <div className="flex h-fit w-full">
    <div className="flex h-fit w-full flex-col rounded-3xl bg-component">
      <table className="min-w-full rounded-lg overflow-hidden">
	  <thead className="bg-gray-300">
  <tr className="text-2xl font-extrabold font-montserrat">
    <th className="border px-6 py-3 text-left text-xl text-gray-700">Name</th>
    <th className="border px-6 py-3 text-left text-xl text-gray-700">Subject</th>
    <th className="border px-6 py-3 text-left text-xl text-gray-700">Grade</th>
    <th className="border px-6 py-3 text-left text-xl text-gray-700">Status</th>
    <th className="border px-6 py-3 text-left text-xl text-gray-700">Class Section</th>
  </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100 font-semibold font-montserrat">
            <td className="border px-6 py-4">John Doe</td>
            <td className="border px-6 py-4">COSC 75</td>
            <td className="border px-6 py-4">85</td>
            <td className="border px-6 py-4 text-orange-700">Pending</td>
            <td className="border px-6 py-4">BSCS 1-1</td>
          </tr>
          <tr className="border-b hover:bg-gray-100 font-semibold font-montserrat">
            <td className="border px-6 py-4">Jane Smith</td>
            <td className="border px-6 py-4">COSC 75</td>
            <td className="border px-6 py-4">65</td>
            <td className="border px-6 py-4 text-red-700 ">Rejected</td>
            <td className="border px-6 py-4">BSCS 1-2</td>
          </tr>
		  <tr className="border-b hover:bg-gray-100 font-semibold font-montserrat">
            <td className="border px-6 py-4">Samantha Tui</td>
            <td className="border px-6 py-4">COSC 75</td>
            <td className="border px-6 py-4">95</td>
            <td className="border px-6 py-4 text-green-700 ">Approved</td>
            <td className="border px-6 py-4">BSCS 1-3</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const StudentInfo = ({ currentSubTab }) => (
  <div>
    <h3 className="text-xl font-bold">{currentSubTab} Information</h3>
    <p>Content for {currentSubTab}</p>
  </div>
);

StudentInfo.propTypes = {
  currentSubTab: PropTypes.string.isRequired,
};

function GradeAdvisor({ p }) {
  return (
    <div className="p-6 bg-blue-50 rounded-xl shadow-lg max-w-md mx-auto mb-6">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src="https://via.placeholder.com/50" 
          alt="Advisor Icon"
        />
        <h3 className="text-lg font-semibold text-gray-700">Academic Advisor</h3>
      </div>

      <p className="text-xl text-gray-600">{p}</p>
    </div>
  );
}

GradeAdvisor.propTypes = {
  p: PropTypes.string.isRequired,
};

const GradingConsultationDashboard = () => {
  const [currentTab, setCurrentTab] = useState("Academic Record");
  const [currentSubTab, setCurrentSubTab] = useState("Appointments");

  const studentInfoSubTabs = ["Appointments", "Enrollment Settings", "Current Students"];

  return (
    <div className="min-h-screen flex flex-col bg-secondary text-tertiary">
      <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-5 mt-4 q-text-base">
        <p className="px-4 text-2xl font-bold font-montserrat">Search</p>
        <div className="flex gap-2">
          <button className="border border-tertiary p-3 q-rounded-xl hover:bg-secondary">
            <img className="w-3" src={SearchTertiary} alt="Search Icon" />
          </button>
          <button className="border border-tertiary p-3 q-rounded-xl hover:bg-secondary">
            <img className="w-3" src={SortTertiary} alt="Sort Icon" />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Grade Advising</h2>
        </header>
        
        <GradeAdvisor p="Your Academic Advisor is Mr. Edhan Belgica." />

        <div className="flex h-fit w-full">
          <div className="flex h-fit w-full flex-col rounded-3xl bg-component">
            {currentTab === "Academic Record" && (
              <div className="flex items-center justify-between overflow-hidden px-5">
                <div className="flex items-center gap-5 p-5 py-2 pl-5">
                  <h1 className="py-3 q-text-2xl font-bold font-montserrat">Year 1 Sem 1</h1>
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
    </div>
  );
};

export default GradingConsultationDashboard;

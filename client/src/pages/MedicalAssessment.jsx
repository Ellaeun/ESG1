import { useState } from "react";
import PropTypes from "prop-types";
import SortTertiary from "../assets/sort-tertiary.svg";
import SearchTertiary from "../assets/search-tertiary.svg";
import ArrowTertiary from "../assets/arrow-tertiary.svg";

// Medical Record Component
const MedicalRecord = ({ records, searchTerm }) => {
  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="min-w-full rounded-lg overflow-hidden">
      <thead className="bg-gray-300">
        <tr className="text-2xl font-extrabold font-montserrat">
          <th className="border px-6 py-3 text-left text-xl text-gray-700">Name</th>
          <th className="border px-6 py-3 text-left text-xl text-gray-700">Condition</th>
          <th className="border px-6 py-3 text-left text-xl text-gray-700">Status</th>
          <th className="border px-6 py-3 text-left text-xl text-gray-700">Assigned Doctor</th>
          <th className="border px-6 py-3 text-left text-xl text-gray-700">Appointment Date</th>
        </tr>
      </thead>
      <tbody>
  {filteredRecords.map((record, index) => {
    const statusColor = record.status === "Completed" ? "text-green-700" : "text-orange-700";
    return (
      <tr key={index} className="border-b hover:bg-gray-100 font-semibold font-montserrat">
        <td className="border px-6 py-4">{record.name}</td>
        <td className="border px-6 py-4">{record.condition}</td>
        <td className={`border px-6 py-4 ${statusColor}`}>{record.status}</td>
        <td className="border px-6 py-4">{record.doctor}</td>
        <td className="border px-6 py-4">{record.appointmentDate}</td>
      </tr>
    );
  })}
</tbody>
    </table>
  );
};

MedicalRecord.propTypes = {
  records: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

// Content for Current Tab in Medical Information
const MedicalInfo = ({ currentSubTab }) => (
  <div>
    <h3 className="text-xl font-bold">{currentSubTab} Information</h3>
    <p>Content for {currentSubTab}</p>
  </div>
);

MedicalInfo.propTypes = {
  currentSubTab: PropTypes.string.isRequired,
};

// Referred Clinic Component
const ReferredClinic = () => (
  <div>
    <h3 className="text-xl font-bold">Referred Clinic Information</h3>
    <p>Name: Health Center XYZ</p>
    <p>Address: 123 Clinic St.</p>
    <p>Contact: 123-456-7890</p>
  </div>
);

// Medical Advisor Information Card
const MedicalAdvisor = ({ p }) => {
  return (
    <div className="p-6 bg-blue-50 rounded-xl shadow-lg max-w-md mx-auto mb-6">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src="https://via.placeholder.com/50"
          alt="Medical Advisor Icon"
        />
        <h3 className="text-lg font-semibold text-gray-700">Medical Advisor</h3>
      </div>
      <p className="text-xl text-gray-600">{p}</p>
    </div>
  );
};

MedicalAdvisor.propTypes = {
  p: PropTypes.string.isRequired,
};

// Medical Assessment Dashboard
const MedicalAssessment = () => {
  const [currentTab, setCurrentTab] = useState("Medical Record");
  const [currentSubTab, setCurrentSubTab] = useState("Appointments");
  const [searchTerm, setSearchTerm] = useState("");

  const medicalInfoSubTabs = ["Appointments", "Medical History", "Prescriptions", "Referred Clinic"];

  // Example Medical Records
  const medicalRecords = [
    { name: "John Doe", condition: "Flu", status: "Pending", doctor: "Dr. Smith", appointmentDate: "12/10/2024" },
    { name: "Jane Doe", condition: "Cold", status: "Completed", doctor: "Dr. Lee", appointmentDate: "12/12/2024" },
    { name: "Mark Smith", condition: "Asthma", status: "Pending", doctor: "Dr. Brown", appointmentDate: "12/15/2024" },
  ];

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
          <h2 className="text-2xl font-bold">Medical Assessment Unit</h2>
        </header>
        <div className="flex h-fit w-full">
          <div className="flex h-fit w-full flex-col rounded-3xl bg-component">
            {currentTab === "Medical Record" && (
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

            {currentTab === "Medical Info" && (
              <div className="flex gap-5 py-2 pl-10 pr-5">
                {medicalInfoSubTabs.map((subTab, index) => (
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
              {currentTab === "Medical Record" && <MedicalRecord records={medicalRecords} searchTerm={searchTerm} />}
              {currentTab === "Medical Info" && currentSubTab === "Referred Clinic" && <ReferredClinic />}
              {currentTab === "Medical Info" && currentSubTab !== "Referred Clinic" && <MedicalInfo currentSubTab={currentSubTab} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAssessment;

import { useState } from "react";
import PropTypes from "prop-types";

import Information from "../../components/Information.jsx";

StudentInfo.propTypes = {
  currentSubTab: PropTypes.string.isRequired,
  studentInfoSubTabs: PropTypes.array.isRequired,
};

export default function StudentInfo({ currentSubTab, studentInfoSubTabs }) {
  const [studentInfo, setStudentInfo] = useState({
    applicantType: "Transferee",
    preferredProgram: "Bachelor of Science in Computer Science",
    //
    givenName: "John",
    middleName: "Michael",
    familyName: "Doe",
    suffix: "Jr.",
    sexAtBirth: "Male",
    dateOfBirth: "2000-01-15",
    civilStatus: "Single",
    contactNum: "+1234567890",
    religion: "Christianity",
    nationality: "Filipino",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    city: "Quezon City",
    stateProvinceRegion: "Metro Manila",
    postalCode: "1100",
    country: "Philippines",
    disability: "None",
    indigenousGroup: "None",
    //
    numOfSiblings: 2,
    incomeBracket: "50,000-100,000 PHP",
    fatherName: "Michael Doe",
    fatherContactNum: "+1234567891",
    fatherOccupation: "Engineer",
    motherName: "Jane Doe",
    motherContactNum: "+1234567892",
    motherOccupation: "Teacher",
    guardianName: "Emily Doe",
    guardianContactNum: "+1234567893",
    guardianOccupation: "Retired",
    //
    elementarySchoolName: "Springfield Elementary School",
    elementarySchoolAddress: "456 Elm Street, Springfield",
    elementarySchoolType: "Public",
    elementaryYearGraduated: 2012,
    juniorHighSchoolName: "Springfield Junior High School",
    juniorHighSchoolAddress: "789 Pine Street, Springfield",
    juniorHighSchoolType: "Private",
    juniorHighYearGraduated: 2016,
    seniorHighSchoolName: "Springfield Senior High School",
    seniorHighSchoolAddress: "101 Maple Avenue, Springfield",
    seniorHighSchoolType: "Public",
    seniorHighYearGraduated: 2018,
  });
  console.log(currentSubTab);
  console.log(studentInfoSubTabs);
  console.log(studentInfo);
  return (
    <div className="flex w-9/12 pb-5 pt-10">
      <Information
        data={studentInfo}
        handleChange={() => {}}
        criteria={studentInfoSubTabs}
        value={currentSubTab}
        disabled={true}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useAppContext } from "../../context/AppContext.jsx";

import Information from "../../components/Information.jsx";

StudentInfo.propTypes = {
  currentSubTab: PropTypes.string.isRequired,
  studentInfoSubTabs: PropTypes.array.isRequired,
};

export default function StudentInfo({ currentSubTab, studentInfoSubTabs }) {
  const { api } = useAppContext();
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

  useEffect(() => {
    async function getStudentInfo() {
      try {
        const res = await api.get("/application/get-student-info", {});

        const info = res.data.info;
        setStudentInfo({
          givenName: info.givenName,
          middleName: info.middleName,
          familyName: info.familyName,
          suffix: info.suffix,
          sexAtBirth: info.sexAtBirth,
          dateOfBirth: info.dateOfBirth,
          civilStatus: info.civilStatus,
          contactNum: info.contactNum,
          religion: info.religion,
          nationality: info.nationality,
          addressLine1: info.addressLine1,
          addressLine2: info.addressLine2,
          city: info.city,
          stateProvinceRegion: info.stateProvinceRegion,
          postalCode: info.postalCode,
          country: info.country,
          disability: info.disability,
          indigenousGroup: info.indigenousGroup,
          academicStatus: info.academicStatus,
          program: info.program,
          profileImageLink: info.profileImageLink,
          //
          numOfSiblings: info.numOfSiblings,
          incomeBracket: info.incomeBracket,
          fatherName: info.fatherName,
          fatherContactNum: info.fatherContactNum,
          fatherOccupation: info.fatherOccupation,
          motherName: info.motherName,
          motherContactNum: info.motherContactNum,
          motherOccupation: info.motherOccupation,
          guardianName: info.guardianName,
          guardianContactNum: info.guardianContactNum,
          guardianOccupation: info.guardianOccupation,
          //
          elementarySchoolName: info.elementarySchoolName,
          elementarySchoolAddress: info.elementarySchoolAddress,
          elementarySchoolType: info.elementarySchoolType,
          elementaryYearGraduated: info.elementaryYearGraduated,
          juniorHighSchoolName: info.juniorHighSchoolName,
          juniorHighSchoolAddress: info.juniorHighSchoolAddress,
          juniorHighSchoolType: info.juniorHighSchoolType,
          juniorHighYearGraduated: info.juniorHighYearGraduated,
          seniorHighSchoolName: info.seniorHighSchoolName,
          seniorHighSchoolAddress: info.seniorHighSchoolAddress,
          seniorHighSchoolType: info.seniorHighSchoolType,
          seniorHighYearGraduated: info.seniorHighYearGraduated,
        });

        console.log({ status: res.status, message: res.data.message });
      } catch (err) {
        console.error({
          status: err.response.status,
          message: err.response.data.message,
        });
      }
    }

    getStudentInfo();
  }, []);

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

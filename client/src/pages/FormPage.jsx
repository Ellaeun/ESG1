import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { useAppContext } from "../context/AppContext.jsx";

import Progress from "../components/Progress.jsx";
import ActionModal from "../components/ActionModal.jsx";
import SuccessModal from "../components/SuccessModal.jsx";
import Combobox from "../components/Combobox.jsx";

import { countries, nationalities } from "../constants/constants.jsx";

import AdmissionFormTertiary from "../assets/admission-form-tertiary.svg";
import ExaminationTertiary from "../assets/examination-tertiary.svg";
import ExamResultTertiary from "../assets/exam-result-tertiary.svg";
import ReqSubmissionTertiary from "../assets/req-submission-tertiary.svg";
import EnrolledTertiary from "../assets/enrolled-tertiary.svg";
import AdmissionFormPrimary from "../assets/admission-form-primary.svg";
import ExaminationPrimary from "../assets/examination-primary.svg";
import ExamResultPrimary from "../assets/exam-result-primary.svg";
import ReqSubmissionPrimary from "../assets/req-submission-primary.svg";
import EnrolledPrimary from "../assets/enrolled-primary.svg";
import ArrowTertiary from "../assets/arrow-tertiary.svg";
import ArrowPrimary from "../assets/arrow-primary.svg";

FormPage.propTypes = {};

export default function FormPage() {
  const { api } = useAppContext();
  const [formIndex, setFormIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [modalIcon, setModalIcon] = useState("Checkmark");
  const [currentProgress, setCurrentProgress] = useState({
    completed: [true, true, true, false, false],
    current: "Admission Form",
  });
  const [canProceedIndexes, setCanProceedIndexes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [formData, setFormData] = useState({
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

    //   applicantType: "",
    //   preferredProgram: "",
    //   //
    //   givenName: "",
    //   middleName: "",
    //   familyName: "",
    //   suffix: "",
    //   sexAtBirth: "",
    //   dateOfBirth: "",
    //   civilStatus: "",
    //   contactNum: "",
    //   religion: "",
    //   nationality: "",
    //   addressLine1: "",
    //   addressLine2: "",
    //   city: "",
    //   stateProvinceRegion: "",
    //   postalCode: "",
    //   country: "",
    //   disability: "",
    //   indigenousGroup: "",
    //   //
    //   numOfSiblings: 0,
    //   incomeBracket: "",
    //   fatherName: "",
    //   fatherContactNum: "",
    //   fatherOccupation: "",
    //   motherName: "",
    //   motherContactNum: "",
    //   motherOccupation: "",
    //   guardianName: "",
    //   guardianContactNum: "",
    //   guardianOccupation: "",
    //   //
    //   elementarySchoolName: "",
    //   elementarySchoolAddress: "",
    //   elementarySchoolType: "",
    //   elementaryYearGraduated: 0,
    //   juniorHighSchoolName: "",
    //   juniorHighSchoolAddress: "",
    //   juniorHighSchoolType: "",
    //   juniorHighYearGraduated: 0,
    //   seniorHighSchoolName: "",
    //   seniorHighSchoolAddress: "",
    //   seniorHighSchoolType: "",
    //   seniorHighYearGraduated: 0,
    //   // colegeSchoolName: "",
    //   // colegeSchoolAddress: "",
    //   // colegeSchoolType: "",
    //   // colegeYearGraduated: undefined,
  });

  const localRef = useRef(null);

  function scrollToTop() {
    if (!localRef.current) {
      return;
    }

    const offsetTop = 0;

    localRef.current.scrollTo({
      top: offsetTop,
      behavior: "auto",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function submitForm() {
    try {
      const res = await api.post("/application/post-application", {
        formData,
      });
      if (res.data.accessToken)
        localStorage.setItem("accessToken", res.data.accessToken);

      setIsFormCompleted(true);

      console.log({ status: res.status, message: res.data.message });
    } catch (err) {
      console.error({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  }

  useEffect(() => {
    const proceedIndexes = [...canProceedIndexes];

    switch (formIndex) {
      case 0:
        proceedIndexes[formIndex] =
          formData.applicantType !== "" && formData.preferredProgram !== "";
        break;
      case 1:
        proceedIndexes[formIndex] =
          formData.givenName !== "" &&
          formData.middleName !== "" &&
          formData.familyName !== "" &&
          formData.sexAtBirth !== "" &&
          formData.dateOfBirth !== "" &&
          formData.civilStatus !== "" &&
          formData.contactNum !== "" &&
          formData.religion !== "" &&
          formData.nationality !== "" &&
          formData.addressLine1 !== "" &&
          formData.city !== "" &&
          formData.stateProvinceRegion !== "" &&
          formData.postalCode !== "" &&
          formData.country !== "";
        break;
      case 2:
        proceedIndexes[formIndex] =
          formData.incomeBracket !== "" &&
          formData.fatherName !== "" &&
          formData.fatherContactNum !== "" &&
          formData.fatherOccupation !== "" &&
          formData.motherName !== "" &&
          formData.motherContactNum !== "" &&
          formData.motherOccupation !== "" &&
          formData.guardianName !== "" &&
          formData.guardianContactNum !== "" &&
          formData.guardianOccupation !== "";
        break;
      case 3:
        proceedIndexes[formIndex] =
          formData.elementarySchoolName !== "" &&
          formData.elementarySchoolAddress !== "" &&
          formData.elementarySchoolType !== "" &&
          formData.elementaryYearGraduated !== "0" &&
          formData.elementaryYearGraduated !== "" &&
          formData.juniorHighSchoolName !== "" &&
          formData.juniorHighSchoolAddress !== "" &&
          formData.juniorHighSchoolType !== "" &&
          formData.juniorHighYearGraduated !== "0" &&
          formData.juniorHighYearGraduated !== "" &&
          formData.seniorHighSchoolName !== "" &&
          formData.seniorHighSchoolAddress !== "" &&
          formData.seniorHighSchoolType !== "" &&
          formData.seniorHighYearGraduated !== "0" &&
          formData.seniorHighYearGraduated !== "";
        break;
      default:
        break;
    }

    setCanProceedIndexes(proceedIndexes);
  }, [formData, formIndex]);

  useEffect(() => {
    scrollToTop();
  }, [formIndex]);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-secondary font-montserrat">
      <div className="absolute left-0 z-0 h-[100vh] w-[100vh] rounded-full bg-[radial-gradient(circle,_rgba(19,71,19,0.80),_rgba(19,71,19,0),_rgba(19,71,19,0))] opacity-55"></div>
      <Progress
        currentProgress={currentProgress}
        setCurrentProgress={setCurrentProgress}
        tabs={[
          {
            iconTertiary: AdmissionFormTertiary,
            iconPrimary: AdmissionFormPrimary,
            name: "Admission Form",
          },
          {
            iconTertiary: ExaminationTertiary,
            iconPrimary: ExaminationPrimary,
            name: "Examination",
          },
          {
            iconTertiary: ExamResultTertiary,
            iconPrimary: ExamResultPrimary,
            name: "Exam Result",
          },
          {
            iconTertiary: ReqSubmissionTertiary,
            iconPrimary: ReqSubmissionPrimary,
            name: "Requirements Submission",
          },
          {
            iconTertiary: EnrolledTertiary,
            iconPrimary: EnrolledPrimary,
            name: "Enrolled",
          },
        ]}
      >
        <div className="scrollable-div flex h-screen w-full flex-col items-center overflow-y-auto pb-5 pr-10 pt-11">
          <AnimatePresence initial={false} mode="wait">
            {isModalOpen && !isFormCompleted && (
              <ActionModal
                handleClose={() => setIsModalOpen(false)}
                title={"Submit Application"}
                message={
                  <>
                    <p className="text-red-800">
                      Once you submit your application, your information will be
                      locked, and no further edits will be allowed. Please
                      review all details carefully before proceeding.
                    </p>
                    <br />
                    <p>
                      Your control number will be generated upon submission.
                    </p>
                  </>
                }
                modalIcon={modalIcon}
                action={() => submitForm()}
              />
            )}
            {isModalOpen && isFormCompleted && (
              <SuccessModal
                handleClose={() =>
                  setCurrentProgress({
                    ...currentProgress,
                    current: "Examination",
                  })
                }
                title={"Submit Application"}
                message={
                  <>
                    <p className="text-red-800">
                      Once you submit your application, your information will be
                      locked, and no further edits will be allowed. Please
                      review all details carefully before proceeding.
                    </p>
                    <br />
                    <p>
                      Your control number will be generated upon submission.
                    </p>
                  </>
                }
                modalIcon={modalIcon}
              />
            )}
          </AnimatePresence>
          <div
            className={`${formIndex === 0 ? "h-full" : "h-fit"} flex w-full flex-col rounded-3xl bg-component`}
          >
            <div className="flex items-center px-10 py-5">
              <h1 className="flex items-center text-tertiary q-text-xl">
                Admission Form
              </h1>
            </div>
            <div className="flex h-full w-full flex-col rounded-3xl bg-white py-5">
              <div
                className="flex h-full w-full flex-col items-center gap-20 p-10 pb-0 text-tertiary q-gap-20 q-text-sm"
                ref={localRef}
              >
                <div className="flex h-full w-9/12 flex-col">
                  {formIndex === 0 && (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <h1 className="flex h-10 items-center text-tertiary q-text-xl">
                        Application Information*
                      </h1>
                      <Combobox
                        items={[
                          "Alternative Learning System (ALS) Passer",
                          "Foreign Undergraduate Student Applicant",
                          "Senior High School Graduate",
                          "Currently enrolled Grade 12 Student",
                          "Transferee",
                        ]}
                        isSearchable={true}
                        labelText="Applicant Type"
                        placeholder="Enter your applicant type"
                        name="applicantType"
                        value={formData.applicantType}
                        setValue={handleChange}
                        type="text"
                        attr="w-10/12"
                      />
                      <Combobox
                        items={[
                          "Bachelor of Science in Computer Science",
                          "Bachelor of Science in Information Technology",
                        ]}
                        isSearchable={true}
                        labelText="Preferred Program"
                        placeholder="Enter your preferred program"
                        name="preferredProgram"
                        value={formData.preferredProgram}
                        setValue={handleChange}
                        type="text"
                        attr="w-10/12"
                      />
                    </div>
                  )}
                  {formIndex === 1 && (
                    <div className="flex w-full flex-col items-center q-gap-5">
                      <h2 className="flex font-bold q-text-xl">
                        Personal Information<p className="text-red-700">*</p>
                      </h2>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="Given Name"
                          name="givenName"
                          value={formData.givenName}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your given name"
                        />
                        <Input
                          labelText="Middle Name"
                          name="middleName"
                          value={formData.middleName}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your middle name"
                        />
                      </div>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="Family Name"
                          name="familyName"
                          value={formData.familyName}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your family name"
                        />
                        <Input
                          labelText="Suffix"
                          name="suffix"
                          value={formData.suffix}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your suffix (optional)"
                        />
                      </div>
                      <div className="flex w-full q-gap-5">
                        <Combobox
                          items={["Female", "Male"]}
                          isSearchable={false}
                          labelText="Sex at Birth"
                          name="sexAtBirth"
                          value={formData.sexAtBirth}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter sex at birth"
                        />
                        <Input
                          labelText="Date of Birth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="MM/DD/YYYY"
                        />
                      </div>
                      <div className="flex w-full q-gap-5">
                        <Combobox
                          items={[
                            "Single",
                            "Married",
                            "Divorced",
                            "Widowed",
                            "Separated",
                          ]}
                          isSearchable={true}
                          labelText="Civil Status"
                          name="civilStatus"
                          value={formData.civilStatus}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Select your civil status"
                        />
                        <Input
                          labelText="Contact Number"
                          name="contactNum"
                          value={formData.contactNum}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your contact number"
                        />
                      </div>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="Religion"
                          name="religion"
                          value={formData.religion}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your religion"
                        />
                        <Combobox
                          items={nationalities}
                          isSearchable={true}
                          labelText="Nationality"
                          name="nationality"
                          value={formData.nationality}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your nationality"
                        />
                      </div>
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Residential Address<p className="text-red-700">*</p>
                      </h2>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="Address Line 1"
                          name="addressLine1"
                          value={formData.addressLine1}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter house no. and street address"
                        />
                        <Input
                          labelText="Address Line 2"
                          name="addressLine2"
                          value={formData.addressLine2}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter apartment/suite (optional)"
                        />
                      </div>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="City"
                          name="city"
                          value={formData.city}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your city"
                        />
                        <Input
                          labelText="State/Province/Region"
                          name="stateProvinceRegion"
                          value={formData.stateProvinceRegion}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your state/province/region"
                        />
                      </div>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="Postal Code"
                          name="postalCode"
                          value={formData.postalCode}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your postal code"
                        />
                        <Combobox
                          items={countries}
                          isSearchable={true}
                          labelText="Country"
                          name="country"
                          value={formData.country}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter your country"
                        />
                      </div>
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Other Information
                      </h2>
                      <div className="flex w-full q-gap-5">
                        <Input
                          labelText="Disability"
                          name="disability"
                          value={formData.disability}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter disability (optional)"
                        />
                        <Input
                          labelText="Indigenous Group"
                          name="indigenousGroup"
                          value={formData.indigenousGroup}
                          setValue={handleChange}
                          type="text"
                          attr="w-1/2"
                          placeholder="Enter indigenous group (optional)"
                        />
                      </div>
                    </div>
                  )}
                  {formIndex === 2 && (
                    <div className="flex w-full flex-col items-center q-gap-5">
                      <h2 className="flex font-bold q-text-xl">
                        Family Information<p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="Number of Siblings"
                        name="numOfSiblings"
                        value={formData.numOfSiblings}
                        setValue={handleChange}
                        type="number"
                        attr="w-full type-"
                        placeholder="Enter number of siblings"
                      />
                      <Combobox
                        items={[
                          "Below 11,000",
                          "11,001 - 22,000",
                          "22,001 - 43,000",
                          "43,001 - 76,000",
                          "76,001 - 131,000",
                          "131,001 and above",
                        ]}
                        isSearchable={false}
                        labelText="Income Bracket"
                        name="incomeBracket"
                        value={formData.incomeBracket}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your income bracket"
                      />
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Father&apos;s Information
                        <p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="Father's Name"
                        name="fatherName"
                        value={formData.fatherName}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your father's name"
                      />
                      <Input
                        labelText="Father's Contact Number"
                        name="fatherContactNum"
                        value={formData.fatherContactNum}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your father's contact number"
                      />
                      <Input
                        labelText="Father's Occupation"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your father's occupation"
                      />
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Mother&apos;s Information
                        <p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="Mother's Name"
                        name="motherName"
                        value={formData.motherName}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your mother's name"
                      />
                      <Input
                        labelText="Mother's Contact Number"
                        name="motherContactNum"
                        value={formData.motherContactNum}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your mother's contact number"
                      />
                      <Input
                        labelText="Mother's Occupation"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your mother's occupation"
                      />
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Guardian&apos;s Information
                        <p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="Guardian's Name"
                        name="guardianName"
                        value={formData.guardianName}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your guardian's name"
                      />
                      <Input
                        labelText="Guardian's Contact Number"
                        name="guardianContactNum"
                        value={formData.guardianContactNum}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your guardian's contact number"
                      />
                      <Input
                        labelText="Guardian's Occupation"
                        name="guardianOccupation"
                        value={formData.guardianOccupation}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter your guardian's occupation"
                      />
                    </div>
                  )}
                  {formIndex === 3 && (
                    <div className="flex w-full flex-col items-center q-gap-5">
                      <h2 className="flex font-bold q-text-xl">
                        Elementary School&apos;s Information
                        <p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="School Name"
                        name="elementarySchoolName"
                        value={formData.elementarySchoolName}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter elementary school name"
                      />
                      <Input
                        labelText="School Address"
                        name="elementarySchoolAddress"
                        value={formData.elementarySchoolAddress}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter elementary school address"
                      />
                      <Combobox
                        items={["Public", "Private"]}
                        isSearchable={false}
                        labelText="School Type"
                        name="elementarySchoolType"
                        value={formData.elementarySchoolType}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter elementary school type"
                      />
                      <Input
                        labelText="Year Graduated"
                        name="elementaryYearGraduated"
                        value={formData.elementaryYearGraduated}
                        setValue={handleChange}
                        type="number"
                        attr="w-full"
                        placeholder="Enter year graduated"
                      />
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Junior High School&apos;s Information
                        <p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="School Name"
                        name="juniorHighSchoolName"
                        value={formData.juniorHighSchoolName}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter junior high school name"
                      />
                      <Input
                        labelText="School Address"
                        name="juniorHighSchoolAddress"
                        value={formData.juniorHighSchoolAddress}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter junior high school address"
                      />
                      <Combobox
                        items={["Public", "Private"]}
                        isSearchable={false}
                        labelText="School Type"
                        name="juniorHighSchoolType"
                        value={formData.juniorHighSchoolType}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter junior high school type"
                      />
                      <Input
                        labelText="Year Graduated"
                        name="juniorHighYearGraduated"
                        value={formData.juniorHighYearGraduated}
                        setValue={handleChange}
                        type="number"
                        attr="w-full"
                        placeholder="Enter year graduated"
                      />
                      <div className="my-10 h-0.5 w-full rounded-full bg-tertiary" />
                      <h2 className="flex font-bold q-text-xl">
                        Senior High School&apos;s Information
                        <p className="text-red-700">*</p>
                      </h2>
                      <Input
                        labelText="School Name"
                        name="seniorHighSchoolName"
                        value={formData.seniorHighSchoolName}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter senior high school name"
                      />
                      <Input
                        labelText="School Address"
                        name="seniorHighSchoolAddress"
                        value={formData.seniorHighSchoolAddress}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter senior high school address"
                      />
                      <Combobox
                        items={["Public", "Private"]}
                        isSearchable={false}
                        labelText="School Type"
                        name="seniorHighSchoolType"
                        value={formData.seniorHighSchoolType}
                        setValue={handleChange}
                        type="text"
                        attr="w-full"
                        placeholder="Enter senior high school type"
                      />
                      <Input
                        labelText="Year Graduated"
                        name="seniorHighYearGraduated"
                        value={formData.seniorHighYearGraduated}
                        setValue={handleChange}
                        type="number"
                        attr="w-full"
                        placeholder="Enter year graduated"
                      />
                      {/* <Input
                labelText="College School Name"
                name="colegeSchoolName"
                value={formData.colegeSchoolName}
                setValue={handleChange}
                type="text"
                attr="w-full"
                placeholder="Enter college school name"
              />
              <Input
                labelText="College School Address"
                name="colegeSchoolAddress"
                value={formData.colegeSchoolAddress}
                setValue={handleChange}
                type="text"
                attr="w-full"
                placeholder="Enter college school address"
              />
              <Input
                labelText="College School Type"
                name="colegeSchoolType"
                value={formData.colegeSchoolType}
                setValue={handleChange}
                type="text"
                attr="w-full"
                placeholder="Enter college school type"
              />
              <Input
                labelText="College Year Graduated"
                name="colegeYearGraduated"
                value={formData.colegeYearGraduated}
                setValue={handleChange}
                type="text"
                attr="w-full"
                placeholder="Enter year graduated"
              /> */}
                    </div>
                  )}
                  <div className="flex w-full items-center justify-center gap-1 pt-20">
                    <button
                      className={`${formIndex > 0 ? "bg-highlight" : "bg-secondary"} hover:highlight-light flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50`}
                      onClick={() =>
                        formIndex > 0 && setFormIndex(formIndex - 1)
                      }
                      disabled={formIndex === 0}
                    >
                      <img
                        className="h-3 rotate-90"
                        src={formIndex > 0 ? ArrowPrimary : ArrowTertiary}
                      />
                    </button>
                    {Array(4)
                      .fill()
                      .map((_, index) => (
                        <button
                          className={`${formIndex === index ? "bg-highlight text-primary hover:bg-highlight-light hover:text-primary" : "bg-secondary text-tertiary hover:bg-tertiary/30"} h-10 w-10 rounded-xl`}
                          key={index}
                          onClick={() =>
                            canProceedIndexes[index - 1] &&
                            index === 0 &&
                            setFormIndex(index)
                          }
                        >
                          {index + 1}
                        </button>
                      ))}
                    <button
                      className={`${formIndex === 3 ? (canProceedIndexes[3] ? "h-10 bg-highlight px-5 text-primary" : "h-10 bg-secondary px-5 opacity-50") : canProceedIndexes[formIndex] ? "h-10 w-10 bg-highlight" : "h-10 w-10 bg-secondary opacity-50"} flex items-center justify-center rounded-xl`}
                      onClick={() =>
                        formIndex !== 3
                          ? setFormIndex(formIndex + 1)
                          : setIsModalOpen(true)
                      }
                      disabled={!canProceedIndexes[formIndex]}
                    >
                      {formIndex === 3 ? (
                        <p>Submit</p>
                      ) : (
                        <img
                          className="h-3 -rotate-90"
                          src={
                            formIndex !== 3 && canProceedIndexes[formIndex]
                              ? ArrowPrimary
                              : ArrowTertiary
                          }
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Progress>
    </div>
  );
}

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  attr: PropTypes.string.isRequired,
};

function Input({ labelText, placeholder, name, value, setValue, type, attr }) {
  return (
    <div className={`${attr} flex flex-col`}>
      <div className="flex justify-between p-1">
        <p className="">{labelText}</p>
      </div>
      <input
        className="bg-secondary p-3 q-rounded-xl focus:bg-primary"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

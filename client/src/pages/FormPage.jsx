import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import axios from "axios";

import { useAppContext } from "../context/AppContext.jsx";

import Modal from "../components/Modal.jsx";
import Combobox from "../components/Combobox.jsx";

import { countries, nationalities } from "../constants/constants.jsx";

import CvsuLogo from "../assets/cvsu-logo.png";

FormPage.propTypes = {
  email: PropTypes.string.isRequired,
};

export default function FormPage({ email }) {
  const { apiUrl } = useAppContext();
  const [formIndex, setFormIndex] = useState(0);
  const [modalMessage, setModalMessage] = useState(
    "You have successfully submitted your application.",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIcon, setModalIcon] = useState("Checkmark");
  const [canProceedIndexes, setCanProceedIndexes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // const [isFatherNA, setIsFatherNA] = useState(false);
  // const [isMotherNA, setIsMotherNA] = useState(false);
  const [formData, setFormData] = useState({
    applicantType: "",
    preferredProgram: "",
    //
    givenName: "",
    middleName: "",
    familyName: "",
    suffix: "",
    sexAtBirth: "",
    dateOfBirth: "",
    civilStatus: "",
    contactNum: "",
    religion: "",
    nationality: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvinceRegion: "",
    postalCode: "",
    country: "",
    disability: "",
    indigenousGroup: "",
    //
    numOfSiblings: 0,
    incomeBracket: "",
    fatherName: "",
    fatherContactNum: "",
    fatherOccupation: "",
    motherName: "",
    motherContactNum: "",
    motherOccupation: "",
    guardianName: "",
    guardianContactNum: "",
    guardianOccupation: "",
    //
    elementarySchoolName: "",
    elementarySchoolAddress: "",
    elementarySchoolType: "",
    elementaryYearGraduated: 0,
    juniorHighSchoolName: "",
    juniorHighSchoolAddress: "",
    juniorHighSchoolType: "",
    juniorHighYearGraduated: 0,
    seniorHighSchoolName: "",
    seniorHighSchoolAddress: "",
    seniorHighSchoolType: "",
    seniorHighYearGraduated: 0,
    // colegeSchoolName: "",
    // colegeSchoolAddress: "",
    // colegeSchoolType: "",
    // colegeYearGraduated: undefined,
  });

  const localRef = useRef(null);

  function scrollToTop() {
    if (!localRef.current) {
      return;
    }

    const offsetTop = 80;

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
      const res = await axios.post(`${apiUrl}/api/submit-application`, {
        email,
        formData,
      });

      setIsModalOpen(true);

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
          formData.indigenousGroup !== "" &&
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
          formData.elementaryYearGraduated !== 0 &&
          formData.juniorHighSchoolName !== "" &&
          formData.juniorHighSchoolAddress !== "" &&
          formData.juniorHighSchoolType !== "" &&
          formData.juniorHighYearGraduated !== 0 &&
          formData.seniorHighSchoolName !== "" &&
          formData.seniorHighSchoolAddress !== "" &&
          formData.seniorHighSchoolType !== "" &&
          formData.seniorHighYearGraduated !== 0;
        break;
      default:
        break;
    }

    setCanProceedIndexes(proceedIndexes);
  }, [formData, formIndex]);
  
  useEffect(() => {
    scrollToTop();
  }, [formIndex])

  return (
    <div className="flex h-screen flex-col items-center overflow-y-auto bg-primary font-montserrat" ref={localRef}>
      <AnimatePresence initial={false} mode="wait">
        {isModalOpen && (
          <Modal
            handleClose={() => setIsModalOpen(false)}
            message={modalMessage}
            modalIcon={modalIcon}
          />
        )}
      </AnimatePresence>
      <div className="flex w-full items-center gap-6 bg-highlight p-4">
        <img className="w-11" src={CvsuLogo} />
        <h1 className="font-helvetica-compressed text-primary q-text-2xl">
          CvSU Bacoor Admission
        </h1>
      </div>
      <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-primary p-4 text-tertiary shadow-xl">
        <div className="relative mb-8 flex h-8 w-8 justify-center rounded-full bg-highlight">
          <p className="absolute top-full mt-2 whitespace-nowrap q-text-sm">
            Admission Form
          </p>
        </div>
        <div className="mb-8 h-2 w-36 bg-tertiary" />
        <div className="relative mb-8 flex h-8 w-8 justify-center rounded-full bg-tertiary">
          <p className="absolute top-full mt-2 whitespace-nowrap q-text-sm">
            Examination
          </p>
        </div>
        <div className="mb-8 h-2 w-36 bg-tertiary" />
        <div className="relative mb-8 flex h-8 w-8 justify-center rounded-full bg-tertiary">
          <p className="absolute top-full mt-2 whitespace-nowrap q-text-sm">
            Exam Result
          </p>
        </div>
        <div className="mb-8 h-2 w-36 bg-tertiary" />
        <div className="relative mb-8 flex h-8 w-8 justify-center rounded-full bg-tertiary">
          <p className="absolute top-full mt-2 whitespace-nowrap q-text-sm">
            Requirements Submission
          </p>
        </div>
        <div className="mb-8 h-2 w-36 bg-tertiary" />
        <div className="relative mb-8 flex h-8 w-8 justify-center rounded-full bg-tertiary">
          <p className="absolute top-full mt-2 whitespace-nowrap q-text-sm">
            Enrolled
          </p>
        </div>
      </div>
      <div
        className={`${formIndex === 0 ? "h-full" : "h-fit"} flex w-6/12 flex-col items-center bg-primary p-10 pt-20 text-tertiary shadow-2xl q-gap-20 q-text-sm`}
      >
        <div className="flex items-center justify-center">
          <h1 className="text-tertiary q-text-2xl">Admission Form</h1>
        </div>
        <div className="flex w-10/12 flex-col items-center q-gap-5">
          {formIndex === 0 && (
            <>
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
            </>
          )}
          {formIndex === 1 && (
            <div className="flex w-full flex-col items-center q-gap-5">
              <h2 className="flex">
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
              <h2 className="flex">
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
              <h2 className="flex">Other Information</h2>
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
            <>
              <h2 className="flex">
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
              <h2 className="flex">
                Father&apos;s Information<p className="text-red-700">*</p>
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
              <h2 className="flex">
                Mother&apos;s Information<p className="text-red-700">*</p>
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
              <h2 className="flex">
                Guardian&apos;s Information<p className="text-red-700">*</p>
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
            </>
          )}
          {formIndex === 3 && (
            <>
              <h2 className="flex">
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
              <h2 className="flex">
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
              <h2 className="flex">
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
            </>
          )}
        </div>
        <div className="flex w-10/12 justify-center">
          <button
            className="flex w-3/12 items-center justify-center bg-highlight text-primary q-h-14 q-gap-5 q-rounded-xl hover:bg-highlight-light disabled:bg-secondary"
            onClick={() => formIndex > 0 && setFormIndex(formIndex - 1)}
            disabled={formIndex === 0}
          >
            Back
          </button>
          <div className="flex w-full items-center justify-center gap-1 px-6">
            {Array(4)
              .fill()
              .map((_, index) => (
                <button
                  className={`${index <= formIndex ? "bg-highlight hover:bg-highlight-light" : "bg-tertiary hover:brightness-200"} h-3 w-full rounded-xl`}
                  key={index}
                  onClick={() =>
                    (canProceedIndexes[index - 1] || index === 0) &&
                    setFormIndex(index)
                  }
                />
              ))}
          </div>
          <button
            className="flex w-3/12 items-center justify-center bg-highlight text-primary q-h-14 q-gap-5 q-rounded-xl hover:bg-highlight-light disabled:bg-secondary"
            onClick={() =>
              formIndex !== 3 ? setFormIndex(formIndex + 1) : submitForm()
            }
            disabled={!canProceedIndexes[formIndex]}
          >
            {formIndex !== 3 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
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

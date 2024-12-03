import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { useAppContext } from "../context/AppContext.jsx";

import Progress from "../components/Progress.jsx";
import ActionModal from "../components/ActionModal.jsx";
import SuccessModal from "../components/SuccessModal.jsx";

import ApplicationSubmission from "./application/ApplicationSubmission.jsx";
import DocumentVerification from "./application/DocumentVerification.jsx";
import EntranceExamination from "./application/EntranceExamination.jsx";

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

ApplicationPage.propTypes = {};

export default function ApplicationPage() {
  const { api } = useAppContext();
  const [formIndex, setFormIndex] = useState(0);
  const [controlNum, setControlNum] = useState("");
  const [fullName, setFullName] = useState("");
  const [docsVerificationDate, setDocsVerificationDate] = useState("");
  const [currentProgress, setCurrentProgress] = useState({
    completed: [true, false, false, false, false],
    current: "Application Submission",
  });
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionModalSettings, setActionModalSettings] = useState({});
  const [successModalSettings, setSuccessModalSettings] = useState({});
  const [modalIcon, setModalIcon] = useState("Checkmark");
  const [canProceedIndexes, setCanProceedIndexes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  //
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

  function handleClose(completed, current) {
    setIsModalOpen(false);
    setCurrentProgress({
      completed,
      current,
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

      setIsFormCompleted(true);
      setControlNum(res.data.controlNum);
      setFullName(
        formData.givenName +
          " " +
          formData.middleName +
          " " +
          formData.familyName +
          (formData.suffix !== null ? " " + formData.suffix : ""),
      );
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

  useEffect(() => {
    switch (currentProgress) {
      case "Application Submission":
        setActionModalSettings({
          title: "Submit Application",
          message: (
            <>
              <p className="text-red-800">
                Once you submit your application, your information will be
                locked, and no further edits will be allowed. Please review all
                details carefully before proceeding.
              </p>
              <br />
              <p>Your control number will be generated upon submission.</p>
            </>
          ),
          action: () => submitForm(),
        });
        setSuccessModalSettings({
          handleClose: () =>
            handleClose(
              [true, true, false, false, false],
              "Document Verification",
            ),
          title: "Application Submitted!",
          message: <p>Your control number is {controlNum}</p>,
        });
        break;
      case "Document Verification":
        setSuccessModalSettings({
          handleClose: () => {
            setIsModalOpen(false);
            setCurrentProgress({
              completed: [true, true, true, false, false],
              current: "Entrance Examination",
            });
          },
          title: "Submission Date Scheduled!",
          message: (
            <p>
              Your submission date is scheduled for {docsVerificationDate}.
              Please be prepared to attend on the specified date.
            </p>
          ),
        });
        setActionModalSettings({
          title: "Schedule Date",
          message: (
            <>
              <p>You have chosen the date {docsVerificationDate}</p>
              <br />
              <p className="text-red-800">
                Once the submission date is set, it cannot be rescheduled.
                Please ensure the date is correct before confirming.
              </p>
            </>
          ),
        });
        break;
    }
  }, [currentProgress]);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-secondary font-montserrat">
      <div className="absolute left-0 z-0 h-[100vh] w-[100vh] rounded-full bg-[radial-gradient(circle,_rgba(19,71,19,0.80),_rgba(19,71,19,0),_rgba(19,71,19,0))] opacity-55"></div>
      <AnimatePresence initial={false} mode="wait">
        {isModalOpen && !isFormCompleted && (
          <ActionModal
            handleClose={() => setIsModalOpen(false)}
            title={actionModalSettings.title}
            message={actionModalSettings.message}
            modalIcon={modalIcon}
            action={actionModalSettings.action}
          />
        )}
        {isModalOpen && isFormCompleted && (
          <SuccessModal
            handleClose={successModalSettings.handleClose}
            title={successModalSettings.title}
            message={successModalSettings.message}
            modalIcon={modalIcon}
          />
        )}
      </AnimatePresence>
      <Progress
        currentProgress={currentProgress}
        setCurrentProgress={setCurrentProgress}
        tabs={[
          {
            iconTertiary: AdmissionFormTertiary,
            iconPrimary: AdmissionFormPrimary,
            name: "Application Submission",
          },
          {
            iconTertiary: ExamResultTertiary,
            iconPrimary: ExamResultPrimary,
            name: "Document Verification",
          },
          {
            iconTertiary: ExaminationTertiary,
            iconPrimary: ExaminationPrimary,
            name: "Entrance Examination",
          },
          {
            iconTertiary: ReqSubmissionTertiary,
            iconPrimary: ReqSubmissionPrimary,
            name: "Document Submission",
          },
          {
            iconTertiary: EnrolledTertiary,
            iconPrimary: EnrolledPrimary,
            name: "Enrollment Completed",
          },
        ]}
      >
        <div className="scrollable-div flex h-full w-full flex-col gap-5 overflow-y-scroll py-5 pr-10 text-tertiary">
          {currentProgress.current !== "Application Submission" && (
            <div className="flex items-center justify-between">
              <div className="px-2">
                <h1 className="q-text-xl">Welcome, {fullName}!</h1>
                <h1 className="q-text-base">Control Number: {controlNum}</h1>
              </div>
              <div className="rounded-full bg-white p-1">
                <img className="invisible h-16 w-16" />
              </div>
            </div>
          )}
          <div
            className={`${formIndex === 0 ? "h-full" : "h-fit"} flex w-full flex-col rounded-3xl bg-component`}
          >
            <div className="flex items-center px-10 py-5">
              {currentProgress.current === "Application Submission" && (
                <h1 className="flex items-center text-tertiary q-text-xl">
                  Admission Form
                </h1>
              )}
              {currentProgress.current === "Document Verification" && (
                <h1 className="flex items-center text-tertiary q-text-xl">
                  Schedule Submission Date
                </h1>
              )}
                 {currentProgress.current === "Entrance Examination" && (
                <div className="flex gap-5">
                <h1 className="flex items-center text-tertiary q-text-xl">
                  Schedule
                </h1>
                <h1 className="flex items-center text-tertiary q-text-xl">
                  Examination Result
                </h1>
                </div>
              )}
            </div>
            <div className="flex h-full w-full flex-col rounded-3xl bg-white">
              <div
                className="flex h-full w-full flex-col items-center gap-20 p-5 text-tertiary q-gap-20 q-text-sm"
                ref={localRef}
              >
                {currentProgress.current === "Application Submission" && (
                  <ApplicationSubmission
                    data={formData}
                    handleChange={handleChange}
                    formIndex={formIndex}
                    setFormIndex={setFormIndex}
                    canProceedIndexes={canProceedIndexes}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
                {currentProgress.current === "Document Verification" && (
                  <DocumentVerification
                    data={docsVerificationDate}
                    handleChange={(e) =>
                      setDocsVerificationDate(e.target.value)
                    }
                    setIsModalOpen={setIsModalOpen}
                    setActionModalSettings={setActionModalSettings}
                    setSuccessModalSettings={setSuccessModalSettings}
                    setCurrentProgress={setCurrentProgress}
                  />
                )}
                {currentProgress.current === "Entrance Examination" && (
                  <EntranceExamination />
                )}
              </div>
            </div>
          </div>
        </div>
      </Progress>
    </div>
  );
}

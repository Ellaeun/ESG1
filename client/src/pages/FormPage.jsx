import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

import { useAppContext } from "../context/AppContext.jsx";

import Progress from "../components/Progress.jsx";
import InformationForm from "../components/Information.jsx";
import ActionModal from "../components/ActionModal.jsx";
import SuccessModal from "../components/SuccessModal.jsx";

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
                  <InformationForm
                    formData={formData}
                    handleChange={handleChange}
                    formIndex={[0, 1, 2, 3]}
                    value={formIndex}
                    disabled={false}
                  />
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

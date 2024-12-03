import PropTypes from "prop-types";

import InformationForm from "../../components/Information.jsx";

import ArrowTertiary from "../../assets/arrow-tertiary.svg";
import ArrowPrimary from "../../assets/arrow-primary.svg";

ApplicationSubmission.propTypes = {
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  formIndex: PropTypes.number.isRequired,
  setFormIndex: PropTypes.func.isRequired,
  canProceedIndexes: PropTypes.array.isRequired,
  controlNum: PropTypes.array.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setActionModalSettings: PropTypes.func.isRequired,
  setSuccessModalSettings: PropTypes.func.isRequired,
  setCurrentProgress: PropTypes.func.isRequired,
  setIsFormCompleted: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default function ApplicationSubmission({
  data,
  handleChange,
  formIndex,
  setFormIndex,
  canProceedIndexes,
  controlNum,
  setIsModalOpen,
  setActionModalSettings,
  setSuccessModalSettings,
  setCurrentProgress,
  setIsFormCompleted,
  submitForm,
}) {
  function handleModalOpen() {
    setIsModalOpen(true);
    setIsFormCompleted(false);
    setActionModalSettings({
      title: "Submit Application",
      message: (
        <>
          <p className="text-red-800">
            Once you submit your application, your information will be locked,
            and no further edits will be allowed. Please review all details
            carefully before proceeding.
          </p>
          <br />
          <p>Your control number will be generated upon submission.</p>
        </>
      ),
      action: () => submitForm(),
    });
    setSuccessModalSettings({
      handleClose: () => {
        setIsModalOpen(false);
        setCurrentProgress({
          completed: [true, false, false, false, false],
          current: "Document Verification",
        });
      },
      title: "Application Submitted!",
      message: <p>Your control number is {controlNum}</p>,
    });
  }

  return (
    <div className="flex h-full w-9/12 flex-col">
      <InformationForm
        data={data}
        handleChange={handleChange}
        criteria={[0, 1, 2, 3]}
        value={formIndex}
        disabled={false}
      />
      <div className="flex w-full items-center justify-center gap-1 pt-20">
        <button
          className={`${formIndex > 0 ? "bg-highlight" : "bg-secondary"} hover:highlight-light flex h-10 w-10 items-center justify-center rounded-xl disabled:opacity-50`}
          onClick={() => formIndex > 0 && setFormIndex(formIndex - 1)}
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
            formIndex !== 3 ? setFormIndex(formIndex + 1) : handleModalOpen
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
  );
}

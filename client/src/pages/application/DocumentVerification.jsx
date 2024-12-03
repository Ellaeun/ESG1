import PropTypes from "prop-types";

import InputField from "../../components/InputField";

DocumentVerification.propTypes = {
  data: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  formattedDate: PropTypes.string.isRequired,
  setFormattedDate: PropTypes.func.isRequired,
  currentSubProgress: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setActionModalSettings: PropTypes.func.isRequired,
  setSuccessModalSettings: PropTypes.func.isRequired,
  setCurrentProgress: PropTypes.func.isRequired,
  setIsFormCompleted: PropTypes.func.isRequired,
  submitAppointment: PropTypes.func.isRequired,
};

export default function DocumentVerification({
  data,
  handleChange,
  formattedDate,
  setFormattedDate,
  setCurrentProgress,
  currentSubProgress,
  setIsModalOpen,
  setActionModalSettings,
  setSuccessModalSettings,
  setIsFormCompleted,
  submitAppointment,
}) {
  // setCurrentProgress({
  //   completed: [true, true, false, false, false],
  //   current: "Entrance Examination",
  // });
  function handleModalOpen() {
    const date = new Date(data);
    const formattedDateValue = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    setFormattedDate(formattedDateValue);

    setIsModalOpen(true);
    setIsFormCompleted(false);
    setActionModalSettings({
      title: "Schedule Date",
      message: (
        <>
          <p>You have chosen the date {formattedDateValue}.</p>
          <br />
          <p className="text-red-800">
            Once the submission date is set, it cannot be rescheduled. Please
            ensure the date is correct before confirming.
          </p>
        </>
      ),
      action: () => submitAppointment(),
    });
    setSuccessModalSettings({
      handleClose: () => setIsModalOpen(false),
      title: "Submission Date Scheduled!",
      message: (
        <p>
          Your submission date is scheduled for {formattedDateValue}. Please be
          prepared to attend on the specified date.
        </p>
      ),
    });
  }

  return (
    <div className="flex h-full w-full flex-col items-center q-gap-20">
      {currentSubProgress === "Schedule Submission" && (
        <>
          <div className="flex w-full flex-col gap-2 bg-tertiary p-5 text-primary q-text-sm q-rounded-xl">
            <h1 className="q-text-base">Directions</h1>
            <ul className="list-disc pl-5">
              <li>
                Choose a date and time you can visit the Office of Student
                Affairs and Services &#40;OSAS&#41; at Cavite State University —
                Bacoor to personally submit the original copies of your uploaded
                requirements for validation.
              </li>
              <li>Select Submit Date to schedule your appointment.</li>
            </ul>
          </div>
          <InputField
            labelText="Verification Date"
            placeholder=""
            name="verificationDate"
            value={data}
            setValue={handleChange}
            type="date"
            attr="w-1/2"
            disabled={false}
          />
          <button
            className={`${data === "" ? "bg-secondary" : "bg-highlight text-primary hover:bg-highlight-light"} h-10 px-5 q-rounded-xl`}
            onClick={() => handleModalOpen()}
            disabled={data === ""}
          >
            Submit Date
          </button>
        </>
      )}
      {currentSubProgress === "Verification Date" && (
        <>
          <div className="flex flex-col items-center gap-10 pt-20">
            <h1 className="q-text-3xl">Document Verification Schedule</h1>
            <p className="bg-highlight p-5 px-10 text-primary q-text-xl q-rounded-xl">
              {formattedDate} at 8:00 AM
            </p>
            <p className="q-text-base">
              Bachelor of Science in Computer Science
            </p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="flex w-full flex-col bg-secondary p-5 q-text-base q-rounded-xl">
              <h1 className="q-text-base">Location</h1>
              <p>Cavite State University &mdash; Bacoor Gymnasium</p>
            </p>
            <div className="flex w-full flex-col gap-2 bg-secondary p-5 q-text-sm q-rounded-xl">
              <h1 className="q-text-base">Required Documents and Materials</h1>
              <ul className="flex list-disc flex-col pl-5">
                <li>A printed copy of the application form.</li>
                <li>A photocopy of the Grade 11 card.</li>
                <li>
                  A certificate from the school principal or adviser confirming
                  that the applicant is currently enrolled as a Grade 12
                  student, with the strand clearly indicated. The certificate
                  must bear an original signature; e-signatures will not be
                  accepted.
                </li>
                <li>An ordinary A4-size folder.</li>
              </ul>
            </div>
            <div className="flex w-full flex-col gap-2 bg-tertiary p-5 text-primary q-text-sm q-rounded-xl">
              <h1 className="q-text-base">Reminders</h1>
              <ul className="list-disc pl-5">
                <li>
                  Submission is only allowed on your scheduled date. Arriving on
                  a different date without a valid appointment will not be
                  entertained.
                </li>
                <li>
                  For inquiries, please contact the Office of Student Affairs
                  and Services.
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

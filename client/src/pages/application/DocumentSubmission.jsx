import { useState } from "react";
import PropTypes from "prop-types";

EntranceExamination.propTypes = {
  fullName: PropTypes.string.isRequired,
  setCurrentProgress: PropTypes.func.isRequired,
  currentSubProgress: PropTypes.string.isRequired,
};

export default function EntranceExamination({
  fullName,
  setCurrentProgress,
  currentSubProgress,
}) {
  const [paymentStatus, setPaymentStatus] = useState("Completed");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center q-gap-20">
      {currentSubProgress === "Submission Date" && (
        <>
          <div className="flex flex-col items-center gap-10 pt-20">
            <h1 className="q-text-3xl">Document Submission Schedule</h1>
            <p className="bg-highlight p-5 px-10 text-primary q-text-xl q-rounded-xl">
              Tuesday, December 25, 2024, at 8:00 AM
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
                <li>Valid ID.</li>
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
      {currentSubProgress === "Society Payment" &&
        paymentStatus === "Completed" && (
          <>
            <h1 className="q-text-3xl">Society Payment Status</h1>
            <h2 className="bg-highlight p-10 px-20 text-primary q-text-2xl q-rounded-3xl">
              Payment Successful!
            </h2>
            <div className="flex flex-col items-center q-text-base">
              <p className="text-center">
                Congratulations! Your payment for the society fee has been
                successfully processed.
              </p>
              <p>
                You may now proceed with confirming the completion of your
                enrollment process.
              </p>
            </div>
            <button
              className="bg-highlight p-3 px-5 text-primary q-rounded-xl hover:bg-highlight-light"
              onClick={() =>
                setCurrentProgress({
                  completed: [true, true, true, true, false],
                  current: "Enrollment Completed",
                })
              }
            >
              Confirm Enrollment
            </button>
          </>
        )}
      {currentSubProgress === "Society Payment" &&
        paymentStatus === "Failed" && (
          <>
            <h1 className="q-text-3xl">Society Payment Status</h1>
            <h2 className="bg-red-600 p-10 px-20 text-white q-text-2xl q-rounded-3xl">
              Payment Unsuccessful.
            </h2>
            <div className="flex flex-col items-center q-text-base">
              <p className="text-center">
                Unfortunately, your payment for the society fee could not be
                processed.
              </p>
              <p>
                For assistance or inquiries, please contact the Office of
                Student Affairs and Services.
              </p>
            </div>
          </>
        )}

      {currentSubProgress === "Society Payment" &&
        paymentStatus === "Pending" && (
          <>
            <h1 className="q-text-3xl">Society Payment Status</h1>
            <h2 className="bg-secondary p-10 px-20 text-tertiary q-text-2xl q-rounded-3xl">
              Payment Pending...
            </h2>
            <div className="flex flex-col items-center q-text-base">
              <p className="text-center">
                Your payment for the society fee is still being processed.
              </p>
              <p>
                Please ensure that the payment is completed in full to proceed
                with the next steps in your enrollment process.
              </p>
              <p>Kindly check back later for updates on your payment status.</p>
            </div>
            <button
              className="bg-tertiary p-3 px-5 text-primary q-rounded-xl hover:bg-tertiary/50"
              onClick={() => {}}
            >
              Check Payment Status Again
            </button>
          </>
        )}
    </div>
  );
}

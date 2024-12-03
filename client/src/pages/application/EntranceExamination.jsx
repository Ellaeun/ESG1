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
  const [evaluation, setEvaluation] = useState("Passed");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center q-gap-20">
      {currentSubProgress === "Exam Date" && (
        <>
          <div className="flex flex-col items-center gap-10 pt-20">
            <h1 className="q-text-3xl">Examination Schedule</h1>
            <p className="bg-highlight p-5 text-primary q-text-xl q-rounded-xl px-10">
              Tuesday, December 12, 2024, at 8:00 AM
            </p>
            <p className="q-text-base">
              Bachelor of Science in Computer Science
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-5">
            <p className="flex w-full flex-col bg-secondary p-5 q-text-base q-rounded-xl">
              <h1 className="q-text-base">Location</h1>
              <p>Cavite State University &mdash; Bacoor Gymnasium</p>
            </p>
            <div className="flex w-full flex-col gap-2 bg-secondary p-5 q-text-sm q-rounded-xl">
              <h1 className="q-text-base">Required Documents and Materials</h1>
              <ul className="flex list-disc flex-col pl-5">
                <li>A government-issued valid ID.</li>
                <li>A printed copy of the application form.</li>
                <li>Writing Materials &#40;Pen and Paper&#41;.</li>
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
                  For inquiries or to reschedule your examination, please contact
                  the Office of Student Affairs and Services.
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      {currentSubProgress === "Exam Evaluation" && (
        <div className="flex w-10/12 flex-col items-center gap-20">
          {evaluation === "Passed" && (
            <>
              <h1 className="q-text-3xl">Examination Result</h1>
              <h2 className="bg-highlight p-10 px-20 text-primary q-text-2xl q-rounded-3xl">
                Congratulations, Juan A. Dela Cruz{fullName}!
              </h2>
              <div className="flex flex-col items-center q-text-base">
                <p className="text-center">
                  You have successfully passed the entrance examination for the
                </p>
                <p>Bachelor of Science in Computer Science Program!</p>
              </div>
              <button
                className="bg-highlight p-3 px-5 text-primary q-rounded-xl hover:bg-highlight-light"
                onClick={() =>
                  setCurrentProgress({
                    completed: [true, true, true, false, false],
                    current: "Document Submission",
                  })
                }
              >
                Proceed to Document Submission
              </button>
            </>
          )}
          {evaluation === "Failed" && (
            <>
              <h1 className="q-text-3xl">Examination Result</h1>
              <h2 className="bg-tertiary p-10 px-20 text-primary q-text-2xl q-rounded-3xl">
                We regret to inform you.
              </h2>
              <div className="flex flex-col items-center q-text-base">
                <p className="text-center">
                  Unfortunately, you did not pass the entrance examination for
                  the
                </p>
                <p>Bachelor of Science in Computer Science Program.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

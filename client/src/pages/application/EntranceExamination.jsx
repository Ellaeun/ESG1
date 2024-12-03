import PropTypes from "prop-types";

EntranceExamination.propTypes = {
  p: PropTypes.string,
};

export default function EntranceExamination({ p }) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-20">
      <div className="flex w-full flex-col gap-2 bg-tertiary p-5 text-primary q-text-sm q-rounded-xl">
        <p>
          • For inquiries or to reschedule your examination, please contact the
          Office of Student Affairs and Services.
        </p>
      </div>
      <div className="flex flex-col items-center gap-10">
        <h1 className="q-text-3xl">Examination Schedule</h1>
        <p className="bg-highlight p-5 text-white q-text-xl q-rounded-xl">
          Tuesday, December 3, 2024, at 8:00 AM
        </p>
        <p className="q-text-base">Bachelor of Science in Computer Science</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="q-text-base">
          Venue: Cavite State University &mdash; Bacoor Gymnasium
        </p>
        <p className="q-text-base">
          What to Bring: Valid ID, printed application form, pen, and paper.
        </p>
        <p className="q-text-base">
          Reminder: Arrive 15&ndash;30 minutes early to avoid delays. Late
          arrivals may not be allowed to take the examination.
        </p>
      </div>
    </div>
  );
}

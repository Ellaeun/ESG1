import PropTypes from "prop-types";

import InputField from "../../components/InputField";

DocumentVerification.propTypes = {
  data: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default function DocumentVerification({
  data,
  handleChange,
  setIsModalOpen,
}) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-10">
      <div className="flex w-full flex-col gap-2 bg-tertiary p-5 text-primary q-text-sm q-rounded-xl">
        <h1 className="q-text-base">Directions</h1>
        <p>
          • Choose a date and time you can visit the Office of Student Affairs
          and Services &#40;OSAS&#41; at Cavite State University — Bacoor to
          personally submit the original copies of your uploaded requirements
          for validation.
        </p>
        <p>• Select Submit Date to schedule your appointment.</p>
      </div>
      <InputField
        labelText="Submission Date"
        placeholder="e.g. 2024-12-25"
        name="submissionDate"
        value={data}
        setValue={handleChange}
        type="date"
        attr="w-1/2"
        disabled={false}
      />
      <button
        className={`${data === "" ? "bg-secondary" : "bg-highlight text-white hover:bg-highlight-light"} h-10 px-5 q-rounded-xl`}
        onClick={() => setIsModalOpen(true)}
        disabled={data === ""}
      >
        Submit Date
      </button>
    </div>
  );
}

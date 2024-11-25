import PropTypes from "prop-types";

import CvsuLogo from "../assets/cvsu-logo.png";

Progress.propTypes = {
  children: PropTypes.element.isRequired,
  currentProgress: PropTypes.string.isRequired,
  setCurrentProgress: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};

export default function Progress({
  children,
  currentProgress,
  setCurrentProgress,
  tabs,
}) {
  return (
    <div className="flex z-20 h-screen w-screen">
      <div className="flex h-full w-4/12 flex-col items-center gap-5 px-10 py-5 q-text-base">
        <div className="flex w-full items-center gap-6 p-4 h-20">
          <img className="w-14" src={CvsuLogo} />
          <h1 className="q-text-3xl font-helvetica-compressed text-highlight">
            Admission
          </h1>
        </div>
        {tabs.map((tab, index) => (
          <>
            {currentProgress.current === tab.name && index !== 0 && (
              <div className="h-1/6 w-2 rounded-full bg-tertiary" />
            )}
            <button
              className={`${currentProgress.current === tab.name ? "bg-highlight" : currentProgress.completed[index] ? "bg-tertiary" : "bg-component"} flex w-full items-center gap-4 rounded-3xl px-8 py-6`}
              onClick={() =>
                setCurrentProgress({ ...currentProgress, current: tab.name })
              }
              disabled={
                currentProgress.current !== tab.name &&
                !currentProgress.completed[index]
              }
              key={index}
            >
              <img
                src={
                  currentProgress.current === tab.name
                    ? tab.iconPrimary
                    : currentProgress.completed[index]
                      ? tab.iconPrimary
                      : tab.iconTertiary
                }
              />
              <h2
                className={`${currentProgress.current === tab.name ? "text-primary" : currentProgress.completed[index] ? "text-primary" : "text-tertiary"}`}
              >
                {tab.name}
              </h2>
            </button>
          </>
        ))}
        <div className="h-full w-full rounded-3xl bg-component" />
      </div>
      {children}
    </div>
  );
}

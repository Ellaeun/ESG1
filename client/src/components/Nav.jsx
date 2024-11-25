import PropTypes from "prop-types";

import CvsuLogo from "../assets/cvsu-logo.png";

Nav.propTypes = {
  children: PropTypes.element.isRequired,
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
};

export default function Nav({ children, currentTab, setCurrentTab, tabs }) {
  return (
    <div className="z-20 flex h-screen w-screen">
      <div className="flex h-full w-4/12 flex-col items-center gap-5 px-10 py-5 q-text-base">
        <div className="flex h-20 w-full items-center gap-6 p-4">
          <img className="w-14" src={CvsuLogo} />
          <h1 className="q-text-3xl font-helvetica-compressed text-highlight">
            Admission
          </h1>
        </div>
        {tabs.map((tab, index) => (
          <>
            {tab.name === "Log Out" && (
              <div className="h-full w-full rounded-3xl bg-component" />
            )}
            <button
              className={`${currentTab === tab.name ? "bg-highlight hover:bg-highlight-light" : "bg-component hover:bg-tertiary/20"} flex w-full items-center gap-4 rounded-3xl px-8 py-6`}
              onClick={() => setCurrentTab(tab.name)}
              key={index}
            >
              <img
                src={
                  currentTab === tab.name ? tab.iconPrimary : tab.iconTertiary
                }
              />
              <h2
                className={`${currentTab === tab.name ? "text-primary" : "text-tertiary"}`}
              >
                {tab.name}
              </h2>
            </button>
          </>
        ))}
      </div>
      {children}
    </div>
  );
}

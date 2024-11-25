import PropTypes from "prop-types";

Nav.propTypes = {
  p: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default function Nav({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full w-4/12 bg-cyan-200">Nav</div>
      {children}
    </div>
  );
}

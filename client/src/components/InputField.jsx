import PropTypes from "prop-types";

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  attr: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default function InputField({
  labelText,
  placeholder,
  name,
  value,
  setValue,
  type,
  attr,
  disabled,
}) {
  return (
    <div className={`${attr} flex flex-col q-text-sm`}>
      <p className="p-1">{labelText}</p>
      <input
        className="bg-secondary p-3 placeholder-slate-600/60 q-rounded-xl focus:bg-white"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={setValue}
        disabled={disabled}
      />
    </div>
  );
}

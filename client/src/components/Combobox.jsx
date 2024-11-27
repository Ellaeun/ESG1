import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import DropdownTertiary from "../assets/arrow-tertiary.svg";

Combobox.propTypes = {
  items: PropTypes.array.isRequired,
  isSearchable: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  attr: PropTypes.string.isRequired,
};

export default function Combobox({
  items,
  isSearchable,
  labelText,
  placeholder,
  name,
  value,
  setValue,
	type,
  attr,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasJustOpened, setHasJustOpened] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownInputRef = useRef(null);
  const prevComboboxValueRef = useRef(value);

  function handleChangeValue(e, inputType) {
    const inputValue = e.target.value;

    if (inputValue !== "" && items.find((x) => x === inputValue)) {
      prevComboboxValueRef.current = inputValue;
    }

    if (inputType === "typed") {
      setIsOpen(true);
      setHasJustOpened(false);
    } else {
      setIsOpen(false);
    }

    setValue(e);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      const dropdown = dropdownRef.current;
      const dropdownInput = dropdownInputRef.current;

      if (dropdown && !dropdown.contains(event.target)) {
        setIsOpen(false);

        if (
          dropdownInput &&
          dropdownInput.value !== "" &&
          !items.find((x) => x === dropdownInput.value)
        ) {
          setValue({ target: { name, value: prevComboboxValueRef.current } });
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${attr} flex flex-col`}>
      <div className="flex justify-between p-1">
        <p className="">{labelText}</p>
      </div>
      <div className="relative flex items-center justify-end" ref={dropdownRef}>
        <img
          className="cursor absolute w-11 p-4 hover:brightness-200"
          src={DropdownTertiary}
          onClick={() => {
            setIsOpen(!isOpen);
            setHasJustOpened(true);
          }}
        />
        {isOpen && (
          <div className="absolute top-full z-10 mt-2 flex h-fit max-h-[30vh] w-full bg-tertiary/60 p-2 pr-0 backdrop-blur q-rounded-xl">
            <div className="scrollable-div flex w-full flex-col overflow-y-scroll">
              {items
                .map((x) =>
                  value === "" || hasJustOpened
                    ? x
                    : x.toLowerCase().includes(value.toLowerCase())
                      ? x
                      : null,
                )
                .filter((item) => item !== null)
                .map((item) => (
                  <button
                    className="w-full p-2 px-4 text-left text-primary q-rounded-xl hover:bg-tertiary/30"
                    onClick={() =>
                      handleChangeValue(
                        { target: { name, value: item } },
                        "chosen",
                      )
                    }
                    key={item}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        )}
        <input
          className={`${!isSearchable ? "cursor-default" : "focus:bg-primary"} w-full bg-secondary p-3 q-text-sm q-rounded-xl `}
          placeholder={placeholder}
          autoComplete="off"
					type={type}
          name={name}
          value={value}
          onChange={(e) => handleChangeValue(e, "typed")}
          onClick={() => {
            setIsOpen(true);
            setHasJustOpened(true);
          }}
          ref={dropdownInputRef}
          readOnly={!isSearchable}
        />
      </div>
    </div>
  );
}

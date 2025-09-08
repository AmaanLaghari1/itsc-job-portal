import Select from "react-select";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";

const CustomSelect = ({
  label,
  name,
  options,
  required=false,
  className = "",
  defaultValue = null, // Allow setting default value dynamically
  onSearchChange,
  ...rest
}) => {
  const theme = useSelector((state) => state.ui.theme); // Get theme from Redux store
  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: theme == 'dark' ? "#212631" : "#fff",
      color: theme == 'dark' ? "#fff" : "#000",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      padding: "2px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme == 'dark' ? "#fff" : "#000", // Ensures text remains white
    }),
    menu: (provided) => ({
        ...provided,
        background: theme == 'dark' ? "#1a1d21" : "#fff", // Change dropdown background color
      }),
      option: (provided, { isSelected, isFocused }) => ({
        ...provided,
        // background: theme == 'dark' ? "#1a1d21" : "#fff", // Change dropdown background color
        // background: isSelected ? "#3a3f44" : isFocused ? "#2a2f34" :  theme == 'dark' ? "#1a1d21" : "#fff", // Change hover & selected color
        background: isSelected 
        ? "#f9b115"
        : isFocused 
          ? "#c8b222"
          : (theme === 'dark' ? "#1a1d21" : "#fff"),
        color: theme == 'dark' ? "#fff" : "#000", // Change text color
        padding: "10px",
        cursor: "pointer",
    }),
  };

  const [inputValue, setInputValue] = useState(""); // State to track search input

  return (
    <div className={className}>
      <label className="form-label fw-bold" htmlFor={name}>
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          const selectedValue =
            options.find((opt) => opt.key == field.value) || defaultValue;

          return (
            <Select
              cacheOptions
              id={name}
              name={name}
              options={options}
              getOptionLabel={(option) => option.value}
              getOptionValue={(option) => option.key}
              getOptionSelected={(option, value) => option.key === value.key}
              value={selectedValue} // Set default dynamically
              onChange={(selectedOption) =>
                form.setFieldValue(name, selectedOption?.key || "")
              }
              onInputChange={(newValue, { action }) => {
                setInputValue(newValue);
                if (action === "input-change" && onSearchChange) {
                  onSearchChange(newValue); // Fetch search results
                }
              }}
              inputValue={inputValue}
              styles={customStyles}
              isSearchable
              classNamePrefix="custom-select" // Enables custom styles
              {...rest}
            />
          );
        }}
      </Field>

      <div className="text-danger small">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default CustomSelect;

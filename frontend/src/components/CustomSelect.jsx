import Select from "react-select";
import { Field, ErrorMessage } from "formik";

const CustomSelect = ({
  label,
  name,
  options,
  required = false,
  className = "",
  defaultValue = null, // Allow setting default value dynamically
  ...rest
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "#212631",
      color: "#000",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      padding: "2px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // Ensures text remains white
    }),
    menu: (provided) => ({
        ...provided,
        background: "#1a1d21", // Change dropdown background color
    }),
    option: (provided, { isSelected, isFocused }) => ({
        ...provided,
        background: isSelected ? "#3a3f44" : isFocused ? "#2a2f34" : "#1a1d21", // Change hover & selected color
        color: "#fff", // Change text color
        padding: "10px",
        cursor: "pointer",
    }),
  };

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          const selectedValue =
            options.find((opt) => opt.key === field.value) || defaultValue;

          return (
            <Select
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

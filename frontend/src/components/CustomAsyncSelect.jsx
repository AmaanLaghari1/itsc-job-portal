import AsyncSelect from "react-select/async";
import { Field, ErrorMessage } from "formik";
import axios from "axios";

const CustomAsyncSelect = ({
  label,
  name,
  options,
  required = false,
  className = "",
  apiEndpoint, // New: API endpoint for fetching options
  ...rest
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "#212631",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      padding: "2px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#1a1d21",
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      background: isSelected ? "#3a3f44" : isFocused ? "#2a2f34" : "#1a1d21",
      color: "#fff",
      padding: "10px",
      cursor: "pointer",
    }),
  };

  // Fetch options dynamically
  const fetchOptions = async (inputValue) => {
    try {
      const response = await axios.get(`${apiEndpoint}?search=${inputValue}`);
      return response.data.options.map((opt) => ({
        value: opt.DISCIPLINE_ID,
        label: opt.DISCIPLINE_NAME,
      }));
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }
  };

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </label>

      <Field name={name}>
        {({ form }) => (
          <AsyncSelect
            id={name}
            cacheOptions
            options={options} // Fetch data dynamically
            defaultOptions
            onChange={(selectedOption) =>
              form.setFieldValue(name, selectedOption?.value || "")
            }
            styles={customStyles}
            isSearchable
            classNamePrefix="custom-select"
            {...rest}
          />
        )}
      </Field>

      <div className="text-danger small">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default CustomAsyncSelect;

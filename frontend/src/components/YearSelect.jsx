import Select from 'react-select';
import { useField, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

const yearOptions = Array.from(
  { length: new Date().getFullYear() - 1970 + 1 },
  (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year.toString() };
  }
);

const YearSelect = ({name, label, value}) => {
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

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        options={yearOptions}
        value={yearOptions.find((opt) => opt.value == value)}
        onChange={(option) => setFieldValue(name, option?.value)}
        className="react-select-container"
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </>
  );
};

export default YearSelect;
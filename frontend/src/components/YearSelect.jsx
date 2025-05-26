import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

const yearOptions = Array.from(
  { length: new Date().getFullYear() - 1970 + 1 },
  (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year.toString() };
  }
);

const YearSelect = ({name, label, value}) => {
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
        classNamePrefix="react-select"
      />
    </>
  );
};

export default YearSelect;
import { useFormikContext, ErrorMessage } from 'formik';

const MultiCheckbox = ({ label, name, options }) => {
  const { values, setFieldValue } = useFormikContext();

  const currentSelections = values[name] || [];

  const handleCheckboxChange = (event, key) => {
    const checked = event.target.checked;
    let updated = [...currentSelections];

    if (checked) {
      updated.push({ key, required: "0" }); // default to Preferred
    } else {
      updated = updated.filter(item => item.key !== key);
    }

    setFieldValue(name, updated);
  };

  const handleRequiredChange = (event, key) => {
    const required = event.target.value;
    const updated = currentSelections.map(item =>
      item.key === key ? { ...item, required } : item
    );
    setFieldValue(name, updated);
  };

  const isChecked = (key) =>
    currentSelections.some(item => item.key === key);

  const getRequired = (key) =>
    currentSelections.find(item => item.key === key)?.required || "0";

  return (
    <div className='w-100'>
      <label>{label}</label>
      <div>
        {options.map((opt) => (
          <div className='d-flex gap-2' key={opt.key}>
            <div className='col-6 d-flex align-items-center p-2'>
              <input
                className='form-check form-check-input'
                type="checkbox"
                value={opt.key}
                checked={isChecked(opt.key)}
                onChange={(e) => handleCheckboxChange(e, opt.key)}
              />
              <label className="form-check-label mx-1">{opt.value}</label>
            </div>
            <div className='d-flex p-2 align-items-center'>
              <div>
                <label className="mx-1">Required?</label>
              </div>
              <select
                className='form-control d-inline'
                disabled={!isChecked(opt.key)}
                value={getRequired(opt.key)}
                onChange={(e) => handleRequiredChange(e, opt.key)}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="text-danger">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default MultiCheckbox;

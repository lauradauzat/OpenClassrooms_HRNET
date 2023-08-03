/**
 * Renders the form to create an employee using React components.
 *
 * @component
 * @returns {JSX.Element}
 */
import { useState , useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import  Modal from 'simple-modal-hrnet/dist/Modal';
import statesjson from  '../states.json'
import { useDispatch } from 'react-redux';




const Form = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to close the modal
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };

  useEffect(() => {
    const statesOptions = states.map(state => ({
      value: state.abbreviation,
      label: state.name
    }));
    setStatesOptions(statesOptions);
  }, []);

  

  const saveEmployee = () => {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const zipCode = document.getElementById('zip-code').value;
    const department = document.getElementById('department').value;
    const employee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      startDate: startDate.toLocaleDateString(),
      department,
      street,
      city,
      state: selectedState.value,
      zipCode
    };

    console.log(employee);
    setIsModalVisible(true); // Show the modal on successful form submission
    dispatch({ type: 'employees/addEmployee', payload: employee });

    // Reset form fields
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('department').value = '';
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('zip-code').value = '';
    setSelectedState(null);
    setStartDate(null);
    setDateOfBirth(null);
  };
  
  const states  = [...statesjson]

  const [statesOptions, setStatesOptions] = useState([]);

  return (
    <>
    <div className="form-container">
    <Link to="/list" className="btn btn-primary">Employees List</Link>
      <h1>Create Employee</h1>
      <form>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            id="date-of-birth"
            className="form-control"
            selected={dateOfBirth}
            onChange={date => setDateOfBirth(date)}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            id="start-date"
            className="form-control"
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="form-group">
            <label htmlFor="department">Department</label>
            <input type="text" id="department" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <Select
  styles={{
    control: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      backgroundColor: '#444',
      color: '#fff',
      outline: isFocused ? 'none' : null
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#444' : 'transparent',
      color: state.isSelected ? '#fff' : '#000'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff'
    })
  }}
  id="state"
  className="form-control"
  value={selectedState}
  onChange={state => setSelectedState(state)}
  options={statesOptions}
/>

        </div>
        <div className="form-group">
          <label htmlFor="zip-code">Zip Code</label>
          <input type="text" id="zip-code" className="form-control" />
        </div>
        <button type="button" className="btn btn-primary" onClick={saveEmployee}>
          Save
        </button>
      </form>
    </div>
    <Modal visible={isModalVisible} onClose={handleCloseModal} />
    </>

  );
};

export default Form;

/**
 * Renders the main application component using React Router.
 *
 * @component
 * @returns {JSX.Element}
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import EmployeeList from "./components/EmployeeList";
import './App.css';


function App() {


  return (
    <>     
   <Router>
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/list" element={<EmployeeList />} />
        {/* <Route path="*" element={<NotFound/>} />  */}
      </Routes>
    </Router>
    </>

  );
}

export default App;
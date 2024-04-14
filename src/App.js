import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Doctor from "./Components/Doctor";
import Patient from "./Components/Patient";
import Homepage from "./Components/Homepage";
import Appointment from "./Components/DocSchedules";
import DoctorHomepage from "./Components/DoctorHomepage";
import DocSchedules from "./Components/DocSchedules";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          {
            <Route
              path="/registration"
              element={<Registration></Registration>}
            ></Route>
          }

          {<Route path="/doctor" element={<Doctor></Doctor>}></Route>}
          {
            <Route
              path="/docschedules/:drId"
              element={<DocSchedules></DocSchedules>}
            ></Route>
          }
          <Route path="/doctorhomepage/doctors/drId" element={<DocSchedules/>}/>
          {<Route path="/patient" element={<Patient></Patient>}></Route>}
          {<Route path="/Doctorhomepage" element={<DoctorHomepage></DoctorHomepage>}></Route>}
          {<Route path="/homepage" element={<Homepage></Homepage>}></Route>}
        </Routes>
      </Router>
    </>
  );
}

export default App;

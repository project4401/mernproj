import { useState } from 'react';
import './App.css';
import Teacher from './components/Teacher';
import Subject from './components/Subject';
import Salle from './components/Salle';
function App() { 
  const [openTeacher, setOpenTeacher] = useState(false)
  const [openSubject, setOpenSubject] = useState(false)
  const [openSalle, setOpenSalle] = useState(false)
    return (
    <div className="App">
      <h1>Hey, click on the button to add : </h1> 
      <button className="openTeacherBtn" onClick={() => { setOpenTeacher(true); }}>  Teacher</button> <br></br>
      <button className="openSubjectBtn" onClick={() => { setOpenSubject(true); }}> Subject</button> <br></br>
      <button className="openSalleBtn" onClick={() => { setOpenSalle(true); }}>  Salle</button> <br></br>
      {openTeacher && <Teacher closeTeacher={setOpenTeacher} />}
      {openSubject && <Subject closeSubject={setOpenSubject} />}
      {openSalle && <Salle closeSalle={setOpenSalle} /> }
    </div>
  );
}

export default App;

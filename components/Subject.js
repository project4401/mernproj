import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subject.css";

function Subject({ closeSubject }) {
  // State variables to hold form data and list of teachers
  const [formData, setFormData] = useState({
    subject: "",
    teacher: "",
  });
  const [values, setValues] = useState([]);

  // Function to handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { subject, teacher } = formData;
      const data = { subject, teacher };
      const response = await axios.post(
        "http://localhost:4040/subject",
        data
      );
      console.log(response.data);
      alert("Subject data saved successfully!");
      closeSubject(false);
    } catch (error) {
      console.error("Error saving subject data:", error);
      alert("Failed to save subject data. Please try again.");
    }
  };

  // Function to fetch data from server

   // use effect to get teacher name from db
   useEffect(() => {
    fetch("http://localhost:4040/teacher")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the structure of data
        setValues(data);
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      });
  }, []);
  console.log(values);
  // Use effect to fetch data when component mounts
  /*useEffect(() => {
    getFetchData();
  }, []); 
**/
  // Render the component UI
  return (
    <div className="Subject">
      <div className="Container">
        <h4>Enter Subject Information</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="subject">Subject name:</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleOnChange}  required />
          </div>
          <div>
            <label htmlFor="teacher">Teacher:</label>
            <select id="teacher" name="teacher" value={formData.teacher} onChange={handleOnChange} required>
                 {values && values.length > 0 && values.map((teacher) => (
                  <option key={teacher._id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="Buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => closeSubject(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Subject;

import React, { useState, useEffect } from 'react';  // Import necessary modules from React
import axios from 'axios';  // Import Axios for making HTTP requests
import './Teacher.css';

function Teacher({ closeTeacher }) {  // Define the Teacher component, which receives a prop closeTeacher
  const [formData, setFormData] = useState({  // Define a state variable formData to hold form data
    name: '',
    email: '',
    phone: '',
    subject:'',
  });
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleOnChange = (e) => {  // Define a function to handle changes in form inputs
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {  // Define a function to handle form submission
    e.preventDefault();  // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:4040/teacher', formData);  // Send a POST request to save form data
      console.log(response.data);  // Log the response data to the console
      alert('Teacher data saved successfully!');  // Show an alert indicating successful data saving
      closeTeacher(false);  // Close the Teacher component
    } catch (error) {
      console.error('Error saving teacher data:', error);  // Log an error if data saving fails
      alert('Failed to save teacher data. Please try again.');  // Show an alert indicating failed data saving
    }
  };

  const getFetchData = async () => {  // Define an asynchronous function to fetch data from the server
    try {
      const response = await axios.get('http://localhost:4040/teacher');  // Send a GET request to fetch data from the server
      console.log(response.data);  // Log the fetched data to the console
    } catch (error) {
      console.error('Error fetching data:', error);  // Log an error if fetching data fails
    }
  };

  useEffect(() => {  // Use the useEffect hook to perform side effects (like data fetching) in function components
    getFetchData();  // Call the getFetchData function when the component mounts
  }, []);  // Use an empty dependency array to ensure the effect runs only once, when the component mounts
   
 // use effect to get subject name from db
 useEffect(() => {
  const getSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:4040/subject');
      console.log(response.data);
      setSubjects(Array.isArray(response.data) ? response.data : []);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
  getSubjects();
}, []);
  return ( 
    <div className="Teacher"> 
      <div className="modalOverlay"></div>
      <div className="modalContent">
      <div className="formContainer"> 
        <div className="title">  
          <h4>Enter Teacher Information</h4>  
        </div>
        <form onSubmit={handleSubmit}>  
          <div className="body">  
            <div>  
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleOnChange} required autocomplete="name" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleOnChange} required autocomplete="email" />
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleOnChange} required autocomplete="tel" />
            </div>
          </div>
          <div>
                <label htmlFor="subject">Subject Responsable:</label>
                {loading ? (
                  <select disabled>
                    <option>Loading...</option>
                  </select>
                ) : (
                  <select id="subject" name="subject" value={formData.subject} onChange={handleOnChange} required>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject.subject}>
                        {subject.subject}
                      </option>
                    ))}
                  </select>
                )}
              </div>

          <div className="Buttons"> 
            <button  type="submit">Submit</button>
            <button  type="button" onClick={() => closeTeacher(false)}>Cancel</button>
          </div>
        </form>
      </div> </div>
    </div>
  );
}

export default Teacher;  // Export the Teacher component for use in other parts of the application

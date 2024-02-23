import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./Salle.css";

function Salle ({ closeSalle }) {

  const [formData, setFormData] = useState({
    salle: '',
    capacity: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4040/salle', formData);
      console.log(response.data);
      alert('Salle data saved successfully!');
      closeSalle();
    } catch (error) {
      console.error('Error saving Salle data:', error);
      alert('Failed to save Salle data. Please try again.');
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4040/salle');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div className="Salle">
      <div className="Container">
        <h4>Enter Salle Information</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="salle"> Salle name:</label>
            <input type="text" id="salle" name="salle" value={formData.salle} onChange={handleOnChange} required />
          </div>
          <div>
            <label htmlFor="capacity"> Salle Capacite :</label>
            <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleOnChange} required />
          </div>
          <div className="Buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => closeSalle(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Salle;

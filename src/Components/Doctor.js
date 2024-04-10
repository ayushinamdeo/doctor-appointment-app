import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../index.css";

function Doctor() {
  const [doctor, setDoctor] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    contact_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwttoken"),
          },
          body: JSON.stringify({ doctor }),
        }
      );
      const data = await response.json();
      console.log(data); // Handle response from the API
    } 
    catch (error) {
      console.error("Error:", error);
    }

 
   
  };
  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        value={doctor.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="last_name"
        value={doctor.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={doctor.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="contact_number"
        value={doctor.contact_number}
        onChange={handleChange}
        placeholder="Contact Number"
      />
      <input
        type="password"
        name="password"
        value={doctor.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="password"
        name="password_confirmation"
        value={doctor.password_confirmation}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      <button type="submit">Create Doctor</button>
    </form>
    <Footer/>
    </>
  );
}
export default Doctor;

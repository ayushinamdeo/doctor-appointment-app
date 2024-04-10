import { useState } from "react";
import {useNavigate } from "react-router-dom";

export default function Registration() {
  //by defining only one state
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    contactnumber: ""
  });

  //to storevalue in local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/");
  };
  return (
    <div>
      {/* //{console.log(userData)} */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-white text-3xl py-3" >Welcome on board!</h2>
        <p className="text-white pb-3">We just need a little bit of data from you to get you started ??</p>

        <div className="control ">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <p id="err-msg"></p>
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>
        <hr />
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value={input.firstname}
              onChange={(e) =>
                setInput({ ...input, firstname: e.target.value })
              }
            />
          </div>

          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              value={input.lastname}
              onChange={(e) => setInput({ ...input, lastname: e.target.value })}
            />
          </div>
        </div>
        <div className="control">
            <label htmlFor="contact-number">Contact Number</label>
            <input
              type="number"
              id="contact-number"
              name="contact-number"
              value={input.contactnumber}
              onChange={(e) => setInput({ ...input, contactnumber: e.target.value })}
            />
          </div>

        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input type="checkbox" id="terms-and-conditions" name="terms" />I
            agree to the terms and conditions
          </label>
        </div>
        <p className="form-actions">
          <button type="reset" className="button button-flat">
            Reset
          </button>
          <button type="submit" className="button" onClick={handleSubmit}>
            Sign up
          </button>
        </p>
      </form>
    </div>
   
  );
}

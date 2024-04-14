import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setUser({...user,'role':event.target.value});
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });

 

  function navigateToRegistration() {
    navigate("/registration");
  }
  function navigateToDashboard(e) {
    e.preventDefault();
    console.log(user);

    if(user.role === "user") 
    {
      delete user.role ;
      navigate("/patient")
    }
    var data = JSON.stringify({
      user
    });
    console.log(data);

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/session",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' 
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          localStorage.setItem("jwttoken", res.data.user.authentication.token);
          localStorage.setItem("role", res.data.user.role);
          if (user.role ==="admin")
          navigate("/homepage");
        else if (user.role ==="doctor")
          navigate("/doctorhomepage")
        // else if(user.role ==="")
        //   navigate("/patient")
        } else {
          //Invalid credentials ui
         }
      })
      .catch((err) => {
        console.log(err);
      });
   
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const loggeduser = JSON.parse(localStorage.getItem("user"));

  //   if (
  //     user.email === loggeduser.email &&
  //     user.password === loggeduser.password
  //   ) {
  //     localStorage.setItem("loggedin", true);
  //     navigate("/homepage");
  //   } else {
  //     alert("wrong Email or Password");
  //   }
  // }

  return (
    <div>
      <form>
        <h2 className="text-white text-center text-2xl">Login</h2>

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>
        <div className="control no-margin">
          <div className="control no-margin">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </div>

        <label className="ml-72 text-white">
          Select Role:
          <select
            className="text-black ml-2"
            value={user.role}
            onChange={handleRoleChange}
          >
            <option value="">Select a role</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <button className="button button-flat">Reset</button>
        <button className="button text-white" onClick={navigateToDashboard}>
          Login
        </button>
        <p className="text-white">Don't have an Account?</p>
        <button
          type="submit"
          className="button signup"
          onClick={navigateToRegistration}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

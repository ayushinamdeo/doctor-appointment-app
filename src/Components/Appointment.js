import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Sidebar } from "flowbite-react";

const Appointments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    handleEditButton();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/55c9c836-9803-4e6a-b0c6-6b7a64669c73/schedules"
      );
      const data = await response.json();
      console.log(data);
      setData(data.schedules);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleEditButton = () => {
    var raw = JSON.stringify({
      schedule: {
        is_holiday: true,
      },
    });

    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
      },
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/55c9c836-9803-4e6a-b0c6-6b7a64669c73/schedules/088283d3-facb-4c6e-b0db-17b0a39e27ae",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <Navbar />
      <div className="inline-flex">
        <div className="content ">
          <div className="side bg-blue-50 h-[80vh]">
            <Sidebar aria-label="Default sidebar example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item>Welcome Doctor</Sidebar.Item>
                  <Sidebar.Item href="#"></Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </div>

        <div className="main-content w-[80vw]">
          <h1 className="text-center">Schedules</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Holidays</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.is_holiday ? "YES" : "NO"}</td>
                  <td>
                    {
                      <button
                        onClick={handleEditButton}
                        type="button"
                        class="btn btn-info"
                      >
                        Edit
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Appointments;

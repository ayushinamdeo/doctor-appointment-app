import React, { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Table } from "flowbite-react";
import "../index.css";
import { Link } from "react-router-dom";

const DoctorHomepage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
      },
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          setDoctors(res.data.doctors);
        } else {
          //Invalid credentials ui
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // var config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/55c9c836-9803-4e6a-b0c6-6b7a64669c73/schedules",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("jwttoken"),
    //   },
    // };
    // axios
    //   .request(config)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.status == true) {
    //       setSchedules(res.data.schedules);
    //     } else {
    //       //Invalid credentials ui
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //   var config = {
    //     method: "get",
    //     maxBodyLength: Infinity,
    //     url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules/09fe6e74-f013-4002-b6c5-dfa862db8161/availabilities",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + localStorage.getItem("jwttoken"),
    //     },
    //   };
    //   axios
    //     .request(config)
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.status == true) {
    //         setAvailability(res.data.availability);
    //       } else {
    //         //Invalid credentials ui
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //     var config = {
    //       method: "get",
    //       maxBodyLength: Infinity,
    //       url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/qualifications?page=1",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("jwttoken"),
    //       },
    //     };
    //     axios
    //       .request(config)
    //       .then((res) => {
    //         console.log(res);
    //         if (res.data.status == true) {
    //           setQualification(res.data.qualifications);
    //           console.log(res.data.qualifications);
    //         } else {
    //           //Invalid credentials ui
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
  }, []);

  return (
    <div className="overflow-x-auto app-container">
      <Navbar />

      <div className="main-cointainer sidebar">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item>Hello Doctor</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div />

        <div className="table-container content">
          <h1 className="text-align:center">Doctor List</h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>#</Table.HeadCell>
              <Table.HeadCell>FirstName</Table.HeadCell>
              <Table.HeadCell>LastName</Table.HeadCell>
              <Table.HeadCell>Contact Number</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {doctors.map((doctor, index) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <Table.Cell><Link to={"/docschedules/"+doctor.id}>{index + 1}</Link></Table.Cell>
                  <Table.Cell>{doctor.first_name}</Table.Cell>
                  <Table.Cell>{doctor.last_name}</Table.Cell>
                  <Table.Cell>{doctor.contact_number}</Table.Cell>
                  <Table.Cell>{doctor.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Footer />
      </div>
    </div>
  );
};
export default DoctorHomepage;

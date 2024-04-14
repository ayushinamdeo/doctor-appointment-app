import React, { useState, useEffect } from 'react';
import BookAppointments from './Modals/BookAppointments';
import { Sidebar } from "flowbite-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Table } from "flowbite-react";
import "../index.css";
import Qualifications from './Modals/Qualifications';


const Patient = () => {
//  const [doctorDetails, setDoctorDetails] = useState({});
 const [schedules, setSchedules] = useState([]);
  const [availability, setAvailability] = useState([]);
const [doctors, setDoctors] = useState([]);
const [qualification, setQualification] = useState([]);

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

    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/55c9c836-9803-4e6a-b0c6-6b7a64669c73/schedules",
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
          setSchedules(res.data.schedules);
        } else {
          //Invalid credentials ui
        }
      })
      .catch((err) => {
        console.log(err);
      });
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules/09fe6e74-f013-4002-b6c5-dfa862db8161/availabilities",
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
            setAvailability(res.data.availability);
          } else {
            //Invalid credentials ui
          }
        })
        .catch((err) => {
          console.log(err);
        });
        var config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/qualifications?page=1",
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
              setQualification(res.data.qualifications);
              console.log(res.data.qualifications);
            } else {
              //Invalid credentials ui
            }
          })
          .catch((err) => {
            console.log(err);
          });
}, []);



 return (
  <div className="overflow-x-auto app-container">
     
     
      <Navbar />
      

      <div className="main-cointainer sidebar">
        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item>Hello User</Sidebar.Item>
              
              <Sidebar.Item> <BookAppointments name='Book Appointments'/></Sidebar.Item>
             
              </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div />

        <div className="table-container content">
          <h1 className="text-align:center">Doctor List</h1>
          <Table>
            <Table.Head>
            {/* <Table.HeadCell>Doctor Id</Table.HeadCell> */}
              <Table.HeadCell>FirstName</Table.HeadCell>
              <Table.HeadCell>LastName</Table.HeadCell>
              <Table.HeadCell>Qualifications</Table.HeadCell>
              {/* <Table.HeadCell>Schedule</Table.HeadCell>
              <Table.HeadCell>Availability</Table.HeadCell> */}
              
            </Table.Head>
            <Table.Body className="divide-y">
              {doctors.map((doctor) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={doctor.id}
                >
                 {/* <Table.Cell>{doctor.id}</Table.Cell> */}
                  <Table.Cell>{doctor.first_name}</Table.Cell>
                  <Table.Cell>{doctor.last_name}</Table.Cell>

                  <Table.Cell>{qualification.map((q)=>(<>{`${q.degree}, `}</>
                   
                  ))}</Table.Cell>
                
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
export default Patient;
import { Sidebar } from "flowbite-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import "../index.css";
import Qualifications from "./Modals/Qualifications";
import Availabilities from "./Modals/Availibilities";
import Schedules from "./Modals/Schedules";

export default function Homepage() {
  const [doctors, setDoctors] = useState([]);
  const [qualification, setQualification] = useState([]);
  // const [showModal, setShowModal] = useState(false);

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
              <Sidebar.Item href="http://localhost:3000/doctor">
                Add Doctor
              </Sidebar.Item>
              <Sidebar.Item>
                {" "}
                <Qualifications name="Create Qualification" />
              </Sidebar.Item>
              <Sidebar.Item>
                {" "}
                <Availabilities name="Create Availabilities" />
              </Sidebar.Item>
              <Sidebar.Item>
                {" "}
                <Schedules name="Create Schedules" />
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div />

        <div className="table-container content">
          <h1 className="text-align:center">Doctor List</h1>
          <Table>
            <Table.Head>
              <Table.HeadCell>FirstName</Table.HeadCell>
              <Table.HeadCell>LastName</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Qualification</Table.HeadCell>
              <Table.HeadCell>ContactNumber</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {doctors.map((doctor) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={doctor.id}
                >
                  <Table.Cell>{doctor.first_name}</Table.Cell>
                  <Table.Cell>{doctor.last_name}</Table.Cell>
                  <Table.Cell>{doctor.email}</Table.Cell>
                  <Table.Cell>
                    {qualification.map((q) => (
                      <>{`${q.degree}, `}</>
                    ))}
                  </Table.Cell>

                  <Table.Cell>{doctor.contact_number}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Footer />
      </div>
    </div>
  );
}

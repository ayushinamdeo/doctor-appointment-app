import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Schedules from "./Schedules";

function BookAppointments({ name }) {
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [schedule, setSchedule] = useState({
   
  });

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
            setSchedule(res.data.schedules);
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
    
  }, []);

    // const [showModal, setShowModal] = useState(false);

  const handleAddschedule = async () => {
    var requestOptions = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
        body: JSON.stringify({ schedule: schedule }),
      },
      body: JSON.stringify({ schedule }),
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/55c9c836-9803-4e6a-b0c6-6b7a64669c73/schedules",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setShowModal(false);
    setSchedule(schedule.id);
  };

  const handleAddAvailabilities = async () => {
    var requestOptions = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
        body: JSON.stringify({ availability: availability }),
      },
      body: JSON.stringify({ availability }),
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules/09fe6e74-f013-4002-b6c5-dfa862db8161/availabilities",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setShowModal(false);
    setAvailability(schedule.availabilities.id);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log("schedule");
  return (
    <>
      <label onClick={handleOpenModal}>{name}</label>
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block", position: "absolute", zIndex: "1" }}
        >
          <Modal.Dialog size="lg">
            <Modal.Header closeButton onHide={() => setShowModal(false)}>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div
                style={{ backgroundColor: "white" }}
                onSubmit={handleAddschedule}
              >
                <div
                style={{ backgroundColor: "white" }}
                onSubmit={handleAddAvailabilities}
              ></div>
                
              
              <Dropdown>
                <Dropdown.Toggle variant="success">Doctors</Dropdown.Toggle>
                <Dropdown.Menu>
                  {doctors.map((doctor) => (
                    <Dropdown.Item href="#">
                      {doctor.id}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="success">Schedule</Dropdown.Toggle>
                <Dropdown.Menu>
                  {schedule.map((schedule) => (
                    <Dropdown.Item href="#">
                      {schedule.id}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {/* <Dropdown>
                <Dropdown.Toggle variant="success">Availability</Dropdown.Toggle>
                <Dropdown.Menu>
                  {schedule.availabilities.map((a) => (
                    <Dropdown.Item href="#">
                      {a.id}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown> */}
              </div>
              {/* <label>
                  availability_id:{" "}
                  <input type="text"
                    style={{ border: "1px solid black" }}
                    value={schedule.availability.id}
                    onChange={(e) => setAvailability({...availability,'availabilities_id':e.target.value})}
                  />
                </label> */}
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={handleCloseModal} variant="secondary">
                Close
              </Button>
              <Button
                onClick={handleAddschedule}
                type="submit"
                variant="primary"
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
}

export default BookAppointments;

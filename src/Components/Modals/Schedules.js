import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

function Schedules({ name }) {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [schedule, setschedule] = useState({
    doctor: "52553b23-c843-408d-a1f6-c730d638409b",
    days: [
      {
        day: "SunDay",
        time: ["10:10 am", "11:00 am", "12:00 pm", "09:28 pm"],
      },
      {
        day: "monday",
        time: ["09:28 pm", "08:00 am", "11:00 am"],
      },
      {
        day: "tuesday",
        time: ["09:28 pm", "08:00 am", "11:00 am"],
      },
      {
        day: "wednesday",
        time: ["09:28 pm", "08:00 am", "11:00 am"],
      },
      {
        day: "thursday",
        time: ["09:28 pm", "08:00 am", "11:00 am"],
      },
      {
        day: "friday",
        time: ["09:28 pm", "08:00 am", "11:00 am"],
      },
      {
        day: "saturday",
        time: ["09:28 pm", "08:00 am", "11:00 am"],
      },
    ],
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
  }, []);

  //   const [showModal, setShowModal] = useState(false);

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
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setShowModal(false);
    setschedule({ degree: "", description: "" });
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
                {/* <label>
                  Degree:{" "}
                  <input
                    style={{ border: "1px solid black" }}
                    type="text"
                    value={schedule.doctor}
                    onChange={(e) =>
                      setschedule({ ...schedule, doctor: e.target.value })
                    }
                  />
                </label> */}

                {/* <label>
                  Description:{" "}
                  <textarea
                    style={{ border: "1px solid black" }}
                    value={schedule.description}
                    onChange={(e) =>
                      setschedule({ ...schedule, description: e.target.value })
                    }
                  />
                </label> */}
              
              <Dropdown>
                <Dropdown.Toggle variant="success">Doctors</Dropdown.Toggle>
                <Dropdown.Menu>
                  {doctors.map((doctor) => (
                    <Dropdown.Item href="#">
                      {doctor.first_name + " " + doctor.last_name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="success">Day</Dropdown.Toggle>
                <Dropdown.Menu>
                  {schedule.days.map((day) => (
                    <Dropdown.Item href="#">
                      {day.day + " " + day.time}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {/* <Dropdown>
                <Dropdown.Toggle variant="success">Time</Dropdown.Toggle>
                <Dropdown.Menu>
                  {doctors.map((doctor) => (
                    <Dropdown.Item href="#">
                      {doctor.first_name + " " + doctor.last_name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown> */}
              </div>
              <label>
                  time:{" "}
                  <input type="text"
                    style={{ border: "1px solid black" }}
                    value={schedule.doctor.time}
                    onChange={(e) => setschedule({...schedule,'time':e.target.value})}
                  />
                </label>
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

export default Schedules;

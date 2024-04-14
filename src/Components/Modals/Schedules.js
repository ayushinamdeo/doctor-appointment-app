import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

function Schedules({ name }) {
  const [doctors, setDoctors] = useState([]);
  const [doctorsId, setDoctorsId] = useState([]);
  const [day, setDay] = useState([]);
  const [timings, setTimings] = useState([""]);
  const [showModal, setShowModal] = useState(false);
 
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

  const handleAddschedule = async () => {
    console.log(timings);
    console.log(day);
    const token = localStorage.getItem("jwttoken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      schedule: {
        doctor: doctorsId,
        days: [
          {
            day: day,
            time: [...timings],
          },
        ],
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status) {
          console.log(res.message);
        } else {
          console.log(res.message + "\n You are not Allowed to do this");
        }
      })
      .catch((error) => console.error(error));

    console.log(raw);

    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
                <Dropdown>
                  <Dropdown.Toggle variant="success">Doctors</Dropdown.Toggle>
                  <Dropdown.Menu
                    onChange={(e) => {
                      setDoctorsId(e.target.value);
                    }}
                  >
                    {doctors.map((doctor) => (
                      <Dropdown.Item
                        onClick={() => {
                          setDoctorsId(doctor.id);
                        }}
                      >
                        {doctor.first_name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="success">Day</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("sunday");
                      }}
                    >
                      {"sunday"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("monday");
                      }}
                    >
                      {"monday"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("tuesday");
                      }}
                    >
                      {"tuesday"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("wednesday");
                      }}
                    >
                      {"wednesday"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("thursday");
                      }}
                    >
                      {"thursday"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("friday");
                      }}
                    >
                      {"friday"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setDay("saturday");
                      }}
                    >
                      {"saturday"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <label>Timings</label>
              {timings.map((timing, i) => (
                <div key={i}>
                  <input
                    className="border"
                    type="text"
                    key={i}
                    id="id"
                    value={timing}
                    onChange={(event) => {
                      const timeArray = [...timings];
                      timeArray[i] = event.target.value;
                      setTimings(timeArray);
                    }}
                  />
                  <button
                    className="w-[15%] ml-[5%] border rounded-lg bg-red-400 text-white hover:bg-red-500"
                    onClick={() => {
                      if (timings.length > 1) {
                        const newTimings = timings.filter(
                          (_, index) => index !== i
                        );
                        setTimings(newTimings);
                      }
                    }}
                  >
                    {" "}
                    X
                  </button>
                </div>
              ))}
              <button
                className="w-full border rounded-lg bg-gray-100 text-gray-800 p-2.5 hover:bg-blue-300"
                onClick={() => {
                  setTimings([...timings, ""]);
                }}
              >
                +
              </button>
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

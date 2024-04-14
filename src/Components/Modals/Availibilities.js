import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";

function Availabilities({ name }) {

  const params = useParams();
  const schId = params.schId;
  const [availabilities, setAvailabilities] = useState([]);
  const [time, setTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [schedules, setSchedules] = useState([]);
 
  

  useEffect(() => {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules/${schId}/availabilities",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwttoken"),
      },
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
        setAvailabilities(res.schedule.availabilities);
        // if (res.data.status == true) {
        //   setSchedules(res.data.schedules);
        // } else {
        //   //Invalid credentials ui
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
   



const handleAddAvailabilities = async () => {
var myHeaders = new Headers();
myHeaders.append("Authorization", "jwttoken");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  availabilities: {
    time: [time],
    schedule_id: schId,
  },
}
);

console.log(schedules);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://psl-test2-b8593d29856b.herokuapp.com/api/v1/availabilities", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    var requestOptions = {
      method: 'POST',
      headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwttoken"),
                body: JSON.stringify( {availabilities})
              },
      body: JSON.stringify({availabilities}),
      redirect: 'follow'
    };
    
  
    setShowModal(false);
  setAvailabilities({time:'', schedule_id: schedules});
  };
  

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
   console.log('availabilities');
  return (
    <>
      <label onClick={handleOpenModal}>{name}</label>
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block", position: "absolute", zIndex: "1" }}
        >
          <Modal.Dialog size="lg">
            <Modal.Header closeButton onHide={()=>setShowModal(false)}>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            
              <div
                style={{ backgroundColor: "white" }}
                onSubmit={handleAddAvailabilities}
              >
                 <Dropdown>
                  <Dropdown.Toggle variant="success">Schedule Id</Dropdown.Toggle>
                  <Dropdown.Menu
                    onChange={(e) => {
                      setSchedules(e.target.value);

                    }}
                    
                  >
                    
                    {schedules.map((s) => (
                      <Dropdown.Item
                        onClick={() => {
                          setSchedules(s.id);
                        }}
                      >
                        {s.id}
                        {/* {s.date} */}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <label>
                  Time:{" "}
                  <input
                    style={{ border: "1px solid black" }}
                    type="text"
                    value={availabilities.time}
                    onChange={(e) => setAvailabilities({...availabilities,'time':e.target.value})}
                  />
                </label>
 
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={handleCloseModal} variant="secondary">
                Close
              </Button>
              <Button
                onClick={handleAddAvailabilities}
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

export default Availabilities;

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";


function Availabilities({ name }) {
  const [availabilities, setAvailabilities] = useState({
    time: "",
    schedule_id: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleAddAvailabilities = async () => {
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
    
    fetch("https://psl-test2-b8593d29856b.herokuapp.com/api/v1/availabilities", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setShowModal(false);
  setAvailabilities({time:'', schedule_id:''});
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
                <label>
                  Time:{" "}
                  <input
                    style={{ border: "1px solid black" }}
                    type="text"
                    value={availabilities.degree}
                    onChange={(e) => setAvailabilities({...availabilities,'time':e.target.value})}
                  />
                </label>

                <label>
                  schedule_id:{" "}
                  <input type="text"
                    style={{ border: "1px solid black" }}
                    value={availabilities.description}
                    onChange={(e) => setAvailabilities({...availabilities,'schedule_id':e.target.value})}
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

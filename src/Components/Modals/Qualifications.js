import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";

function Qualifications({ name }) {
  const [qualification, setQualification] = useState({
    degree: "",
    description: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddQualification = async () => {

    
    var requestOptions = {
      method: 'POST',
   
      headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwttoken"),
                body: JSON.stringify( {qualification:qualification})
              },
      body: JSON.stringify({qualification}),
      redirect: 'follow'
    };
    
    fetch("https://psl-test2-b8593d29856b.herokuapp.com/api/v1/qualifications", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));



   
    setShowModal(false);
  setQualification({degree:'', description:''});
  };
  

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log('qualification');
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
                onSubmit={handleAddQualification}
              >
                <label>
                  Degree:{" "}
                  <input
                    style={{ border: "1px solid black" }}
                    type="text"
                    value={qualification.degree}
                    onChange={(e) => setQualification({...qualification,'degree':e.target.value})}
                  />
                </label>

                <label>
                  Description:{" "}
                  <input type="text"
                    style={{ border: "1px solid black" }}
                    value={qualification.description}
                    onChange={(e) => setQualification({...qualification,'description':e.target.value})}
                  />
                </label>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={handleCloseModal} variant="secondary">
                Close
              </Button>
              <Button
                onClick={handleAddQualification}
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

export default Qualifications;

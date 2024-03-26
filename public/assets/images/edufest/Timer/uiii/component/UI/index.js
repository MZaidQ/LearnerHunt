import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Timer from "../Timer";
import Image from "next/image";
import { TfiTimer } from "react-icons/tfi";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



function AutoLayoutExample() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };



  return (
    <>
    <Container className="filter">
      <div
        style={{
          border: "1px solid #C0C2C9",
          width: "1280px",
          background: "white",
          marginTop: "20px",
        }}
      >
        <Row style={{ padding: "70px" }}>
          <Col xs={3}>
            <Row
              className="filter1"
              style={{
                margin: "8px 0px 0px 0px",
                color: "#5D5D5B",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              NETWORKING FAIR
            </Row>
            <Row
              className="filter1"
              style={{
                margin: "8px 0px 0px 0px",
                color: "#1D1D1b",
                fontSize: "28px",
                fontWeight: "500",
              }}
            >
              9 December 2023
            </Row>
          </Col>
          <Col xs={3}>
            <Row
              className="filter1"
              style={{
                margin: "8px 0px 0px 0px",
                color: "#5D5D5B",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              TIME
            </Row>
            <Row
              className="filter1"
              style={{
                margin: "4px 0px 0px 0px",
                color: "#1D1D1b",
                fontSize: "28px",
                fontWeight: "500",
              }}
            >
              11.30 - 14.30
            </Row>
            <Row
              className="filter1"
              style={{
                margin: "4px 0px 0px 0px",
                color: "#797979",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Asia/Calcutta
            </Row>
          </Col>
          <Col xs={3}>
            <Row
              className="filter1"
              style={{
                margin: "8px 0px 0px 0px",
                color: "#5D5D5B",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              TIME
            </Row>
            <Row
              className="filter1"
              style={{
                margin: "4px 0px 0px 0px",
                color: "#1D1D1b",
                fontSize: "28px",
                fontWeight: "500",
              }}
            >
              14.00 - 17.30
            </Row>
            <Row
              className="filter1"
              style={{
                margin: "4px 0px 0px 0px",
                color: "#797979",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Asia/Calcutta
            </Row>
          </Col>
          <Col xs={3}>
            <Row
              className="filter1"
              style={{
                margin: "8px 0px 0px 0px",
                color: "#5D5D5B",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              LOCATION
            </Row>
            <Row
              style={{
                margin: "4px 0px 0px 0px",
                color: "#1D1D1b",
                fontSize: "26px",
                fontWeight: "500",
              }}
            >
              The St. Regis Mumbai
            </Row>
            <Row
              className="filter1"
              style={{
                margin: "4px 0px 0px 0px",
                color: "#797979",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              462, Senapati Bapat Marg, Mumbai
            </Row>
          </Col>
        </Row>
        {/* position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        height: 100px; 
        width: 200px; 
        border-radius: 150px 150px 0 0; 
        background-color: green; 
 */}
        <div
          style={{
            width: 'calc(100% + 2px)',
            marginLeft: '-1px',
            padding: 0,
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: "1050",
                      }}
        >
          <div
            style={{
              height: "20px",
              width: "15px",
              border: "1px solid #C0C2C9",
              borderRadius: "50px 0  0 50px",
              borderRight: "1px solid white",
            }}
          ></div>
          <div
            style={{
              borderBottom: "3px dashed rgb(192, 194, 201)",
              width: "calc(100% - 50px)",
              height: "3px",
            }}
          ></div>
          <div
            style={{
              height: "20px",
              width: "15px",
              border: "1px solid #C0C2C9",
              borderRadius: "0 50px 50px 0",
              borderLeft: "1px solid white",
            }}
          ></div>
        </div>
        <Row style={{ padding: "60px" }}>
          <Col>
            <Row>
              <Col xs={1}>
                {" "}
                <TfiTimer style={{ height: "30px", width: "30px" }} />
              </Col>
              <Col
                style={{
                  color: "#1D1D1b",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "black",
                }}
              >
                <Timer />
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  margin: "16px 0px 0px 0px",
                  color: "#b00020",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Hurry up! Limited Slots Available
              </Col>
            </Row>
          </Col>
          <Col>
            <Row></Row>
          </Col>
          <Col>
            <Row>
              <Button
              onClick={handleShow}
                style={{
                  margin: "30px 0px 0px 0px",
                  color: "#1D1D1b",
                  fontSize: "20px",
                  fontWeight: "500",
                  background: "#f7a70d",
                  height: "46px",
                  width: "170px",
                  border: ".9px solid transparent",
                }}
              >
                REGISTER NOW
              </Button>{" "}
            </Row>
          </Col>
        </Row>
      </div>
    </Container>

    <Modal show={show} onHide={handleClose}style={{
margin:'auto'        }}>
        <Modal.Header closeButton>
          <Modal.Title         style={{
margin:'auto'        }}
>Learner Hunt</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}
        
        >

        <Col className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01" >
          <Form.Label style={{fontSize:'20px',fontWeight:'500',marginLeft:'30px' }} required>First name</Form.Label>
          <Form.Control
          style={{fontSize:'20px',fontWeight:'500',marginLeft:'30px' }}
            required
            type="text"
            placeholder="First name"
          />
                      <Form.Control.Feedback type="invalid"style={{fontWeight:'500',marginLeft:'30px' }}>
              Please choose First Name.
            </Form.Control.Feedback>

        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02" >
          <Form.Label style={{fontSize:'20px',fontWeight:'500',marginLeft:'30px' }}>Last name</Form.Label>
          <Form.Control
          style={{fontSize:'20px',fontWeight:'500',marginLeft:'30px' }}
            required
            type="text"
            placeholder="Last name"
            fullscreen
          />
                      <Form.Control.Feedback type="invalid" style={{fontWeight:'500',marginLeft:'30px' }}>
              Please choose Last Name.
            </Form.Control.Feedback>

        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label style={{fontSize:'20px',fontWeight:'500',marginLeft:'30px' }}>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
            style={{fontSize:'20px',fontWeight:'500',marginLeft:'30px' }}
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid" style={{fontWeight:'500',marginLeft:'30px' }}>
              Please choose  email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"              type="submit"
>
            Registered
          </Button>
        </Modal.Footer>
              </Form>

      </Modal>


    </>
  );
}

export default AutoLayoutExample;

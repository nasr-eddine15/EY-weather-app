import { useHistory } from "react-router";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const WeatherScreen = (props) => {
  const { city, Kelvin, tempType } = props.location.state;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const moreWeatherHandler = () => {
    // redirect to HomeScreen
    history.push("/");
  };

  const closeHandler = () => {
    // close app
    handleShow();
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sorry, but for security reasons JavaScript does not allow you to close
          a window it did not directly open.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="text-box result">
        <p>
          Weather in {city} is about{" "}
          {tempType === "Celsius"
            ? `${(Kelvin - 273.15).toFixed(2)} °C`
            : `${(((Kelvin - 273.15) * 9) / 5 + 32).toFixed(2)} °F`}
        </p>
      </div>
      <button onClick={closeHandler}>Close</button>
      <button onClick={moreWeatherHandler}>More Weather</button>
    </div>
  );
};

export default WeatherScreen;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const HomeScreen = (props) => {
  const [USER_FULL_NAME, setUSER_FULL_NAME] = useState("");
  const axios = require("axios");
  const [tempType, setTempType] = useState("Celsius");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNameChange = (e) => {
    const nameEntered = e.target.value;
    setUSER_FULL_NAME(nameEntered);
  };
  const handleCityChange = (e) => {
    const cityEntered = e.target.value;
    setCity(cityEntered);
  };

  const handleTempTypeChange = (e) => {
    setTempType(e.target.value);
  };

  const history = useHistory();

  const getWeatherHandler = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    if (city) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=
          ${city}&appid=${API_KEY}`
        )
        .then((res) => {
          const K = res.data.main.temp;
          const cityName = res.data.name;

          history.push({
            pathname: "/weather",
            state: { city: cityName, Kelvin: K, tempType: tempType },
          });
        })
        .catch((err) => {
          handleShow();
          setError(err.message);
        });
    } else {
      handleShow();
      setError("Please enter a city");
    }
  };

  return (
    <div className="">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <label className="label">User Name</label>
      <input
        type="text"
        className="text-box user-input"
        onChange={handleNameChange}
        placeholder="Enter your name"
      ></input>
      <div className="text-box">
        <p>Hello {USER_FULL_NAME}!</p>
        <p>Please enter City name, and choose "Weather response in"</p>
      </div>
      <input
        type="text"
        className="text-box"
        placeholder="Enter City/Location"
        onChange={handleCityChange}
      ></input>
      <label className="label">Select the weather response in</label>
      <div className="temp-box">
        <input
          className="temp-input"
          type="radio"
          id="Fahrenheit"
          name="temp-type"
          value="Fahrenheit"
          onChange={handleTempTypeChange}
        ></input>
        <label className="temp-label" htmlFor="Fahrenheit">
          Fahrenheit
        </label>
      </div>
      <div className="temp-box">
        <input
          className="temp-input"
          type="radio"
          id="Celsius"
          name="temp-type"
          value="Celsius"
          onChange={handleTempTypeChange}
          defaultChecked
        ></input>
        <label className="temp-label" htmlFor="Celsius">
          Celsius
        </label>
      </div>
      <button className="weather-btn" onClick={getWeatherHandler}>
        Get Weather
      </button>
    </div>
  );
};

export default HomeScreen;

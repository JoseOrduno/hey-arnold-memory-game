import React, { useState } from "react";
import MemoryGame from "./components/MemoryGame";
import { Button, Form } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [level, setLevel] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const validateValues = () => {
    if (value) {
      setLevel(value);
    } else {
      setError("enter a valid value");
    }
  };

  const cleanValues = () => {
    setLevel(null);
    setValue(null);
    setError(null);
  };
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <h1>Hey Arnold MemoryGame</h1>
        <div className="d-flex">
          {level === null ? (
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  how many cards do you want play(number will be multiply by 2)?
                </Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="8"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <div className="flex-row ">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ color: "red" }}
                >
                  {error && <b>{error}</b>}
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    className="marginbutton"
                    onClick={() => validateValues()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Form>
          ) : (
            <>
              <Button
                className="marginbutton"
                onClick={() => {
                  const prevOptions = level;
                  setLevel(null);
                  setTimeout(() => {
                    setLevel(prevOptions);
                  }, 5);
                }}
              >
                restart game
              </Button>
              <Button className="marginbutton" onClick={() => cleanValues()}>
                Main Menu
              </Button>
            </>
          )}
        </div>
      </div>

      {level ? <MemoryGame level={level} setLevel={setLevel} /> : null}
    </div>
  );
};

export default App;

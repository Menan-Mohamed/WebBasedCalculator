import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App() {
  const [value, setValue] = useState("");
  const [value0, setValue0] = useState("");

  const handleButtonClick = async (buttonValue) => {
    if (buttonValue === "C" || buttonValue === "CE") {
      setValue("");
      setValue0("");
    } else if (buttonValue === "de") {
      setValue(value.slice(0, -1));
    } else if (buttonValue === "=") {
      setValue0(value+" =");

      try {
        const response = await axios.post(
          'http://localhost:8080/evaluate',
          { expression: value }, 
          { headers: { 'Content-Type': 'application/json' } }
        );
        setValue( response.data.toString()); 
      }catch (err) {
          console.error("Error from server:", err.response?.data || err.message, err);
          setValue("Error");
        }
        
    } else {
      setValue(value + buttonValue); 
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <form action="">
          <div>
            <input type="text" value={value0} readOnly />
            <br/>
            <input type="text" value={value} readOnly />
          </div>
          
          <div>
            <button type="button" onClick={() => handleButtonClick("%")}>%</button>
            <button type="button" onClick={() => handleButtonClick("CE")}>CE</button>
            <button type="button" onClick={() => handleButtonClick("C")}>C</button>
            <button type="button" onClick={() => handleButtonClick("de")}>
              <FontAwesomeIcon icon={faBackspace} />
            </button>
          </div>

          <div>
            <button type="button" onClick={() => handleButtonClick("1/")}>1/x</button>
            <button type="button" onClick={() => handleButtonClick("^2")}>x²</button>
            <button type="button" onClick={() => handleButtonClick("^(1/2)")}>√x</button>
            <button type="button" onClick={() => handleButtonClick("/")}>÷</button>
          </div>
          
          <div>
            <button type="button" onClick={() => handleButtonClick("7")}>7</button>
            <button type="button" onClick={() => handleButtonClick("8")}>8</button>
            <button type="button" onClick={() => handleButtonClick("9")}>9</button>
            <button type="button" onClick={() => handleButtonClick("*")}>×</button>
          </div>

          <div>
            <button type="button" onClick={() => handleButtonClick("6")}>6</button>
            <button type="button" onClick={() => handleButtonClick("5")}>5</button>
            <button type="button" onClick={() => handleButtonClick("4")}>4</button>
            <button type="button" onClick={() => handleButtonClick("-")}>-</button>
          </div>

          <div>
            <button type="button" onClick={() => handleButtonClick("3")}>3</button>
            <button type="button" onClick={() => handleButtonClick("2")}>2</button>
            <button type="button" onClick={() => handleButtonClick("1")}>1</button>
            <button type="button" onClick={() => handleButtonClick("+")}>+</button>
          </div>

          <div>
            <button type="button" onClick={() => handleButtonClick("*-1")}>+/-</button>
            <button type="button" onClick={() => handleButtonClick("0")}>0</button>
            <button type="button" onClick={() => handleButtonClick(".")}>.</button>
            <button type="button" onClick={() => handleButtonClick("=")} className='eq'>=</button>
          </div>
        </form>
      </div>
    </div>
  );
}

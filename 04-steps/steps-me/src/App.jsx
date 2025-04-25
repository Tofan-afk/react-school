import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isMin, setIsMin] = useState(true);
  const [isMax, setIsMax] = useState(false);

  function handlePrevious() {
    setStep(step - 1);
    setIsMax(false);
    console.log(step);
    if (step == 2) {
      setIsMin(true);
    }
  }

  function handleNext() {
    setStep(step + 1);
    setIsMin(false);
    console.log(step);
    if (step === messages.length - 1) {
      setIsMax(true);
    }
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <p className="message">
        Step {step}: {messages[step - 1]}
      </p>

      <div className="buttons">
        <button
          className={`button ${isMin ? "" : "enable"}`}
          onClick={() => {
            handlePrevious();
          }}
          disabled={isMin}
        >
          Previous
        </button>

        <button
          className={`button ${isMax ? "" : "enable"}`}
          onClick={() => {
            handleNext();
          }}
          disabled={isMax}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

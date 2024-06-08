import React from "react";

const QuestionComponent = ({ question, options, handleAnswerQuestion }) => {
  return (
    <div className="question-component">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerQuestion(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
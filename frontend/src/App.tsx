import React, { useState } from "react";
import type { Email } from "./types/Email";
import sampleEmails from "./data/sampleEmails.json";

const emails: Email[] = sampleEmails as Email[];

function App() {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  const total = emails.length;

  const handleSubmit = () => {
    const currentEmail = emails[currentEmailIndex];
    if (userAnswer === null) {
      alert("Please select an answer.");
      return;
    }

    if (userAnswer === currentEmail.isPhish) {
      // make email container flash green
      document.getElementsByClassName("email-container")[0].classList.add("correct");
      setTimeout(() => {
        document.getElementsByClassName("email-container")[0].classList.remove("correct"); 
      }, 1000);
      setScore(score + 1);
    } else {
      document.getElementsByClassName("email-container")[0].classList.add("incorrect");
      setTimeout(() => {
        document.getElementsByClassName("email-container")[0].classList.remove("incorrect");
      }, 1000);
    }

    if (currentEmailIndex < total - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
      setUserAnswer(null); // Reset the answer for the next email
    } else {
      setCurrentEmailIndex(0);
      setScore(0);
      setUserAnswer(null);
      document.body.innerHTML =     `<div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Catch The Phish</h1>
      </header> <main className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Quiz Completed!</h2>
        <h3 className="text-lg font-medium">Your final score is ${score + (userAnswer === currentEmail.isPhish ? 1 : 0)} out of ${total}.</h3>
      </main>
    </div>`;
    }
  };

  const currentEmail = emails[currentEmailIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Catch The Phish</h1>
      </header>
      <main className="max-w-2xl mx-auto bg-white p-6 rounded shadow email-container" id="email-container">
        <h2 className="text-2xl font-semibold mb-4">Email {currentEmailIndex + 1} of {total}</h2>
        <h2 className="text-xl font-semibold mb-2">
          From: {currentEmail.senderDisplay} &lt;{currentEmail.sender}&gt;
        </h2>
        <h3 className="text-lg font-medium mb-2">Subject: {currentEmail.subject}</h3>
        <p className="mb-4">{currentEmail.body}</p>
        <div className="mb-4">
          <label className="block mb-2">Is this email a phishing attempt?</label>
          <div>
            <input
              type="radio"
              id="phish"
              name="phish"
              value="true"
              checked={userAnswer === true}
              onChange={() => setUserAnswer(true)}
            />
            <label htmlFor="phish" className="ml-2">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="notPhish"
              name="phish"
              value="false"
              checked={userAnswer === false}
              onChange={() => setUserAnswer(false)}
            />
            <label htmlFor="notPhish" className="ml-2">No</label>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Answer
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Score: {score} / {total}</h3>
        </div>
      </main>
    </div>
  );
}

export default App;

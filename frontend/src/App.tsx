import type { Email } from "./types/Email";
import sampleEmails from "./data/sampleEmails.json";

const emails: Email[] = sampleEmails as Email[];

function showEmailSimulation() {
  alert("Email Quiz started!.");
  document.body.innerHTML = `<h1>Score: 0` ; // Clear existing content
  for (const email of emails) {
    answerEmail(email, score);
}
}

var score = 0;
const total = emails.length;

function answerEmail(email: Email, score: number) {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  document.body.innerHTML += `
    <div class="email-card">
      <h2>${email.subject}</h2>
      <p><strong>From:</strong> ${email.senderDisplay} &lt;${email.sender}&gt;</p>
      <p>${email.body}</p>
      <p><strong>Clues:</strong> ${email.clues.join(", ")}</p>
      <hr/>
    </div>`;
  document.body.innerHTML += `<button id="yesBtn">Yes</button> <button id="noBtn">No</button>`;
  document.getElementById("yesBtn")!.onclick = function() {
    if (email.isPhish) {
      score++;
      alert(score);
      alert("Correct! This is a phishing email.");

    } else {
      alert("Incorrect. This is not a phishing email.");
    }

}
document.getElementById("noBtn")!.onclick = function() {
    if (!email.isPhish) {
      score++;
      alert(score);
      alert("Correct! This is not a phishing email.");

    } else {
      alert("Incorrect. This is a phishing email.");
    }


  }
  document.body.innerHTML += `<h2>Score: ${score} out of ${total}</h2>`;
  document.body.innerHTML += `<button id="nextBtn" >Next Email</button>`;

}
  

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Catch The Phish</h1>
        <input type="button" id="startBtn" value="Start Simulation" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" onClick={showEmailSimulation} />
      </header>
    </div>
  );
}

export default App;

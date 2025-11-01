let players = [];
let rotation = [];
let scoreA = 0, scoreB = 0, setLimit = 15;

document.getElementById("startBtn").addEventListener("click", () => {
  const teamA = document.getElementById("teamA").value || "Team A";
  const teamB = document.getElementById("teamB").value || "Team B";
  setLimit = parseInt(document.getElementById("setType").value);

  document.getElementById("playerSection").classList.remove("hidden");
  document.getElementById("players").innerHTML = "";

  // Always 6 player slots
  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    div.className = "playerSlot";
    div.innerHTML = `
      <label>Position ${i + 1}</label><br>
      <input type="text" placeholder="Name" class="pName">
      <input type="number" placeholder="Jersey #" class="pNum" min="0">
    `;
    document.getElementById("players").appendChild(div);
  }

  document.getElementById("startBtn").disabled = true;
});

document.getElementById("savePlayersBtn").addEventListener("click", () => {
  players = [];
  document.querySelectorAll("#players div").forEach(div => {
    const name = div.querySelector(".pName").value || "Player";
    const num = div.querySelector(".pNum").value || "?";
    players.push({ name, num });
  });

  rotation = [...players];
  displayRotation();

  document.getElementById("playerSection").classList.add("hidden");
  document.getElementById("gameSection").classList.remove("hidden");

  document.getElementById("teamAName").innerText = document.getElementById("teamA").value || "Team A";
  document.getElementById("teamBName").innerText = document.getElementById("teamB").value || "Team B";
  document.getElementById("setInfo").innerText = `Playing to ${setLimit} points`;
});

function displayRotation() {
  const grid = document.getElementById("rotationGrid");
  grid.innerHTML = "";
  rotation.forEach((p, index) => {
    const box = document.createElement("div");
    box.className = "playerBox";
    box.innerHTML = `<strong>${p.name}</strong><br>Jersey #${p.num}<br>(Pos ${index + 1})`;
    grid.appendChild(box);
  });
}

function rotateClockwise() {
  rotation.unshift(rotation.pop());
  displayRotation();
}

function addPoint(team) {
  if (team === "A") {
    scoreA++;
    rotateClockwise(); // Auto rotate Team A on scoring
  } else {
    scoreB++;
  }

  document.getElementById("scoreA").innerText = scoreA;
  document.getElementById("scoreB").innerText = scoreB;

  if (scoreA >= setLimit || scoreB >= setLimit) endGame();
}

function endGame() {
  document.getElementById("gameSection").classList.add("hidden");
  document.getElementById("pointsTable").classList.remove("hidden");

  const table = document.getElementById("tableBody");
  table.innerHTML = `
    <tr><td>${document.getElementById("teamA").value || "Team A"}</td><td>${scoreA}</td></tr>
    <tr><td>${document.getElementById("teamB").value || "Team B"}</td><td>${scoreB}</td></tr>
  `;

  document.getElementById("result").innerText =
    (scoreA > scoreB ? "🏆 Team A Wins!" : "🏆 Team B Wins!");
}

function resetGame() {
  location.reload();
}

// Replace Player Logic
document.getElementById("replaceBtn").addEventListener("click", () => {
  const pos = parseInt(prompt("Enter position number (1-6) to replace:"));
  if (pos < 1 || pos > 6) return alert("Invalid position number (1-6 only)");

  const newName = prompt("Enter new player name:");
  const newNum = prompt("Enter new jersey number:");

  if (newName && newNum) {
    rotation[pos - 1] = { name: newName, num: newNum };
    displayRotation();
  }
});
  
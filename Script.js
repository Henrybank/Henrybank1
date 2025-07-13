// Esimerkkikäyttäjät
let users = {
  "011100": { pin: "143", balance: 99999999 },
  "5678": { pin: "2222", balance: 5 }
};

// Tallennetaan localStorageen jos ei vielä ole
if (!localStorage.getItem("henrybank")) {
  localStorage.setItem("henrybank", JSON.stringify(users));
} else {
  users = JSON.parse(localStorage.getItem("henrybank"));
}

let currentUser = null;

function login() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;

  if (users[username] && users[username].pin === pin) {
    currentUser = username;
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("bank-screen").classList.remove("hidden");
    document.getElementById("user-id").textContent = username;
    updateBalance();
  } else {
    alert("Väärä tunnus tai PIN.");
  }
}

function updateBalance() {
  document.getElementById("balance").textContent = users[currentUser].balance;
}

function sendMoney() {
  const amount = parseFloat(document.getElementById("amount").value);
  const receiver = document.getElementById("receiver").value;

  if (!users[receiver]) {
    alert("Vastaanottajaa ei löydy!");
    return;
  }

  if (amount <= 0 || amount > users[currentUser].balance) {
    alert("Virheellinen summa!");
    return;
  }

  users[currentUser].balance -= amount;
  users[receiver].balance += amount;
  updateBalance();
  saveUsers();
  alert(`Lähetetty ${amount} € käyttäjälle ${receiver}`);
}

function logout() {
  currentUser = null;
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("bank-screen").classList.add("hidden");
}

function saveUsers() {
  localStorage.setItem("henrybank", JSON.stringify(users));
}

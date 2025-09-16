const PASSWORD = "Ditzyy";

function login() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
    showUserIP();
  } else {
    document.getElementById("login-error").innerText = "Wrong password!";
  }
}

// Ambil IP user setelah login
async function showUserIP() {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    document.getElementById("user-ip").innerText = `Your IP: ${data.ip}`;
  } catch (err) {
    document.getElementById("user-ip").innerText = "Unable to fetch IP.";
  }
}

// Handle form deploy
document.getElementById("deployForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const projectName = document.getElementById("projectName").value;
  const file = document.getElementById("fileUpload").files[0];

  if (!file) {
    alert("Please upload a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("projectName", projectName);
  formData.append("file", file);

  const res = await fetch("/api/deploy", {
    method: "POST",
    body: formData,
  });

  const result = await res.json();
  document.getElementById("result").innerText = JSON.stringify(result, null, 2);
});

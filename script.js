const PASSWORD = "12345"; 

function checkPassword() {
  const entered = document.getElementById("password").value;

  if (entered === PASSWORD) {
    sessionStorage.setItem("auth", "true");
    showApp();
  } else {
    alert("Wrong password");
  }
}

function showApp() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// ✅ ONE onload only
window.onload = function () {

  // Check login
  if (sessionStorage.getItem("auth") === "true") {
    showApp();
  }

  // Load journal
  document.getElementById("journal").value =
    localStorage.getItem("journal") || "";

  // Load tasks
  showTasks();
};

function saveJournal() {
  let text = document.getElementById("journal").value;
  localStorage.setItem("journal", text);
  alert("Journal saved!");
}

function addTask() {
  let task = document.getElementById("taskInput").value;
  if (task === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("taskInput").value = "";
  showTasks();
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    let li = document.createElement("li");
    li.innerText = t;
    list.appendChild(li);
  });
}

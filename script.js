const PASSWORD = "12345"; 

function checkPassword() {
  const entered = document.getElementById("password").value;

  if (entered === PASSWORD) {
    sessionStorage.setItem("auth", "true");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    alert("Wrong password");
  }
}

window.onload = function () {
  if (sessionStorage.getItem("auth") === "true") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
  }

  document.getElementById("journal").value =
    localStorage.getItem("journal") || "";

  showTasks();
};

window.onload = function () {
  document.getElementById("journal").value =
    localStorage.getItem("journal") || "";

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

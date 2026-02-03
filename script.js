// Load saved data when page opens
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

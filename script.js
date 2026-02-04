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
  showJournalList();


  const today = new Date().toISOString().split("T")[0];
document.getElementById("journalDate").value = today;
loadJournal();

document.getElementById("journalDate").addEventListener("change", loadJournal);

};

function getJournals() {
  return JSON.parse(localStorage.getItem("journals")) || {};
}

function saveJournal() {
  const date = document.getElementById("journalDate").value;
  const text = document.getElementById("journal").value;

  if (!date) {
    alert("Please select a date");
    return;
  }

  let journals = getJournals();
  journals[date] = text;

  localStorage.setItem("journals", JSON.stringify(journals));
alert("Journal saved for " + date);
showJournalList();

}

function loadJournal() {
  const date = document.getElementById("journalDate").value;
  let journals = getJournals();

  document.getElementById("journal").value = journals[date] || "";
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

function showJournalList() {
  const journals = getJournals();
  const list = document.getElementById("journalList");
  list.innerHTML = "";

  Object.keys(journals)
    .sort()
    .reverse()
    .forEach(date => {
      const li = document.createElement("li");
      li.innerText = date;
      li.style.cursor = "pointer";

      li.onclick = function () {
        document.getElementById("journalDate").value = date;
        loadJournal();
      };

      list.appendChild(li);
    });
}

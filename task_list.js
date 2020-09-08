"use strict";
var $ = function (id) {
  return document.getElementById(id);
};
//initialize the arrays
var tasks = [];
var sortDirection = "ASC";

// Show array within textarea, first fetching state
var displayTaskList = function () {
  //creates empty list if no locallly stored tasks are available to it
  var list = "";
  //Application State Conditionals
  // if there are no tasks in tasks array, check storage
  if (tasks.length === 0) {
    // get tasks from storage or empty string if nothing in storage
    var storage = localStorage.getItem("tasks") || "";

    // if not empty, convert to array and store in global tasks variable
    if (storage.length > 0) {
      tasks = storage.split("|");
    }
  }

  // if there are tasks in array, sort and create tasks string
  if (tasks.length > 0) {
    //tasks.sort();
    if (sortDirection === "ASC") {
      tasks.sort();
    } else {
      tasks.reverse();
    }
    list = tasks.join("\n");
  }
  // display tasks string and set focus on task text box
  $("task_list").value = list;
  $("task").focus();

  // display name if there is one in session storage
  var name = sessionStorage.name || "";
  $("name").firstChild.nodeValue = name.length === 0 ? "" : name + "'s ";
};

var addToTaskList = function () {
  var task = $("task");
  if (task.value === "") {
    alert("Please enter a task.");
  } else {
    // add task to array and local storage
    tasks.push(task.value);
    localStorage.tasks = tasks.join("|");

    // clear task text box and re-display tasks
    task.value = "";
    displayTaskList();
  }
};

var clearTaskList = function () {
  tasks.length = 0;
  localStorage.setItem("tasks", "");
  $("task_list").value = "";
  $("task").focus();
};

var deleteTask = function () {
  var index = parseInt(
    prompt(
      "Enter the index number of the task to delete. It starts at 0, so to delete the first task type 0"
    )
  );
  if (!isNaN(index)) {
    tasks.splice(index, 1);
    localStorage.tasks = tasks.join("|");
    displayTaskList();
  }
};

var toggleSort = function () {
  sortDirection = sortDirection === "ASC" ? "DESC" : "ASC";
  displayTaskList();
};
// Optional User Name Input
var setName = function () {
  var name = prompt("Enter your name");
  sessionStorage.setItem("name", name);
  displayTaskList();
};

//Extra Steps

var importantTasks = function (element) {
  var lower = element.toLowerCase();
  var index = lower.indexOf("important!");
  return index > -1;
};

var filterTasks = function () {
  var filtered = tasks.filter(importantTasks);
  $("task_list").value = filtered.join("\n");
};

//bind the of the events to the dollar sign and enable the script within the application
window.onload = function () {
  $("add_task").onclick = addToTaskList;
  $("clear_tasks").onclick = clearTaskList;
  $("delete_task").onclick = deleteTask;
  $("toggle_sort").onclick = toggleSort;
  $("set_name").onclick = setName;
  $("filter_tasks").onclick = filterTasks;
  displayTaskList();
};

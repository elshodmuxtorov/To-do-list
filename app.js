const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Please enter a todo!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = inputBox.value;

    const span = document.createElement("span");
    span.textContent = "❌";
    span.style.cursor = "pointer";
    li.appendChild(span);

    // Add click event listeners
    li.addEventListener("click", toggleChecked);
    span.addEventListener("click", removeTask);

    listContainer.appendChild(li);

    // Clear the input box and save the updated list
    inputBox.value = '';
    saveData();
}

function toggleChecked(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    }
}

function removeTask(event) {
    event.stopPropagation(); // Prevent toggling "checked" on parent click
    const li = event.target.parentElement;
    li.remove();
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;

        // Reattach event listeners to loaded elements
        listContainer.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", toggleChecked);
            li.querySelector("span").addEventListener("click", removeTask);
        });
    }
}

// Initial loading of tasks
showTask();
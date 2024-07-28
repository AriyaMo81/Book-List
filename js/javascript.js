document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.querySelector("#add-book input");
  const link = document.querySelector(".button");
  const ul = document.querySelector("ul");
  const spanDelete = `<span class="delete">حذف</span>`;
  const checkBox = document.querySelector("#hide input");
  const inputSearch = document.querySelector("#search-books input");

  loadTasksFromLocalStorage();

  inputSearch.addEventListener("keyup", function (e) {
    for (let book of ul.children) {
      if (
        book.firstElementChild.textContent.indexOf(inputSearch.value) !== -1
      ) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    }
  });

  link.addEventListener("click", function (e) {
    const spanName = document.createElement("span");
    spanName.className = "name";
    spanName.textContent = inputText.value;
    const li = document.createElement("li");
    li.appendChild(spanName);
    li.innerHTML += spanDelete;
    ul.appendChild(li);
    storeToLocalStorage(inputText.value);
    inputText.value = "";
    e.preventDefault();
  });

  ul.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const li = e.target.parentElement;
      removeFromLocalStorage(li.firstChild.textContent);
      ul.removeChild(li);
    }
  });

  checkBox.addEventListener("change", function (e) {
    if (checkBox.checked) {
      ul.style.display = "none";
    } else {
      ul.style.display = "block";
    }
  });

  function storeToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem("tasks") !== null) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.forEach(function (task) {
        const spanName = document.createElement("span");
        spanName.className = "name";
        spanName.textContent = task;
        const li = document.createElement("li");
        li.appendChild(spanName);
        li.innerHTML += spanDelete;
        ul.appendChild(li);
      });
    }
  }

  function removeFromLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") !== null) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks = tasks.filter(function (t) {
        return t !== task;
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});

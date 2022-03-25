const form = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector("#itemList");
const filters = document.querySelectorAll(".nav-item");
const addbtn = document.querySelector(".addbutton");

let newvar = [];

const getItemsFilter = function (type) {
    let filterItems = [];

    switch (type) {
        case "todo":
            filterItems = newvar.filter((item) => item.completed === false);
            break;
        case "done":
            filterItems = newvar.filter((item) => item.completed);
            break;
        default:
            filterItems = newvar;
    }
    getList2(filterItems);
};

const updateItem = async function (itemIndex, newValue) {
    const newItem = newvar[itemIndex];
    newItem.task = newValue;
    newvar.splice(itemIndex, 1, newItem);

    fetch(`http://localhost:3000/updateTask`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: newValue,
            completed: newItem.completed,
            id: newItem.id
        })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status == "success") {
                iziToast.success({
                    title: 'Task',
                    message: data.message,
                    position: 'topRight',
                });
            } else {
                iziToast.error({
                    title: 'Error',
                    message: data.message,
                    position: 'topRight',
                });
            }
            getList(newvar);
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: "something went wrong",
                position: 'topRight',
            });
        });
};

const removeData = async function (itemData) {
    console.log(itemData.id)
    await fetch('http://localhost:3000/deleteTask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: itemData.task,
            completed: itemData.completed,
            id: itemData.id
        })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status == "success") {
                iziToast.success({
                    title: 'Task',
                    message: data.message,
                    position: 'topRight',
                });
            } else {
                iziToast.error({
                    title: 'Error',
                    message: data.message,
                    position: 'topRight',
                });
            }
            getList(newvar);
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: "something went wrong",
                position: 'topRight',
            });
        });
}

const handleItem = function (itemData) {
    const items = document.querySelectorAll(".list-group-item");
    items.forEach((item) => {
        if (item.querySelector(".title").getAttribute("data-time") == itemData.createdAt) {

            item.querySelector("[data-done]").addEventListener("click", function (e) {
                e.preventDefault();
                const itemIndex = newvar.indexOf(itemData);
                const currentItem = newvar[itemIndex];
                const currentClass = currentItem.completed ? "bi-check-circle-fill" : "bi-check-circle";
                currentItem.completed = currentItem.completed ? false : true;
                newvar.splice(itemIndex, 1, currentItem);

                fetch(`http://localhost:3000/updateTask`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        task: currentItem.task,
                        completed: currentItem.completed,
                        id: currentItem.id
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == "success") {
                            iziToast.success({
                                title: 'Task',
                                message: data.message,
                                position: 'topRight',
                            });
                        } else {
                            iziToast.error({
                                title: 'Task',
                                message: data.message,
                                position: 'topRight',
                            });
                        }
                    })
                    .catch(error => {
                        iziToast.error({
                            title: 'Error',
                            message: "something went wrong",
                            position: 'topRight',
                        });
                    });

                const iconClass = currentItem.completed ? "bi-check-circle-fill" : "bi-check-circle";
                this.firstElementChild.classList.replace(currentClass, iconClass);
                const filterType = document.querySelector("#filterType").value;
                getItemsFilter(filterType);
            });

            item.querySelector("[data-edit]").addEventListener("click", function (e) {
                e.preventDefault();
                itemInput.value = itemData.task;
                addbtn.innerHTML = "SAVE TASK";
                document.querySelector("#citem").value = newvar.indexOf(itemData);
                return newvar;
            });
            addbtn.innerHTML = "ADD TASK";

            item.querySelector("[data-delete]").addEventListener("click", function (e) {
                e.preventDefault();
                itemList.removeChild(item);
                removeData(itemData)

                document.querySelectorAll(".nav-link").forEach((nav) => {
                    nav.classList.remove("active");
                });
                filters[0].firstElementChild.classList.add("active");

                return newvar.filter((item) => item != itemData);
            });
        }
    });
};

const getList = async function () {
    itemList.innerHTML = "";
    await fetch('http://localhost:3000/fetchTask', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            newvar = data.message
            if (data.status == "success") {
                return;
            }
        })
        .catch((error) => {
            iziToast.error({
                title: 'Error',
                message: "something went wrong",
                position: 'topRight',
            });
        })

    if (newvar.length > 0) {
        newvar.forEach((item) => {
            const iconClass = item.completed ? "bi-check-circle-fill" : "bi-check-circle";
            itemList.insertAdjacentHTML(
                "beforeend",
                `<li class="list-group-item">
          <span class="title" data-time="${item.createdAt}">${item.task}</span> 
          <span class="icons">
              <a href="#" data-done><i class="bi ${iconClass} green"></i></a>
              <a href="#" data-edit><i class="fas fa-edit"></i></a>
              <a href="#" data-delete><i class="fas fa-trash-alt"></i></a>
          </span>
        </li>`
            );
            handleItem(item);
        });
    } else {
        itemList.insertAdjacentHTML(
            "beforeend",
            `<li class="list-group-item">
        No record found.
      </li>`
        );
    }
};

// Fetch call for every 5 Seconds
// window.addEventListener('load', function () {
//     var fetchInterval = 5000;
//     setInterval(getList, fetchInterval);
// });

const getList2 = function (newvar) {
    itemList.innerHTML = "";
    if (newvar.length > 0) {
        newvar.forEach((item) => {
            const iconClass = item.completed ? "bi-check-circle-fill" : "bi-check-circle";
            itemList.insertAdjacentHTML(
                "beforeend",
                `<li class="list-group-item">
          <span class="title" data-time="${item.createdAt}">${item.task}</span> 
          <span class="icons">
              <a href="#" data-done><i class="bi ${iconClass} green"></i></a>
              <a href="#" data-edit><i class="fas fa-edit"></i></a>
              <a href="#" data-delete><i class="fas fa-trash-alt"></i></a>
          </span>
        </li>`
            );
            handleItem(item);
        });
    } else {
        itemList.insertAdjacentHTML(
            "beforeend",
            `<li class="list-group-item">
        No record found.
      </li>`
        );
    }
};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
}

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = itemInput.value.trim();

        if (itemName.length === 0) {
            setError(itemInput, 'Task is required');
            setTimeout(() => {
                setError(itemInput, '')
            }, 2000)
            return;
        } else {
            const currenItemIndex = document.querySelector("#citem").value;
            if (currenItemIndex) {
                updateItem(currenItemIndex, itemName);
                document.querySelector("#citem").value = "";
            } else {
                const itemObj = {
                    task: itemName,
                    createdAt: new Date(),
                    completed: false,
                };
                fetch('http://localhost:3000/createTask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemObj),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == "success") {
                            iziToast.success({
                                title: 'Task',
                                message: data.message,
                                position: 'topRight',
                            });
                        } else {
                            iziToast.error({
                                title: 'Task',
                                message: data.message,
                                position: 'topRight',
                            });
                        }
                    })
                    .catch((error) => {
                        iziToast.error({
                            title: 'Error',
                            message: "something went wrong",
                            position: 'topRight',
                        });
                    });
                newvar.push(itemObj);
                getList(newvar);
            }
            document.querySelectorAll(".nav-link").forEach((nav) => {
                nav.classList.remove("active");
            });
            filters[0].firstElementChild.classList.add("active");
        }
        itemInput.value = "";
    });

    filters.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();
            const tabType = this.getAttribute("data-type");
            document.querySelectorAll(".nav-link").forEach((nav) => {
                nav.classList.remove("active");
            });
            this.firstElementChild.classList.add("active");
            document.querySelector("#filterType").value = tabType;
            getItemsFilter(tabType);
        });
    });
    getList(newvar);
});
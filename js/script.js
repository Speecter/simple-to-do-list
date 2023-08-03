{

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };
    
    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const removeTask = (index) => {
        const removedItemIndex = index;
        tasks = [
            ...tasks.slice(0, removedItemIndex),
            ...tasks.slice(removedItemIndex + 1),
        ];
        render();
    };

    const toggleHideShow = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask")
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
        newTaskInput.value = "";
        newTaskInput.focus();
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };
   
    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasks task__item js-taskList task__content${hideDoneTasks && task.done ? " task__content--hideShow" : ""}">
                <button class="tasks tasks__button tasks__button--done js-toggleDone">${task.done ? "✔" : ""}</button>
                <span class="task__content${task.done ? " task__content--done" : ""}">${task.content}</span>
                <button class="tasks tasks__button tasks__button--remove js-remove">🗑</button>
                </li>
            `
        };

        document.querySelector(".js-taskList").innerHTML = htmlString;

    };

    const renderButtons = () => {
        let htmlButtonString = "";

        if (tasks.length > 0) {
            htmlButtonString += `
                <span>
                <button class="tasks__button--hidden js-toggleHideDoneTasks">${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}</button>
                <button class="tasks__button--hidden tasks__button--hiddenAllDone js-setAllTasksDone"${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
                </span>
            `};

        document.querySelector(".js-hiddedButtons").innerHTML = htmlButtonString;
        bindButtonsEvent();
    };

    const bindButtonsEvent = () => {

        const toggleHideShowButton = document.querySelector(".js-toggleHideDoneTasks");
        if (toggleHideShowButton) {
            toggleHideShowButton.addEventListener("click", toggleHideShow)
        };

        const setAllTasksDoneButton = document.querySelector(".js-setAllTasksDone");
        if (setAllTasksDoneButton) {
            setAllTasksDoneButton.addEventListener("click", setAllTasksDone)
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleDoneEvents();
        bindRemoveEvents();
        bindButtonsEvent();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

};

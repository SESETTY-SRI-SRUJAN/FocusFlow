
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

const timer = document.getElementById("timer");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
let totalSeconds = 25 * 60;
let interval;


function updateTimer(){

    let minutes = Math.floor(totalSeconds / 60);

    let seconds = totalSeconds % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.innerText = `${minutes}:${seconds}`;
}

startBtn.addEventListener("click", () => {

    if(interval){
        return;
    }

    interval = setInterval(() => {

        totalSeconds--;

        updateTimer();

        if(totalSeconds <= 0){

            clearInterval(interval);

            interval = null;

            alert("Pomodoro Session Complete!");
        }

    }, 1000);

});


pauseBtn.addEventListener("click", () => {

    clearInterval(interval);

    interval = null;

});


resetBtn.addEventListener("click", () => {

    clearInterval(interval);

    interval = null;

    totalSeconds = 25 * 60;

    updateTimer();

});

updateTimer();

// GOALS SYSTEM

const goalInput = document.getElementById("goal-input");

const addGoalBtn = document.getElementById("add-goal-btn");

const goalList = document.getElementById("goal-list");


// LOAD SAVED GOALS

let goals = JSON.parse(localStorage.getItem("goals")) || [];


// RENDER GOALS

function renderGoals(){

    goalList.innerHTML = "";

    goals.forEach((goal, index) => {

        const li = document.createElement("li");

        li.classList.add("goal-item");

        li.innerHTML = `
            <span>${goal}</span>

            <button onclick="deleteGoal(${index})">
                Delete
            </button>
        `;

        goalList.appendChild(li);

    });

}


// ADD GOAL

addGoalBtn.addEventListener("click", () => {

    const goalText = goalInput.value.trim();

    if(goalText === ""){
        return;
    }

    goals.push(goalText);

    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );

    renderGoals();

    goalInput.value = "";

});


// DELETE GOAL

function deleteGoal(index){

    goals.splice(index, 1);

    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );

    renderGoals();

}


// INITIAL RENDER

renderGoals();
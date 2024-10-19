let lift = document.getElementById("lift");
let liftDoors = document.querySelectorAll(".lift-door");
let btn0 = document.getElementById("0");
let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let btn3 = document.getElementById("3");
let btn4 = document.getElementById("4");

let floorQueue = [];
let isLiftRunning = false;

function openLiftDoors() {
    lift.classList.add("open");
}

function closeLiftDoors() {
    lift.classList.remove("open");
}

function moveLift(toFloor, bottomPosition, delay) {
    closeLiftDoors();
    lift.style.transition = `bottom 0.5s ease-in-out ${delay}s`;
    lift.style.bottom = bottomPosition;
    lift.style.zIndex = "90";

    setTimeout(() => {
        openLiftDoors();
    }, 1000);

    setTimeout(() => {
        closeLiftDoors();
        isLiftRunning = false;
        processQueue();
    }, 4000);
}

function addFloorToQueue(floor, bottomPosition, btn) {
    floorQueue.push({ floor, bottomPosition, btn });
    processQueue();
}

function processQueue() {
    if (isLiftRunning || floorQueue.length === 0) {
        return;
    }

    isLiftRunning = true;
    const nextFloor = floorQueue.shift();

    nextFloor.btn.style.backgroundColor = "red";
    nextFloor.btn.disabled = true;

    moveLift(nextFloor.floor, nextFloor.bottomPosition, 0);

    setTimeout(() => {
        nextFloor.btn.style.backgroundColor = "";
        nextFloor.btn.disabled = false;
    }, 8000);
}

btn0.addEventListener("click", () => {
    addFloorToQueue("Basement", "0px", btn0);
});
btn1.addEventListener("click", () => {
    addFloorToQueue("Ground", "100px", btn1);
});
btn2.addEventListener("click", () => {
    addFloorToQueue("Floor 1", "200px", btn2);
});
btn3.addEventListener("click", () => {
    addFloorToQueue("Floor 2", "300px", btn3);
});
btn4.addEventListener("click", () => {
    addFloorToQueue("Floor 3", "400px", btn4);
});
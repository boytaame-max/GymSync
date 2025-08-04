// 'Info' button next to the Current Workout, that, if pressed, reveals a modal that gives you details about the workout.
// A way to have different 'Rest' durations.

// Overhaul the entire system
// Make it so that the button changes according to the state.
// The button needs show "Start Workout" at the start, and once pressed, it will start a timer. 
// This timer isn't for Rest, this timer is for the workout itself.
// When the user is in the 'Workout' state, the button should show "Take Rest"
// When the user presses that, Rest period will start.
// Once the timer reaches 0, the button will change Again, this time, it'll show "Next Workout"
// Repeat.
// * This will remove the confusion, plus it will show the time it takes for you to finish each workout.

// Place the arrows to skip, or go back to a workout on the sides of the "Current Workout" div.
// Bonus : make it swipeable. Swipe left to skip, swipe right to go back.

// Color code the different button states.
// Start Workout : Purple
// Click Again To End Workout / Rest : Red (maybe)

const restTime = document.querySelector(".restTime");
let checkButton = document.querySelector(".cut");
const curWorkout = document.querySelector(".curWorkout");
const curWorkoutDesc = document.querySelector(".curWorkoutDesc");
const curWorkoutDay = document.getElementById("workoutDay");
const curWorkoutReps = document.querySelector(".curWorkoutReps");
const resetButton = document.querySelector(".reset");
const skipWorkout = document.querySelector(".skipWorkout");
const workRestStatus = document.querySelector(".workRestStatus");
const backWorkout = document.querySelector(".backWorkout");
const workoutStatusTxt = document.querySelector(".workoutStatusTxt");


// MODAL WINDOW - CONFIRM RESET
const openConfirmResetWindow = document.querySelector(".openConfirmReset");
const confirmResetWindow = document.querySelector(".confirmReset");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
// END OF MODAL WINDOW - CONFIRM RESET


let lastTime = Date.now();

let skipWorkoutCheck = false;

const STATES = {
    IDLE: "idle",
    WORKOUT: "workout",
    WORKOUT_PENDING: "workoutPending",
    REST: "rest"
};

let currentState = STATES.IDLE;
// DATA

const pushDay = [
    {name: 'Bench Press', desc: 'Full range, pec focus, 1-2 RIR', amount: 3, reps: `6-10`, rest: 60},
    {name: 'Shoulder Press', desc: 'Controlled, upright back, no bounce', amount: 3, reps: `8-12`, rest: 60},
    {name: 'Chest Fly', desc: 'Hard stretch + strong squeeze, 0-1 RIR', amount: 3, reps: `12-15`, rest: 60},
    {name: 'Lateral Raise', desc: 'Slow tempo, constant tension, slight lean', amount: 3, reps: `12-15`, rest: 45},
    {name: 'Triceps Pushdown', desc: 'Elbows tight to sides, full lockout', amount: 3, reps: `10-12`, rest: 60},
    {name: 'Seated Dip Machine', desc: 'Slight forward lean, press through palms', amount: 3, reps: `12-15`, rest: 60}
]

const pullDay = [
    {name: 'Pull-Ups', desc: 'Controlled descent, full ROM', amount: 3, reps: `As Many As Possible`, rest: 70},
    {name: 'Lat Pulldown', desc: 'Pull to upper chest, strong lat contraction', amount: 3, reps: `8-12`, rest: 60},
    {name: 'Seated Cable Row', desc: 'Elbows tight, pull to waist', amount: 3, reps: `10`, rest: 60},
    {name: 'Cross-Body Lat Pull Around', desc: 'Slight rotation, low elbow path', amount: 3, reps: `12 Each Side`, rest: 45},
    {name: 'Rear Delt Fly', desc: 'Squeeze peak, slow return', amount: 3, reps: `15-20`, rest: 60},
    {name: 'Cable Curl', desc: 'Stretch at bottom, no swinging', amount: 3, reps: `10`, rest: 60},
]

const legsDay = [
    {name: 'Leg Press', desc: 'Push through heels, full ROM', amount: 3, reps: `8-12`, rest: 60},
    {name: 'Leg Curl', desc: 'Stretch fully, pause at squeeze', amount: 3, reps: `12-15`, rest: 60},
    {name: 'Leg Extension', desc: 'No lockout, control every inch', amount: 3, reps: `12`, rest: 60},
    {name: 'Calf Press', desc: 'Max squeeze at top, deep stretch', amount: 3, reps: `15-20`, rest: 45},
    {name: 'Abs', desc: 'Cable Crunches || Hanging Leg Raises || Sit-Ups', amount: 3, reps: `15-20`, rest: 30},
]

const forearms = [
    
];

// DATA

const testData = [
    {name: 'Benchpress', desc: 'description', amount: 1, reps: '8', rest: 3}, 
    {name: 'Lat pull-around', desc: 'description', amount: 1, reps: '8', rest: 3}, 
    {name: 'Cable Curl', desc: 'description', amount: 1, reps: '8', rest: 3}, 
    {name: 'Crossbody Hammer Curls', desc: 'description', amount: 1, reps: '8', rest: 3}, 
    {name: 'Pull Ups', desc: 'description', amount: 1, reps: '8', rest: 3}
]


const workoutDays = [
    pushDay,
    pullDay,
    legsDay,
    testData
]

let interval = null;


let timesButtonClicked = 0;
const selectedKey = curWorkoutDay.value;
const selectedDay = workoutDays[selectedKey];

let earlierCounter = 0;

workRestStatus.display = "none";
curWorkout.textContent = selectedDay[timesButtonClicked].name + " 1";
curWorkoutDesc.textContent = `"${selectedDay[timesButtonClicked].desc}"`;
curWorkoutReps.textContent = `${selectedDay[timesButtonClicked].amount - earlierCounter} x ${selectedDay[timesButtonClicked].reps}`;

TODO:
FIXME:
curWorkoutDay.addEventListener("change", () => {
    timesButtonClicked = 0;
    counter = 0;
    earlierCounter = 0;
    buttonClicked = false;
    currentState = STATES.IDLE;
    workoutInProgress = false;
    isWorkoutSession = true;
    resolveStopWorkout = null;
    skipWorkoutCheck = false;
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];
    curWorkout.textContent = selectedDay[timesButtonClicked].name + " 1";
    curWorkoutDesc.textContent = `"${selectedDay[timesButtonClicked].desc}"`;
    curWorkoutReps.textContent = `${selectedDay[timesButtonClicked].amount - earlierCounter} x ${selectedDay[timesButtonClicked].reps}`;
})


function updateRestTime(newTime) {
    restTime.textContent = newTime;
    curWorkoutDay.disabled = newTime > 0;
}

function updateButtonText() {
    // const currentRestTime = Math.max(0, parseInt(restTime.textContent));

    // if (currentRestTime === 0) {
    //     checkButton.textContent = "Take Rest";
    // } else {
    //     checkButton.textContent = "Rest Ongoing";
    // }

    switch (currentState) {
        case STATES.IDLE:
            checkButton.textContent = "Start Workout";
            checkButton.style.backgroundColor = "#a94beb"
            break;
        case STATES.WORKOUT_PENDING:
            checkButton.textContent = "Click Again To End Workout";
            checkButton.style.backgroundColor = "#42124d";
            break;
        case STATES.WORKOUT:
            checkButton.textContent = "Take Rest";
            break;
        case STATES.REST:
            checkButton.textContent = "Rest Ongoing";
            break;
    }
}

let resolveStopWorkout = null;

// FIX THIS ONE
function workoutT() {
    return new Promise((resolve) => {
        let temp = 1; // start at 0 seconds
        let lastTime = Date.now();
    
        if (interval) {
            clearInterval(interval);
            interval = null;
        }

        interval = setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - lastTime) / 1000; // convert ms to seconds
            lastTime = now;
    
            temp += deltaTime;
            let roundedTemp = Math.floor(temp); // Round down for clean display
            console.log(roundedTemp);
            restTime.textContent = roundedTemp;
            
            TODO:
            FIXME:
            console.log(currentState);
    
            updateButtonText();
        }, 100);

        const stopWorkout = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }

            checkButton.removeEventListener("click", stopWorkout);
            resolve();
        };
        
        checkButton.addEventListener("click", stopWorkout);

        resolveStopWorkout = stopWorkout;
    });
}
// END OF FIX THIS ONE

let isWorkoutSession = true;
//rest time changer
function restT_changer(restT) {
    return new Promise((resolve) => {
        let temp = restT;
        lastTime = Date.now();
    
        restTime.textContent = temp;
    
        interval = setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - lastTime) / 1000;
            lastTime = now
    
            temp -= deltaTime;
            let roundedTemp = Math.max(0, Math.ceil(temp));
            console.log(Math.ceil(temp));
            restTime.textContent = roundedTemp;
    
            updateButtonText();

            TODO:
            FIXME:
            console.log(currentState);
    
            if (temp <= 0) {
                temp = 0;
                clearInterval(interval)
                interval = null;
                restTime.textContent = 0;
                isWorkoutSession = true;
                updateButtonText();
                resolve();
            }
        }, 100)
    })
}

let counter = 0;

let buttonClicked = false;
let workoutInProgress = false;

async function handleWorkoutSesh() {
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];
    console.log(currentState);

    if (!buttonClicked) {
        buttonClicked = true;
        curWorkoutDay.disabled = true;
    }

    if(workoutInProgress) {
        if (currentState !== STATES.WORKOUT_PENDING) return;   
    }
    workoutInProgress = true;


    switch (currentState) {
        case STATES.IDLE:
            workoutStatusTxt.textContent = "Current Workout: ";
            workoutStatusTxt.style.fontStyle = 'normal';
            // checkButton.textContent = "Click Again To End Workout";
            currentState = STATES.WORKOUT_PENDING;
            await workoutT();
            currentState = STATES.WORKOUT;
            break;


        case STATES.WORKOUT:
            if (resolveStopWorkout) {
                resolveStopWorkout()
                resolveStopWorkout = null;
            }
            counter++;
            earlierCounter++;

            if (counter >= selectedDay[timesButtonClicked].amount) {
                timesButtonClicked++;
                counter = 0;
            }

            if (timesButtonClicked < selectedDay.length) {
                const currentExercise = selectedDay[timesButtonClicked];
                curWorkout.textContent = (currentExercise.name + " " + (counter + 1)) ?? "No Workout Selected.";
                curWorkoutDesc.textContent = `"${currentExercise.desc}"`;
                curWorkoutReps.textContent = `${currentExercise.amount - counter} x ${currentExercise.reps}`;
            } else {
                curWorkout.textContent = "Workout Complete."
                curWorkoutDesc.textContent = "No Workout Active."
                curWorkoutReps.style.display = 'none';
                curWorkoutDay.disabled = false;
                checkButton.textContent = "Workout Done!";
                currentState = STATES.IDLE;
                workoutInProgress = false;
                return;
            }

            checkButton.textContent = "Rest Ongoing";
            checkButton.style.backgroundColor = "#751818ff";
            currentState = STATES.REST;

        case STATES.REST: 
            TODO:
            FIXME:
            workoutStatusTxt.textContent = "Upcoming Workout: ";
            workoutStatusTxt.style.fontStyle = 'italic';
            await restT_changer(selectedDay[timesButtonClicked].rest);
            checkButton.textContent = "Start Workout"
            checkButton.style.backgroundColor = "#a94beb";
            currentState = STATES.IDLE;
            break;
        
        case STATES.WORKOUT_PENDING:
            checkButton.textContent = "Click To Rest";
            checkButton.style.backgroundColor = "#12474dff";
            break;
    }

    workoutInProgress = false;
}

checkButton.addEventListener("click", async function () {
    await handleWorkoutSesh();

    console.log("rest time, ", selectedDay[timesButtonClicked].rest);
    console.log("counter, ", counter);
    console.log("timesbuttonclicked, ", timesButtonClicked);
    console.log("selectedDay, ", selectedDay[timesButtonClicked].amount);
    console.log("selectedDay[index], ", selectedDay[timesButtonClicked]);
    console.log(currentState);
});



// RESET FUNCTIONALITY

function openConfirmReset() {
    confirmResetWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeConfirmReset() {
    confirmResetWindow.classList.add("hidden");
    overlay.classList.add("hidden");
}

openConfirmResetWindow.addEventListener("click", () => {
    openConfirmReset();
})

overlay.addEventListener("click", () => {
    closeConfirmReset();
})

closeModal.addEventListener("click", () => {
    closeConfirmReset();
})

// END OF RESET FUNCTIONALITY



resetButton.addEventListener("click", () => {
    // Stop any running timers
    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    // Reset state flags and logic
    timesButtonClicked = 0;
    counter = 0;
    earlierCounter = 0;
    buttonClicked = false;
    currentState = STATES.IDLE;
    workoutInProgress = false;
    isWorkoutSession = true;
    resolveStopWorkout = null;
    skipWorkoutCheck = false;

    // Reset displayed rest time
    restTime.textContent = "0";

    // Reset dropdown selection and data
    curWorkoutDay.disabled = false;
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];
    const currentExercise = selectedDay[0];

    // Reset workout display
    curWorkout.textContent = currentExercise.name + " 1";
    curWorkoutDesc.textContent = `"${currentExercise.desc}"`;
    curWorkoutReps.textContent = `${currentExercise.amount} x ${currentExercise.reps}`;
    curWorkoutReps.style.display = 'block';
    checkButton.style.backgroundColor = "#a94beb";

    // Reset button text
    checkButton.textContent = "Start Workout";

    // Remove any lingering button event listeners (safety)
    checkButton.replaceWith(checkButton.cloneNode(true));
    checkButton = document.querySelector(".cut");
    checkButton.addEventListener("click", handleWorkoutSesh);

    closeConfirmReset();
    console.clear();
});

// END OF RESET FUNCTIONALITY
function addCounter() {
    counter++;
    earlierCounter++;
}

function skipWOfunc() {
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];

    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    if (resolveStopWorkout) {
        checkButton.removeEventListener("click", resolveStopWorkout);
        resolveStopWorkout = null;
    }

    restTime.textContent = "0";
    currentState = STATES.IDLE; 
    workoutInProgress = false;
    updateButtonText();
    if (curWorkout.textContent !== "Workout Complete.") {
        addCounter();
    } else {
        checkButton.textContent = "Workout Done!";
    }

    if (counter >= selectedDay[timesButtonClicked].amount) {
        timesButtonClicked++;
        counter = 0;
    }

    if (timesButtonClicked < selectedDay.length) {
        const currentExercise = selectedDay[timesButtonClicked];
        curWorkout.textContent = currentExercise.name + " " + (counter + 1);
        curWorkoutDesc.textContent = `"${currentExercise.desc}"`;
        curWorkoutReps.textContent = `${currentExercise.amount - counter} x ${currentExercise.reps}`;
        curWorkoutReps.style.display = 'block';
        restTime.textContent = "0";
    } else {
        curWorkout.textContent = "Workout Complete.";
        curWorkoutDesc.textContent = "No Workout Active.";
        curWorkoutReps.style.display = 'none';
        curWorkoutDay.disabled = false;
        checkButton.textContent = "Workout Done!";
        checkButton.style.backgroundColor = "#a94beb";
        currentState = STATES.IDLE;
        return;
    }

    checkButton.disabled = true;
    setTimeout(() => checkButton.disabled = false, 100);
    updateButtonText();
}


function prevWOfunc() {
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];

    console.log("counter, " + counter);
    console.log("timesButtonClicked, " + timesButtonClicked);

    if (timesButtonClicked === 0 && counter === 0) return;

    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    if (resolveStopWorkout) {
        checkButton.removeEventListener("click", resolveStopWorkout);
        resolveStopWorkout = null;
    }

    restTime.textContent = "0";
    currentState = STATES.IDLE; 
    workoutInProgress = false;

    earlierCounter = Math.max(-1, earlierCounter - 1);
    counter = Math.max(-1, counter - 1);

    if (counter < 0) {
        timesButtonClicked = Math.max(-1, timesButtonClicked - 1);
        if (selectedDay[timesButtonClicked]) {
            counter = selectedDay[timesButtonClicked].amount - 1;
        } else {
            counter = 0;
        }
    }

    if (timesButtonClicked < selectedDay.length) {
        const currentExercise = selectedDay[timesButtonClicked];
        curWorkout.textContent = currentExercise.name + " " + (counter + 1);
        curWorkoutDesc.textContent = `"${currentExercise.desc}"`;
        curWorkoutReps.textContent = `${currentExercise.amount - counter} x ${currentExercise.reps}`;
        curWorkoutReps.style.display = 'block';
        restTime.textContent = "0";
    } else {
        curWorkout.textContent = "Workout Complete.";
        curWorkoutDesc.textContent = "No Workout Active.";
        curWorkoutReps.style.display = 'none';
        curWorkoutDay.disabled = false;
        checkButton.textContent = "Workout Done!";
        checkButton.style.backgroundColor = "#a94beb";
        currentState = STATES.IDLE;
        return;
    }

    checkButton.disabled = true;
    setTimeout(() => checkButton.disabled = false, 100);
    updateButtonText();
}

skipWorkout.addEventListener("click", () => {
    skipWOfunc();
})

backWorkout.addEventListener("click", () => {
    prevWOfunc();
})


document.addEventListener('DOMContentLoaded', () => {
    checkButton.textContent = "Start Workout"
    if (timesButtonClicked > 0) {
        updateButtonText();
    }
})
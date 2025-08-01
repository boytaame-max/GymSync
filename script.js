// 'Info' button next to the Current Workout, that, if pressed, reveals a modal that gives you details about the workout.
// A way to have different 'Rest' durations.

const restTime = document.querySelector(".restTime");
const checkButton = document.querySelector(".cut");
const curWorkout = document.querySelector(".curWorkout");
const curWorkoutDesc = document.querySelector(".curWorkoutDesc");
const curWorkoutDay = document.getElementById("workoutDay");
const curWorkoutReps = document.querySelector(".curWorkoutReps");
const resetButton = document.querySelector(".reset");
let lastTime = Date.now();


// DATA

const pushDay = [
    {name: 'Bench Press', desc: 'Full range, pec focus, 1-2 RIR', amount: 3, reps: `6-10`, rest: 90},
    {name: 'Shoulder Press', desc: 'Controlled, upright back, no bounce', amount: 3, reps: `8-12`, rest: 90},
    {name: 'Chest Fly', desc: 'Hard stretch + strong squeeze, 0-1 RIR', amount: 3, reps: `12-15`, rest: 60},
    {name: 'Lateral Raise', desc: 'Slow tempo, constant tension, slight lean', amount: 3, reps: `12-15`, rest: 45},
    {name: 'Triceps Pushdown', desc: 'Elbows tight to sides, full lockout', amount: 3, reps: `10-12`, rest: 60},
    {name: 'Seated Dip Machine', desc: 'Slight forward lean, press through palms', amount: 3, reps: `12-15`, rest: 60}
]

const pullDay = [
    {name: 'Pull-Ups', desc: 'Controlled descent, full ROM', amount: 3, reps: `As Many As Possible`, rest: 90},
    {name: 'Lat Pulldown', desc: 'Pull to upper chest, strong lat contraction', amount: 3, reps: `8-12`, rest: 90},
    {name: 'Seated Cable Row', desc: 'Elbows tight, pull to waist', amount: 3, reps: `10`, rest: 60},
    {name: 'Cross-Body Lat Pull Around', desc: 'Slight rotation, low elbow path', amount: 3, reps: `12 Each Side`, rest: 45},
    {name: 'Rear Delt Fly', desc: 'Squeeze peak, slow return', amount: 3, reps: `15-20`, rest: 60},
    {name: 'Cable Curl', desc: 'Stretch at bottom, no swinging', amount: 3, reps: `10`, rest: 60},
]

const legsDay = [
    {name: 'Squat', desc: 'Controlled depth, knees out', amount: 3, reps: `8`, rest: 90},
    {name: 'Leg Press', desc: 'Push through heels, full ROM', amount: 3, reps: `8-12`, rest: 90},
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

curWorkout.textContent = selectedDay[timesButtonClicked].name + " 1";
curWorkoutDesc.textContent = `"${selectedDay[timesButtonClicked].desc}"`;
curWorkoutReps.textContent = `${selectedDay[timesButtonClicked].amount - earlierCounter} x ${selectedDay[timesButtonClicked].reps}`;
curWorkoutDay.addEventListener("change", () => {
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];
    curWorkout.textContent = selectedDay[timesButtonClicked].name + " 1";
    curWorkoutDesc.textContent = `"${selectedDay[timesButtonClicked].desc}"`;
    curWorkoutReps.textContent = `${selectedDay[timesButtonClicked].amount - earlierCounter} x ${selectedDay[timesButtonClicked].reps}`;
})

///////////////////// Contingent

////////////////////////


function updateRestTime(newTime) {
    restTime.textContent = newTime;
    curWorkoutDay.disabled = newTime > 0;
}

function updateButtonText() {
    const currentRestTime = Math.max(0, parseInt(restTime.textContent));

    if (currentRestTime === 0) {
        checkButton.textContent = "Take Rest";
    } else {
        checkButton.textContent = "Rest Ongoing";
    }
}

//rest time changer
function restT_changer(restT) {
    let temp = restT;
    restTime.textContent = temp;
    lastTime = Date.now();

    interval = setInterval(() => {
        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now

        temp -= deltaTime;
        let roundedTemp = Math.max(0, Math.ceil(temp));
        console.log(Math.ceil(temp));
        restTime.textContent = roundedTemp;

        updateButtonText();

        if (temp <= 0) {
            temp = 0;
            clearInterval(interval)
            interval = null;
            restTime.textContent = 0;
            updateButtonText();
        }
    }, 100)
}

let counter = 0;

let buttonClicked = false;

//problem here
checkButton.addEventListener("click", function () {
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];
    let temp = parseInt(restTime.textContent)

    if (!buttonClicked) {
        curWorkoutDay.disabled = true;
        buttonClicked = true;
    }

    if (timesButtonClicked >= 1) {
        curWorkoutDay.disabled = true;
    }
    
    if (temp > 0) return; 
    
    if (timesButtonClicked > selectedDay.length) {
        curWorkout.textContent = "Workout Complete."
        curWorkoutDesc.textContent = "No Workout Active.";
        return;
    }
    
    counter++;
    earlierCounter++;
    restT_changer(selectedDay[timesButtonClicked].rest);
    
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
    }
    
    console.log("rest time, ", selectedDay[timesButtonClicked].rest);
    console.log("counter, ", counter);
    console.log("timesbuttonclicked, ", timesButtonClicked);
    console.log("selectedDay, ", selectedDay[timesButtonClicked].amount);
    console.log("selectedDay[index], ", selectedDay[timesButtonClicked]);
});


resetButton.addEventListener("click", () => {
    // Stop any ongoing rest timer
    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    // Reset internal variables
    timesButtonClicked = 0;
    counter = 0;
    earlierCounter = 0;
    buttonClicked = false;

    // Reset UI state
    restTime.textContent = "0";
    checkButton.textContent = "Take Rest";
    curWorkoutDay.disabled = false;

    // Reset current workout display based on selected day
    const selectedKey = curWorkoutDay.value;
    const selectedDay = workoutDays[selectedKey];

    const currentExercise = selectedDay[timesButtonClicked];
    curWorkout.textContent = currentExercise.name + " 1";
    curWorkoutDesc.textContent = `"${currentExercise.desc}"`;
    curWorkoutReps.textContent = `${currentExercise.amount} x ${currentExercise.reps}`;
    curWorkoutReps.style.display = 'block';
});


document.addEventListener('DOMContentLoaded', () => {
    checkButton.textContent = "Take Rest"
    if (timesButtonClicked > 0) {
        updateButtonText();
    }
})
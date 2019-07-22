/* eslint-disable no-plusplus */
/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
// Define a counter variable for the number of seconds and set it to zero.
let secondCount = 0;
// Define a global to store the interval when it is active.
let stopWatch;
// Store a reference to the display area in a variable
const displayPara = document.querySelector('#timeIndicator');
// Function to calculate the current hours, minutes, and seconds, and display the count
function displayCount() {
        // Calculate current hours, minutes, and seconds
        const hours = Math.floor(secondCount / 3600);
        const minutes = Math.floor((secondCount % 3600) / 60);
        const seconds = Math.floor(secondCount % 60);
        // Display a leading zero if the values are less than ten
        const displayHours = hours < 10 ? `0${hours}` : hours;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
        // Write the current stopwatch display time into the display paragraph
        displayPara.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
        // Increment the second counter by one
        secondCount++;
}
// Store references to the buttons in constants
const startBtn = document.querySelector('#start');

// variable to hold lap area
const lapSlot = document.querySelector('#lapSlot')

// function to add new lap to display
function lapRecord() {
        if (startBtn.textContent === 'Reset') {
                const newLap = document.createElement('p');
                newLap.classList.add('laps');
                newLap.textContent = displayPara.textContent;
                lapSlot.appendChild(newLap);
        }
}

const lapBtn = document.querySelector('#lap');
lapBtn.disabled = true;
// When the start button is pressed, start running displayCount() once per second using displayInterval()

startBtn.addEventListener('click', () => {
        if (startBtn.textContent === 'Start') {
                stopWatch = setInterval(displayCount, 1000);
                startBtn.textContent = 'Reset';
                lapBtn.disabled = false;
        } else if (startBtn.textContent === 'Reset') {
                startBtn.textContent = 'Start';
                lapBtn.disabled = true;
                clearInterval(stopWatch);
                secondCount = 0;
                displayCount();
                // empty all lap printOut
                while (lapSlot.firstChild) {
                        lapSlot.removeChild(lapSlot.firstChild);
                }
        }
});

lapBtn.addEventListener('click', lapRecord);

// When the reset button is pressed, set the counter back to zero, then immediately update the display
// resetBtn.addEventListener('click', () => {
//         secondCount = 0;
//         displayCount();
// });

// Run displayCount() once as soon as the page loads so the clock is displayed
displayCount();

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener("DOMContentLoaded", function () {
    const datetimePicker = flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const startButton = document.querySelector("[data-start]");
            startButton.disabled = false;

            // Check if the selected date is in the future
            const selectedDate = new Date(selectedDates[0]);
            const currentDate = new Date();

            if (selectedDate <= currentDate) {
                window.alert("Please choose a date in the future");
                startButton.disabled = true;
            }
        },
    });

    const startButton = document.querySelector("[data-start]");
    startButton.addEventListener("click", function () {
        startButton.disabled = true;
        const endDate = datetimePicker.selectedDates[0];

        // Update the countdown every second
        const countdownInterval = setInterval(function () {
            const timeRemaining = endDate - new Date();
            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                updateTimer(0);
                window.alert("Countdown complete!");
                startButton.disabled = false;
            } else {
                updateTimer(timeRemaining);
            }
        }, 1000);
    });
});

function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

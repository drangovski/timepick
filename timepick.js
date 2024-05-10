/*
* TimePick v1.0
* https://github.com/drangovski/timepick
*/

function TimePick(inputId, options) {
    var selectedHour = null;
    var selectedMinute = null;

    // Time pick options
    var defaultOptions = {
        theme: "default",
        hours: "Hours",
        minutes: "Minutes"
    };
    options = Object.assign({}, defaultOptions, options);

    // Create and position the time pick under the clicked input
    function showTimePick(inputElement) {
        // Prevent opening multiple time picks
        var existingTimePick = document.getElementById(inputElement.id + "_timepick");
        if (existingTimePick) {
            return;
        }

        // Remove any existing time picks
        var existingTimePicks = document.querySelectorAll('[id$="_timepick"]');
        existingTimePicks.forEach(function(timePick) {
            if (timePick.id !== inputElement.id + "_timepick") {
                timePick.remove();
            }
        });

        // Create a div element for the time pick
        var div = document.createElement('div');
        div.className = 'timepick ' + options.theme;
        div.setAttribute('id', inputElement.id + "_timepick");

        // Create grids for hours and minutes
        var hoursGrid = document.createElement('div');
        hoursGrid.className = 'hours';

        var minutesGrid = document.createElement('div');
        minutesGrid.className = 'minutes';

        // Create hours grid label
        var hoursLabel = document.createElement('span');
        hoursLabel.textContent = options.hours;
        hoursLabel.className = 'grid-label';
        hoursGrid.appendChild(hoursLabel);

        // Wrap hour divs in a container div
        var hoursContainer = document.createElement('div');
        hoursContainer.className = 'hours-container';
        for (var hour = 0; hour <= 23; hour++) {
            var hourItem = document.createElement('div');
            hourItem.className = 'hour';
            hourItem.textContent = hour < 10 ? '0' + hour : hour;
            hourItem.addEventListener('click', function() {
                selectedHour = this.textContent;
                updateTime(inputElement);
            });
            hoursContainer.appendChild(hourItem);
        }
        hoursGrid.appendChild(hoursContainer);

        // Creat minutes grid label
        var minutesLabel = document.createElement('span');
        minutesLabel.textContent = options.minutes;
        minutesLabel.className = 'grid-label';
        minutesGrid.appendChild(minutesLabel);

        // Wrap minute divs in a container div
        var minutesContainer = document.createElement('div');
        minutesContainer.className = 'minutes-container';
        for (var minute = 0; minute <= 55; minute += 5) {
            var minuteItem = document.createElement('div');
            minuteItem.className = 'minute';
            minuteItem.textContent = minute < 10 ? '0' + minute : minute;
            minuteItem.addEventListener('click', function() {
                selectedMinute = this.textContent;
                updateTime(inputElement);
            });
            minutesContainer.appendChild(minuteItem);
        }
        minutesGrid.appendChild(minutesContainer);

        // Append grids to the div
        div.appendChild(hoursGrid);
        div.appendChild(minutesGrid);

        // Calculate the position of the input element
        var inputRect = inputElement.getBoundingClientRect();
        var inputTop = inputRect.top + window.scrollY;
        var inputLeft = inputRect.left + window.scrollX;

        // Set the position of the div relative to the input element
        div.style.top = (inputTop + inputElement.offsetHeight + 8) + 'px';
        div.style.left = inputLeft + 'px';

        // Append the div to the body
        document.body.appendChild(div);

        // Function to close the time pick when clicking outside or pressing Esc key
        function closeTimePick(event) {
            if (!div.contains(event.target) && event.target !== inputElement) {
                removeTimePick();
            }
        }
        document.addEventListener('click', closeTimePick);

        function closeOnEsc(event) {
            if (event.key === "Escape") {
                removeTimePick();
            }
        }
        document.addEventListener('keydown', closeOnEsc);

        // Function to update the value of the input element with selected time
        function updateTime(inputElement) {
            if (selectedHour !== null && selectedMinute !== null) {
                inputElement.value = selectedHour + ':' + selectedMinute;
                removeTimePick();
            } else if (selectedHour !== null) {
                inputElement.value = selectedHour + ':00';
            } else if (selectedMinute !== null) {
                inputElement.value = '00:' + selectedMinute;
            }
        }

        // Function to remove the time pick div from the DOM
        function removeTimePick() {
            var timePickDiv = document.getElementById(inputId + "_timepick");
            if (timePickDiv) {
                timePickDiv.remove();
                // Remove event listeners
                document.removeEventListener('click', closeTimePick);
                document.removeEventListener('keydown', closeOnEsc);
            }
        }
    }

    // Get the input element by ID
    var inputElement = document.getElementById(inputId);

    // Add event listener to the input element
    inputElement.addEventListener('click', function() {
        showTimePick(this);
    });
}
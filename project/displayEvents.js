document.addEventListener('DOMContentLoaded', () => {
    const eventList = document.getElementById('events'); 
    const locationFilter = document.getElementById('filter_locations');
    let eventStore = JSON.parse(localStorage.getItem('events')) || []; // get from localstorage

    //function for creating events 
    function renderEvents(FilteredEvents = eventStore) {
        eventList.innerHTML = '';
        FilteredEvents.forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <h2 class="event_title">${event.title}</h2>
                <span class="icon_title">
                        <ion-icon name="flag-outline"></ion-icon>
                </span>
                <img src='${event.image}' class="event_image">
                <textarea class="event_description" name="textarea" id="textarea" cols="10" rows="50" readOnly = true>${event.description}</textarea>
                <p class="event_location">${event.location}</p>
                <span class="icon_location">
                        <ion-icon name="map-outline"></ion-icon>
                </span>
                <p class="event_date">${event.startDate} - ${event.endDate}</p>
                <span class="icon_date">
                        <ion-icon name="calendar-outline"></ion-icon>
                </span>
                <button onclick="removeEvent(${index})" class="btn_delete">X</button>
            `;
            //adding eventItem to the eventList (showing events in created div)
            eventList.appendChild(eventItem);
        });
    }

    //arrow function for removing event by clicking delet btn
    window.removeEvent = (index) => {
        const data = JSON.parse(localStorage.getItem('events')) || []; // taking events from local storage
        data.splice(index, 1); // deleting event from storage 
        localStorage.setItem('events', JSON.stringify(data)); // updating local storage
        renderEvents(data); // updating events
        dropdownLocationsMenu(); //updating dropdown menu of locations
    }
    // function for filtering events by its location
    function dropdownLocationsMenu() {
        const places = eventStore.map(event => event.location); //creating array of only locations that are used

        // //if there are any duplicates of location it removes them from array
        for(let i=places.length; i>=0; i--){
            for(let j=i-1; j>=0; j--){
                if(places[i] === places[j]){
                     places.splice(i,1);
                     break;
                }
            }
        }

        places.sort(); // sorting locations

        locationFilter.innerHTML = `<option value="0"> All locations </option>`;

        places.forEach(location => {
            const option = document.createElement('option');//craeting html element (dropwdown menu)
            option.value = location; //setting value
            option.textContent = location; //setting text
            locationFilter.appendChild(option); //adding location to the dropwdown "opction" menu
        });

    }

    // filtering locations
    locationFilter.addEventListener('change', () => {
        const selectedLocation = locationFilter.value; //setting value of location thath is choosen in dropdownmenu

        //if none or all is selceted show all events
        if(selectedLocation === "0"){
            renderEvents(eventStore);
        }
        else{
            // filter events by location 
            const filterEvents = eventStore.filter(event => event.location === selectedLocation); // filtering locations from localstorage  by comparing event location with choosen location for filtering
            renderEvents(filterEvents);
        }
    });

    renderEvents(); //calling function to show events
    dropdownLocationsMenu(); //calling function to show all locations that are used
});
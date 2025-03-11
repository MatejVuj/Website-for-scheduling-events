document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event_form');
    let eventStore = JSON.parse(localStorage.getItem('events')) || [];

    eventForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        // if start date or and end date dont exist alert
        if (!dateArrayChecker[0] && !dateArrayChecker[1]) {
            alert("Please select start and end date");
        } else if (!dateArrayChecker[0]) {
            alert("Please select start date");
        } else if(!dateArrayChecker[1]){
            alert("Please select end date");

        } else {
            const newEvent = {
            title: document.getElementById('event-title').value, //getting what user wrote on input title 
            description: document.getElementById('textarea').value/*.trim()*/, //getting what user wrote for description of an event
            location: document.getElementById('location').value, //getting location 
            image: document.getElementById('file').value !== "" ? document.getElementById('file').value : randomImageSelector(),//if user didnt input url of an image it chooses random picture from array
            startDate: dateArrayChecker[0], //start date
            endDate: dateArrayChecker[1] // end date
            }

            eventStore.push(newEvent); //pushing event object to the local storage
            localStorage.setItem('events', JSON.stringify(eventStore));
            eventForm.reset(); //reseting 
            window.location.href = 'events.html'; // when user clicks submit btn it instantly relocates him from index.html to the events.html
        }
    });

    //function that creates random number and return random image from array
    function randomImageSelector(){
        //array that has images from internet
        const imageArray = [
            "https://afar.brightspotcdn.com/dims4/default/5896a05/2147483647/strip/false/crop/3000x2247+0+0/resize/1486x1113!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fb2%2Ff4%2F9a1ebe3f427f8e5eb937f8df8998%2Ftravelguides-maldives-videomediastudioeurope-shutterstock.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR74iyhQrxt2GyCE_kLUMY3yICoA0RrCiWO9A&s",
            "https://www.english-heritage.org.uk/siteassets/home/visit/places-to-visit/stonehenge/history/significance/stonehenge-from-ne-800x420.jpg",
            "https://cdn.britannica.com/30/94430-050-D0FC51CD/Niagara-Falls.jpg",
            "https://www.thoughtco.com/thmb/l0Ei2qSYEp6vtU6a1o0FtphhV4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SaharaDesert-58c1a5603df78c353c3d525d.jpg",
            "https://lp-cms-production.imgix.net/2024-06/iStock-166471469.jpg?auto=format&q=72&fit=crop"
        ];

        const randomNumber = Math.floor(Math.random() * 6); // variable that creates random number from 0 to 5 

        const image = imageArray[randomNumber]; //setting image as url from imageArray

        return image; //returning url of image
        
    }

});
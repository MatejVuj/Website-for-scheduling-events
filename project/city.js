document.addEventListener('DOMContentLoaded', () => {
    const selectLocation = document.getElementById('location');

    if(!selectLocation){
        throw new Error("Location (selectLocation)");
    }

    const url = 'https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json';
    
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error("Response Location not ok");
        }
        return response.json()
    })
    .then(data=>{

        selectLocation.innerHTML = '<option value="0">Choose Location</option>';
        data.forEach(places => {
            // formating string
            const locationArray = places.city ? `${places.city}, ${places.country}` : `${places.country}`;  
            const option = document.createElement('option');
            option.value = locationArray; // setting value 
            option.textContent = locationArray; //setting display text
            selectLocation.appendChild(option);
        });

    })
    
    .catch(error =>{
        console.error('Error fetching location', error);
    });
});
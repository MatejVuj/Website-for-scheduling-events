const monthYearElement = document.getElementById('start_month_year');
const daysInMonthElement = document.getElementById('start_days_in_month');
const prev = document.querySelector('.start_date .prev_month');
const next = document.querySelector('.start_date .next_month');

const endMonthYearElement = document.getElementById('end_month_year');
const endDaysInMonthElement = document.getElementById('end_days_in_month');
const endPrev = document.querySelector('.end_date .prev_month');
const endNext = document.querySelector('.end_date .next_month');

let startDate = new Date();
let endDate = new Date();
let isStartDate = true;

const updateCalendar = (currentDate, monthYearElement, daysInMonthElement, isStartDate)=>{
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1); // first day of the month 
    const lastDay = new Date(currentYear, currentMonth + 1, 0); //last day of the previous month
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // setting monday to 0, sunday to 6
    const lastDayIndex = (firstDayIndex + totalDays) % 7; //index of last day i month

    // "writing" month and year in the header
    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    //Adding days from previous month
    for(let i= firstDayIndex; i > 0; i--){
        const prevMonthDay = new Date(currentYear, currentMonth, - i +1);
        datesHTML += `<div class="day inactive" onclick="selectDate(event, ${prevMonthDay.getDate()+1},${currentMonth-1},${currentYear},${isStartDate})">${prevMonthDay.getDate()}</div>`;
    }

    //Adding days from current month and "highlighting" day thath is today on calendar
    for(let i =1; i<=totalDays; i++){
      const day = new Date(currentYear, currentMonth, i);
      const activeClass = day.toDateString() === new Date().toDateString() ? 'active' : '';
      datesHTML += `<div class="day ${activeClass}" onclick="selectDate(event, ${i+1},${currentMonth},${currentYear},${isStartDate})">${i}</div>`;
    }

    //Adding days from next month to fill the last row
    for(let i=1; i <= 7 - lastDayIndex; i++){
        const nextMonthDay = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="day inactive" onclick="selectDate(event, ${nextMonthDay.getDate()+1},${currentMonth+1},${currentYear},${isStartDate})">${nextMonthDay.getDate()}</div>`;
    }

    daysInMonthElement.innerHTML = datesHTML;

}

// array that stores start date [0] and end date [1], used later to check if start date is > end date
const dateArrayChecker=[];

window.selectDate = (event, day, month ,year, isStartDate) => {
   const selectedDate = new Date(year, month, day);
   const dateString = selectedDate.toISOString().split('T')[0];
//    dateString = dateString[0];
   
   if(isStartDate === true){
    //Getting value of start-date
    let startDate = document.getElementById("start_days_in_month").value;
    startDate = dateString;
    dateArrayChecker[0] = startDate;
    
    //when day in calnedar is clicked 
    const prevSelected = document.querySelector('.selected_date_start');
    if(prevSelected){
        prevSelected.classList.remove('selected_date_start');
    }
    const clicked = event.target;
    clicked.classList.add('selected_date_start');
   }

   //Getting value of end-date
   else{
    let endDate = document.getElementById("end_days_in_month").value;
    endDate = dateString;
    dateArrayChecker[1] = endDate;

    //when day in calnedar is clicked 
    const prevSelected = document.querySelector('.selected_date_end');
    if(prevSelected){
        prevSelected.classList.remove('selected_date_end');
    }
    const clicked = event.target;
    clicked.classList.add('selected_date_end');
   }

   //checking if start date is bigger then end date
   if(dateArrayChecker[0] && dateArrayChecker[1] && dateArrayChecker[0] > dateArrayChecker[1]){
    //setting array elements to empty string
    dateArrayChecker[0]='';
    dateArrayChecker[1]='';

    //setting date to empty string
    document.getElementById("start_days_in_month").value='';
    document.getElementById("end_days_in_month").value='';

    //removing dates from being selected
    const prevSelectedStart = document.querySelector('.selected_date_start');
    if(prevSelectedStart){
        prevSelectedStart.classList.remove('selected_date_start');
    }
    const prevSelectedEnd = document.querySelector('.selected_date_end');
    if(prevSelectedEnd){
        prevSelectedEnd.classList.remove('selected_date_end');
    }

    alert("Start date is bigger than end date. Select dates again");

   }

}

//controling months and years when moving thru months
prev.addEventListener('click', ()=>{
    const prevMonthStart = startDate.getMonth() -1;
    startDate.setMonth(prevMonthStart);
    updateCalendar(startDate, monthYearElement, daysInMonthElement, true);
});

next.addEventListener('click', ()=>{
    const nextMonthStart = startDate.getMonth() +1;
    startDate.setMonth(nextMonthStart);
    updateCalendar(startDate, monthYearElement, daysInMonthElement, true);
});

endPrev.addEventListener('click', ()=>{
    const prevMonthEnd = endDate.getMonth() -1;
    endDate.setMonth(prevMonthEnd);
    updateCalendar(endDate, endMonthYearElement, endDaysInMonthElement, false);
});

endNext.addEventListener('click', ()=>{
    const nextMonthEnd = endDate.getMonth() +1;
    endDate.setMonth(nextMonthEnd);
    updateCalendar(endDate, endMonthYearElement, endDaysInMonthElement, false);
});

updateCalendar(startDate, monthYearElement, daysInMonthElement, true);
updateCalendar(endDate, endMonthYearElement, endDaysInMonthElement, false);
const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btn_event_popup');
const iconClose = document.querySelector('.icon_close');
const moveRight = document.querySelector('.move_right');

const btnStartDate = document.querySelector('.btn-start-date');
const btnEndDate = document.querySelector('.btn-end-date');

const changeToOtherIcon = () => {
    iconClose.innerHTML = '<ion-icon name="arrow-back-outline"></ion-icon>';
};

const changeToForwardIcon = () =>{
    iconClose.innerHTML = `<ion-icon name="arrow-forward-outline"></ion-icon>`;
}

const changeToFirstIcon = () => {
    iconClose.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
};

btnStartDate.addEventListener('click', () => {
    wrapper.classList.add('active_start_date'); // start date calendar is now active
    wrapper.classList.remove('active_end_date'); // end date calendar is no longer active
    changeToForwardIcon(); // changing icon 
});

btnEndDate.addEventListener('click', () => {
    wrapper.classList.add('active_end_date'); // end date calendar is now active
    wrapper.classList.remove('active_start_date'); // start date calendar is no longer active
    changeToOtherIcon(); 
});

iconClose.addEventListener('click', () => {
    // if icon for closing is clicked and start or end date calendar is open 
    if(wrapper.classList.contains('active_start_date') || wrapper.classList.contains('active_end_date')) {
        wrapper.classList.remove('active_start_date', 'active_end_date');        
        changeToFirstIcon();
    }
    // if icon for closing wrapper is clicked and form is active
    else{
        wrapper.classList.remove('active_popup');
        changeToFirstIcon();
    }
});

// by clicking on schedule event wrapper can be shown or removed
btnPopup.addEventListener('click', () => {
    wrapper.classList.toggle('active_popup');
});
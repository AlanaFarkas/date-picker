
export const isThisALeapYear = (year) => {
    let leapYear = year % 4 === 0 && year % 100 !== 0 ? true : false;
    return leapYear
}

export const whatDateDoesTheMonthStartOn = (year, monthDigit) => {
    let firstOfMonth = new Date(year, monthDigit);
    const firstDayOfMonthAsInt = firstOfMonth.getDay();
    return firstDayOfMonthAsInt;
}


export const createDateObjectFromSelectedDate = (year, monthDigit, date) => {
    let selectedDate = new Date(year, monthDigit, date);
    return selectedDate
}

export const createWeeks = (daysInThisMonth, dayItStartsOn) => {
    let thisMonth = [];
    let thisWeek = [];
    
    for(let i = 0; i < dayItStartsOn; i++) {
        thisWeek.push(null);
    }

    for(let j = 1; j <= daysInThisMonth; j++){
        thisWeek.push(j);
        if(thisWeek.length === 7) {
            thisMonth.push(thisWeek);
            thisWeek = [];
        }
    }
    
    if (thisWeek.length > 0){
        thisMonth.push(thisWeek);
    }

    return thisMonth;

}
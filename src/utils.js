
export const isThisALeapYear = (year) => {
    const leapYear = year % 4 === 0 && year % 100 !== 0 ? true : false;
    return leapYear;
}

export const addLeapDay = (year, monthDigit) => {
    const addLeapDay = isThisALeapYear(year) && monthDigit === 1 ? true : false;
    return addLeapDay;
}

export const whatDateDoesTheMonthStartOn = (year, monthDigit) => {
    const firstOfMonth = new Date(year, monthDigit);
    const firstDayOfMonthAsInt = firstOfMonth.getDay();
    return firstDayOfMonthAsInt;
}

export const createDateObjectFromSelectedDate = (year, monthDigit, date) => {
    const selectedDate = new Date(year, monthDigit, date);
    return selectedDate
}

export const createWeeks = (daysInThisMonth, dayItStartsOn, year, monthDigit) => {
    let thisMonth = [];
    let thisWeek = [];

    daysInThisMonth = addLeapDay(year, monthDigit) ? daysInThisMonth +=1 : daysInThisMonth; 
    
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
        let x = thisWeek.length;
        while (x < 7) {
            thisWeek.push(null);
            x++;
        }
        thisMonth.push(thisWeek);
    }

    return thisMonth;
}

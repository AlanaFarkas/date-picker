// export function whatDateDoesTheMonthStartOn(theDate){
//     // set firstOfMonth to given DATE OBJECT
//     let firstOfMonth = theDate;

//     // set firstOfMonth (aka theDate) to be the actual first day of the given month
//     firstOfMonth = firstOfMonth.setDate(1);

//     // set firstDayOfMonthAsInt to the day of the week the first of the month fell on; ex: Friday = 5
//     const firstDayOfMonthAsInt = (new Date(firstOfMonth)).getDay();

//     // return number; ex: 5 for Friday
//     return firstDayOfMonthAsInt;
// }

export function whatDateDoesTheMonthStartOn(year, monthDigit){
    let firstOfMonth = new Date(year, monthDigit);
    const firstDayOfMonthAsInt = firstOfMonth.getDay();
    return firstDayOfMonthAsInt;
}

export function createWeeks(daysInThisMonth, dayItStartsOn){
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
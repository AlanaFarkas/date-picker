export function whatDateDoesTheMonthStartOn(theDate){
    let firstOfMonth = theDate;
    firstOfMonth = firstOfMonth.setDate(1);
    const firstOfMonthAsInt = (new Date(firstOfMonth)).getDay();
    return firstOfMonthAsInt;
}

export function createWeeks(numberOfDaysInThisMonth, dayItStartsOn){
    let completeMonth = [];
    let thisWeek = [];

    for(let i = 0; i < dayItStartsOn; i++) {
        thisWeek.push(null);
    }

    for(let j = 1; j <= numberOfDaysInThisMonth; j++){
        thisWeek.push(j);
        if(thisWeek.length === 7) {
            completeMonth.push(thisWeek);
            thisWeek = [];
        }
    }
    
    if (thisWeek.length > 0){
        completeMonth.push(thisWeek);
    }

    return completeMonth;

}
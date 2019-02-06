export function whatDateDoesTheMonthStartOn(theDate){
    let firstOfMonth = theDate;
    firstOfMonth = firstOfMonth.setDate(1);
    const firstOfMonthAsInt = (new Date(firstOfMonth)).getDay();
    return firstOfMonthAsInt;
}

export function chunkIt(numberOfDaysInThisMonth, dayItStartsOn){
    let wholeMonth = [];
    let thisWeek = [];

    for(let i = 0; i < dayItStartsOn; i++) {
        thisWeek.push(null);
    }

    for(let j = 1; j <= numberOfDaysInThisMonth; j++){
        thisWeek.push(j);
        if(thisWeek.length === 7) {
            wholeMonth.push(thisWeek);
            thisWeek = [];
        }
    }
    
    if (thisWeek.length > 0){
        wholeMonth.push(thisWeek);
    }

    return wholeMonth;

}
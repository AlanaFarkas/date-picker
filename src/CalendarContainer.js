import React from 'react';
import styled from 'styled-components';

const CalendarContainer = ({month, days, handleNext, handlePrev}) => {

    return (
    <Calendar>
        <MonthContainer>
            <button onClick={handlePrev}>Prev</button>
            <Month>{month}</Month>
            <button onClick={handleNext}>Next</button>
        </MonthContainer>
        <DaysContainer>
            <p>{days}</p>
        </DaysContainer>
    </Calendar>
    )
}

export default CalendarContainer;

const Calendar = styled.div`
    border: 1px red solid;
`;

const MonthContainer = styled.div`
`;

const Month = styled.h2`
`;

const DaysContainer = styled.div`
`;
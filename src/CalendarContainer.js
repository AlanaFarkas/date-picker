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
            {days}
        </DaysContainer>
    </Calendar>
    )
}

export default CalendarContainer;

const Calendar = styled.div`
    border: 1px red solid;
    padding: 20px;
`;

const MonthContainer = styled.div`
    margin-bottom: 20px;
`;

const Month = styled.h2`
    display: inline;
    margin: 0 20px;
`;

const DaysContainer = styled.div`
    display: flex;
    p {
        margin: 0 20px;
    }
`;
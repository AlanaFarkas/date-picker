import React from 'react';
import styled from 'styled-components';

const CalendarContainer = ({year, month, days, handleNext, handlePrev}) => {

    return (
    <Calendar>
        <MonthContainer>
            <button onClick={handlePrev}>Prev</button>
            <Month>{month} {year}</Month>
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
    width: 600px;
    padding: 20px;
    margin: auto;
`;

const MonthContainer = styled.div`
    margin-bottom: 20px;
`;

const Month = styled.h2`
    display: inline;
    margin: 0 20px;
`;

const DaysContainer = styled.div`
    p {
        margin: 0 10px;
    }
`;
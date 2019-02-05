import React from 'react';
import styled from 'styled-components';

const CalendarContainer = ({year, month, days, dates, handleNext, handlePrev}) => {

    return (
    <Calendar>
        <MonthContainer>
            <PrevButton onClick={handlePrev}>Prev</PrevButton>
            <Month>{month} {year}</Month>
            <NextButton onClick={handleNext}>Next</NextButton>
        </MonthContainer>
        <DaysContainer>
            {days}
        </DaysContainer>
        <DatesContainer>
            {dates}
        </DatesContainer>
    </Calendar>
    )
}

export default CalendarContainer;

const Calendar = styled.div`
    border: 1px red solid;
    border-radius: 5px;
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

const PrevButton = styled.button`
    float: left;
`;

const NextButton = styled.button`
    float: right;
`;

const DaysContainer = styled.div`
    border: 1px dotted blue;
    div {
        margin: 0 10px;
        display: inline-block;
    }
    `;
    
const DatesContainer = styled.div`
div {
    border: 1px dotted green;
    width: 50px;
}
`;
// display: flex;
// flex-flow: row wrap;

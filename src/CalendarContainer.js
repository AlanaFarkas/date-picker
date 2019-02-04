import React from 'react';
import styled from 'styled-components';

const CalendarContainer = ({year, month, days, handleNext, handlePrev}) => {

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

const DaysContainer = styled.div`
    p {
        margin: 0 10px;
        display: inline-block;
    }
`;

const PrevButton = styled.button`
    float: left;
`;

const NextButton = styled.button`
    float: right;
`;
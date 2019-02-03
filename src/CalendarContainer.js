import React from 'react';
import { ALL_MONTHS, ALL_DAYS, TODAY } from './constants';
import styled from 'styled-components';

const CalendarContainer = (props) => {

    let month = TODAY.getMonth();
    let monthString = ALL_MONTHS[month];
    
    const dayStrings = ALL_DAYS.map((day, i) => {
        return <td key={i}>{day}</td>
    });


    return (
    <CalendarTable>
        <tr>
            <th>{monthString}</th>
        </tr>
        <tbody>
            <tr>
                {dayStrings}
            </tr>
            <tr>
                {/* <td>Eve</td>
                <td>Jackson</td> 
                <td>94</td> */}
            </tr>
        </tbody>
    </CalendarTable>
    )
}

export default CalendarContainer;

const CalendarTable = styled.table`
    width: 100%;
    border: 1px black solid;
    th {
        font-size: 25px;
    }
`;
import React from 'react';
import { ALL_MONTHS, ALL_DAYS, TODAY } from './constants';

const CalendarContainer = (props) => {
    let monthString = ALL_MONTHS[TODAY.getMonth()];
    const dayStrings = ALL_DAYS.map((day, i) => {
        return <td key={i}>{day}</td>
    })
    return (
    <table>
        <tbody>
            <tr>
                <th>{monthString}</th>
            </tr>
            <tr>
                {dayStrings}
            </tr>
            <tr>
                <td>Eve</td>
                <td>Jackson</td> 
                <td>94</td>
            </tr>
        </tbody>
    </table>
    )
}

export default CalendarContainer;
import React, { Component, useState, useEffect } from 'react';
import { getEvents } from './apiCalls';
import Schedule from './Schedule';
import DatePicker from "react-datepicker";
import moment from 'moment';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import { Chip } from '@mui/material';

function Admin() {

    const [events, setEvents] = useState(["test"]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {

        // console.log(date.toUTCString());
        let body = {date}

        const fetchEvents = async() => {
            // using get for all events
            // const response = await fetch('/all-events');

            // using POST for request by date
            const response = await fetch('/date', {
                method: "POST", 
                body: JSON.stringify(body),
                headers: {
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            })
            console.log(`POST request body: ${JSON.stringify(body)}`);
            const data = await response.json();
            console.log(data);
            setEvents(data);
        };
        fetchEvents();

    }, [date]);
    
    return(
        <div className="events-container">
            <h1>Admin</h1>
            <input type="date" id="dateSelect" name="date" onChange={(event)=>setDate(event.target.value)}/>
            {events.map((event) => {
                return(
        
                    // <a href="/eventDetailsAdmin">
                    //     <button>{event.ID}</button>
                    // </a>
                    <Link 
                        to={{
                            pathname: '/eventDetailsAdmin', 
                            state: { eventID : "1" }
                        }}>
                        
                        <button>{event.ID}</button></Link>
                )
            })}
        </div>
    );
}

export default Admin;
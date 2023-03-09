import React, { useEffect, useState } from 'react';
import "./MyComponent.css"

//eslint-disable-next-line
export default function (props) {
    const [data, setData] = useState({ time: 0 });
    const [currentTime, setCurrentTime] = useState(Date.now());

    async function fetchData() {
        // const response = await fetch('http://localhost:3000/answer.json');
        const response = await fetch('./answer.json');
        const jsonData = await response.json();
        setData(jsonData);
    }

    function createTimeAgoString(now, time) {
        const diff = now - time;
        const minutes = Math.floor(diff / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days} days`;
        } else if (hours > 0) {
            return `${hours} hours`;
        } else if (minutes > 0) {
            return `${minutes} minutes`;
        } else {
            return `less than a minute`;
        }
    }

    useEffect(() => {
        fetchData();
        const currentTimeInterval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        // call setCurrentTime every second
        const fetchInterval = setInterval(() => {
            fetchData();
        }, 10 * 60 * 1000); // call fetchData every 10 minutes
        return () => {
            clearInterval(fetchInterval);
            clearInterval(currentTimeInterval);
        }; // clean up interval on component unmount
    }, []);

    return (
        <div>
            <h1>{data.question}</h1>
            <h2>{data.answer ? "Yes." : "No."}</h2>
            <h3>Last checked {createTimeAgoString(currentTime, data.time)} ago</h3>
        </div>
    );
}
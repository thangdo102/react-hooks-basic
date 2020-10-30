import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {
};

function formatDate(date) {
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
}

function Clock() {

    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        setInterval(() => {     //Hàm setInterval là hàm sau mỗi 1000(1s) thì nó sẽ thực hiện việc gì đó bên trong
            const now = new Date();
            const newTimeString = formatDate(now);  //hh:mm:ss
            setTimeString(newTimeString);
        }, 1000)

    }, [])

    return (
        <div>
            <p style={{ fontSize: '42px' }}>{timeString}</p>
        </div>
    );
}

export default Clock;
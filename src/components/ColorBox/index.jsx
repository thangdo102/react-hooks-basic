import React, { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {
};

const getRandomColor = () => {
    const COLOR_LIST = ['blue', 'yellow', 'green', 'black'];
    const randomColor = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomColor];
}

function ColorBox() {
    const initColor = localStorage.getItem('box_color' || 'deeppink');
    const [color, setColor] = useState(initColor);

    const onChangeColor = () => {
        const newColor = getRandomColor();
        setColor(newColor);
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div className="color-box" style={{ backgroundColor: color }} onClick={onChangeColor}> </div>
    );
}

export default ColorBox;
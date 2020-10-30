import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    obSubmit: PropTypes.func,
};

TodoForm.defaultProp = {
    obSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;  //khai báo biến onSubmit để hứng props từ thằng cha truyền sang

    //khai báo 1 state để lưu giá trị hiện tại của value nhập vào input
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();  //khi bấm enter thì sẽ bị reload lại trang, hàm này sẽ ko cho reload khi bấm enter
        if (!onSubmit) return;  //nếu không có gì truyền thì return luôn 


        //khai báo 1 mảng các giá trị trong input, ở đây chỉ có 1 input nhưng vẫn sẽ truyền cả mảng, vì sau này sẽ truyền 1 lúc nhiều input lên
        const formValues = {
            title: value,  //giả sử input là title
        };
        onSubmit(formValues);

        //sau khi submit thì sẽ set lại form
        setValue('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleValueChange} />
        </form>
    );
}

export default TodoForm;


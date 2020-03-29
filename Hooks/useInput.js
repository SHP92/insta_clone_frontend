import React, { useState } from 'react';

export default function useInput(initialValue){
    const [value, setValue] = useState(initialValue);
    const onChange = (newValue) => {
        setValue(newValue);
    };
    return { value, onChange, setValue }
}
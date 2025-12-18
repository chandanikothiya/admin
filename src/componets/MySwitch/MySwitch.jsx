import React from 'react';
import Switch from '@mui/material/Switch';
import { useField } from 'formik';

function MySwitch({ label, ...props }) {

    const [field, meta] = useField(props);

    return (
        <>
            <Switch
                {...field}
                {...label}
                 />
                {
                    meta.error && meta.touched ? <p style={{color:'red'}}>{meta.error}</p> : ""
                }
        </>
    );
}

export default MySwitch;
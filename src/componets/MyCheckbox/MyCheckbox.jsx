import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { useField } from 'formik';

function MyCheckbox({ data = [], ...props }) {

    const [field, meta,helpers] = useField(props);
    console.log(props);

    return (
        <>
            <FormGroup>
                <FormLabel component="legend">{props.label}</FormLabel>
                {
                    data.map((v) => (
                        <FormControlLabel control={<Checkbox />} label={v.label} 
                      
                        />
                    ))
                }
                {
                    meta.error && meta.touched ? <p style={{ color: 'red' }}>{meta.error}</p> : ""
                }
            </FormGroup>
        </>
    );
}

export default MyCheckbox;
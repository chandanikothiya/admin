import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { useField } from 'formik';

function MySwitch({ label, display, ...props }) {

    const [field, meta] = useField(props);
    console.log(field,meta);

    return ( 
        <>
            <FormControl  style={{display:'block',marginTop:'20px'}} error={meta.error && meta.touched } 
            component="fieldset" variant="standard">
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        {...field}
                        control={
                            <Switch checked={field.value} />
                        }
                        label={display}
                    />
                </FormGroup>
                {
                    meta.error && meta.touched ?
                        <FormHelperText style={{ color: 'red' }}>{meta.error}</FormHelperText> : ""
                }
            </FormControl>
        </>
    );
}

export default MySwitch;
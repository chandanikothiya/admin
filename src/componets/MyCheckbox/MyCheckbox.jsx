import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useField } from 'formik';

function MyCheckbox({ data, label, ...props }) {

    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    console.log(field, field.value, props);

    function handleChange(val) {
        console.log(val, field.value);

        if (field.value.includes(val)) {
            const x = field.value.filter((v) => v !== val)
            console.log(x);
            setValue(x)

        } else {
            setValue([...field.value, val]);
        }
    }

    return (
        <>
            <FormControl
                style={{ display: 'block',margin:'0',marginTop:'20px' }}
                required
                error={meta.error && meta.touched}
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
            >
                <FormLabel component="legend">{label?.label}</FormLabel>
                <FormGroup>
                    {
                        data.map((v) => (
                            <FormControlLabel
                                control={
                                    <Checkbox checked={field.value?.includes(v.value)} onChange={() => handleChange(v.value)} />
                                }
                                label={v.label}
                            />
                        ))
                    }
                </FormGroup>
                {
                    meta.error && meta.touched ? <FormHelperText style={{ color: 'red' }}>{meta.error}</FormHelperText> : ""
                }

            </FormControl>
        </>
    );
}

export default MyCheckbox;
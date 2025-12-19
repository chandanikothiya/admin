import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useField } from 'formik';

function MyRadiobtn({data,label,...props}) {

    const [field, meta] = useField(props);
    console.log(props);

    return (
            <FormControl style={{marginTop:'20px'}} error={meta.error && meta.touched }>
                <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
                <RadioGroup
                    {...field}
                    aria-labelledby="demo-radio-buttons-group-label"
                >
                    {
                        data.map((v) => 
                             <FormControlLabel value={v.value} control={<Radio />} label={v.label} />
                        )
                    }
                    {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                </RadioGroup>
                {
                    meta.error && meta.touched ? <p style={{color:'red'}}>{meta.error}</p> : ""
                }
            </FormControl>
    );
}

export default MyRadiobtn;
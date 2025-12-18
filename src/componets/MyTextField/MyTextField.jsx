import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

//defalut type text and 
// also know (...props) as rest operator because if we pass 4 id,name,
// label,type but in props only 3 id,name,type display at log time becuse 
// type is allredy consider in defalut type so not consider in props log time
//type is extracted, and id, label,name are collected into the rest 
// object and then spread onto the <TextField> element.

function MyTextField({ type = "text", data = [], ...props }) {

    const [field, meta] = useField(props);
    console.log("Fieldqqq", field);
    console.log("metaqqq", meta);
    console.log(props);
    console.log(data);
    

    return (
        <TextField
            {...field}
            {...props}
            margin="dense"
            type={type}
            fullWidth
            variant="standard"
            error={meta.error && meta.touched}
            helperText={meta.error && meta.touched ? meta.error : ""}
        >
            {data.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}

        </TextField>

    );
}

export default MyTextField;
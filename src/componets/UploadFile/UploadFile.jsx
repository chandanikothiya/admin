import { Button } from '@mui/material';
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useField } from 'formik';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UploadFile(props) {

    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers; // Formik's internal state management, specifically the values object.
    console.log(helpers);
    

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    {...props}
                    type="file"
                    onChange={(event) => setValue(event.target.files[0])}
                // onChange={(event) => console.log(event.target.files[0])}
                />
            </Button>

            {meta.error && meta.touched ?
                <p style={{ color: 'red' }}>{meta.error}</p> : ""}
        </>
    );
}

export default UploadFile;
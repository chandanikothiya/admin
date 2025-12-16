import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { date, mixed, object, string } from 'yup';
import { Formik, useField, Form } from 'formik';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

function MyTextField(props) {

    const [field, meta] = useField(props);

    return (
        <TextField
            {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error ? meta.error : ""}
            margin="dense"
        />
    );
}

function UserForm(props) {

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    //validation using yup

    // const yesterdayDate = new Date()
    // yesterdayDate.setDate(yesterdayDate.getDate() - 1)

    // console.log(yesterdayDate);


    let userSchema = object({
        name: string()
            .required('Please Enter Name'),
        email: string()
            .email()
            .required('Please Enter Email'),
        password: string()
            .required('Please Enter Password')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])(?=\S+$).{8,}$/, 'Pls enter at least 8 charate,alphabets,special symbol'),
       
    })

    //formik code
    // const formikobj = useFormik({
    //     initialValues: {
    //         name: '',
    //         email: '',
    //         password: '',
    //         cpassword: '',
    //         address: '',
    //         jd: '',
    //         profile_img: ''
    //     },
    //     validationSchema: userSchema,
    //     onSubmit: values => {
    //         console.log(values);
    //     },
    // });

    //disstructring
    // const { handleSubmit, handleChange, values, errors, touched, handleBlur, setFieldValue } = formikobj;
    // console.log(errors, touched);


    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                validationSchema={userSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >

            <Form>
                <MyTextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />

                <MyTextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                />

                <MyTextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />

                 <Button type="submit" variant="contained">Submit</Button>
            </Form>
            </Formik>
        </div>
    );
}

export default UserForm;

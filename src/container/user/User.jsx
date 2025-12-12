import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';

function User(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //not a need this submit bacuse from mui
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const formJson = Object.fromEntries(formData.entries());
    //     const email = formJson.email;
    //     console.log(email);
    //     handleClose();
    // };


    //validation using yup
    let userSchema = object({
        name: string().required('Please Enter Name'),
        email: string().email().required('Please Enter Email'),
        password: string().required('Please Enter Password')
    })

    //formik code
    const formikobj = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    //disstructring
    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formikobj;
    console.log(errors,touched);
    //touched is give true if any filed touch mena sappde koui field ne touch kari hoi tyare

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open User Form
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} id="subscription-form">
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                error={errors.name && touched.name}
                               helperText={errors.name && touched.name ? errors.name : ""}
                            />


                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={errors.email && touched.email}
                                helperText={errors.email && touched.email ? errors.email : ""}
                            />

                            <TextField
                                margin="dense"
                                id="password"
                                name="password"
                                label="Password Address"
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password ? errors.password : ""}
                            />

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        </div>
    );
}

export default User;
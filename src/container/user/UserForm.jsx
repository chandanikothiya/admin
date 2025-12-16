import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { date, mixed, object, string } from 'yup';
import { Form, Formik, useFormik } from 'formik';
import MyTextField from '../../componets/MyTextField/MyTextField';
import UploadFile from '../../componets/UploadFile/UploadFile';





function UserForm(props) {

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

    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)

    console.log(yesterdayDate);

    const country = [
        { value: '', label: '--Select Country--' },
        { value: 'india', label: 'India' },
        { value: 'uk', label: 'UK' },
        { value: 'usa', label: 'USA' }
    ]
    console.log(country);
    country.map((v) => console.log(v.label)
    )


    let userSchema = object({
        name: string()
            .required('Please Enter Name')
            .matches(/[a-zA-Z]+\\.?/, 'Pls enter proper name'),
        email: string()
            .email()
            .required('Please Enter Email'),
        password: string()
            .required('Please Enter Password')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])(?=\S+$).{8,}$/, 'Pls enter at least 8 charate,alphabets,special symbol'),
        cpassword: string()
            .required('Please Enter Confirm Password')
            .test('cpassword', 'password not match', function (val) {
                console.log(val, this.parent.password);
                if (this.parent.password === val) {
                    return true;
                } else {
                    return false;
                }
            }),
        address: string()
            .required("Pls Enter Address")
            .test('address', 'only 3 words allowed', function (val) {
                console.log(val, val.split(" ").length);
                return val.split(" ").length <= 3
            }),
        jd: date()
            .required("Pls Select Date")
            .max(yesterdayDate, "Pls Select Past Date"),
        country: string().required(),
        profile_img: mixed()
            .required('Pls selct image')
            .test('profile_img', 'only png,jpg and jpeg allowed', function (val) {
                console.log(val, val.type);

                const typeArray = ['image/png', 'image/jpg', 'image/jpeg'];

                return typeArray.includes(val.type)
            })
            .test('profile_img', 'only 2mb size file allowed', function (val) {
                console.log(val, val.size);

                return val.size <= 2 * 1024 * 1024
            })
    })

    //formik code
    const formikobj = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            address: '',
            jd: '',
            profile_img: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    //disstructring
    const { handleSubmit, handleChange, values, errors, touched, handleBlur, setFieldValue } = formikobj;
    console.log(errors, touched);
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
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                                cpassword: '',
                                address: '',
                                jd: '',
                                country:'',
                                profile_img: ''
                            }}
                            validationSchema={userSchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            <Form id="subscription-form">
                                <MyTextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                />

                                <MyTextField
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                />

                                <MyTextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                />

                                <MyTextField
                                    id="cpassword"
                                    name="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                />

                                <MyTextField
                                    id="address"
                                    name="address"
                                    label="Address"
                                    multiline
                                    rows={4}
                                />

                                <MyTextField
                                    id="jd"
                                    name="jd"
                                    label="Joining Date"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    type="date" />

                                <MyTextField
                                    id="country"
                                    name="country"
                                    label="Country"
                                    select
                                    data={country}
                                />

                                <UploadFile
                                    name='profile_img'
                                />

                            </Form>
                        </Formik>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Submit
                        </Button>
                    </DialogActions>

                </Dialog>
            </React.Fragment>

        </div >
    );
}

export default UserForm;
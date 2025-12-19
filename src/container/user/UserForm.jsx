import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { array, boolean, date, mixed, object, string } from 'yup';
import { Form, Formik, useFormik } from 'formik';
import MyTextField from '../../componets/MyTextField/MyTextField';
import UploadFile from '../../componets/UploadFile/UploadFile';
import MyRadiobtn from '../../componets/MyRadiobtn/MyRadiobtn';
import MyCheckbox from '../../componets/MyCheckbox/MyCheckbox';
import MySwitch from '../../componets/MySwitch/MySwitch';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function UserForm(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);

    const getdata = () => {
        const localdata = JSON.parse(localStorage.getItem("user")) || [];
        setData(localdata)
    }

    useEffect(() => {
        getdata();
    }, [])

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

    const gender = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
        { value: 'other', label: 'Other' },
    ]

    const hobby = [
        { value: 'reading', label: 'Reading' },
        { value: 'singing', label: 'Singing' },
        { value: 'cricket', label: 'Cricket' },
        { value: 'traveling', label: 'Traveling' },
        { value: 'walking', label: 'Walking' }
    ]


    let userSchema = object({
        name: string()
            .required('Please Enter Name'),
        // .matches(/[a-zA-Z]+\\.?/, 'Pls enter proper name'),
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
        gender: string().required('Pls Select Gender'),
        hobby: array().min(2),
        jd: date()
            .required("Pls Select Date")
            .max(yesterdayDate, "Pls Select Past Date"),
        country: string().required(),
        profile_img: mixed()
            .required('Pls select image')
            .test('profile_img', 'only png,jpg and jpeg allowed', function (val) {
                console.log(val, val.type);

                const typeArray = ['image/png', 'image/jpg', 'image/jpeg'];

                return typeArray.includes(val.type)
            })
            .test('profile_img', 'only 2mb size file allowed', function (val) {
                console.log(val, val.size);

                return val.size <= 2 * 1024 * 1024
            }),
        status: boolean().required().oneOf([true], "Status must be active")
    })

    function handlesubmit(values) {
        console.log("ok", values.profile_img.name);
        const localdata = JSON.parse(localStorage.getItem("user")) || [];

        localdata.push({ ...values, profile_img: values.profile_img.name, id: crypto.randomUUID() });
        // console.log(localdata);

        localStorage.setItem("user", JSON.stringify(localdata))
        
        //this line for rerender (refreseh paeg in react when any props or state value change then page rerennder(refesh))
        setData(localdata)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'gender', headerName: 'Gender', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'hobby', headerName: 'Hobby', width: 130 },
        { field: 'jd', headerName: 'Joining Date', width: 130 },
        { field: 'profile_img', headerName: 'Profile_img', width: 200 },
        { field: 'status', headerName: 'Status', width: 100 },
        {
            field: 'action', headerName: 'Status', width: 130, renderCell: (params) => {
                console.log(params)
                return (
                    <>
                        <IconButton aria-label="delete"
                            onClick={(e) => handleEdit(e, params.row)}
                            color="primary"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete"
                            onClick={(e) => handleDelete(e, params.row)}
                            color="error"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

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
                                country: '',
                                gender: '',
                                hobby: [],
                                profile_img: '',
                                status: false
                            }}
                            validationSchema={userSchema}
                            onSubmit={(values,{resetForm}) => {
                                console.log("jjj", values);

                                handlesubmit(values);

                                handleClose();
                                resetForm();
                            }}
                        >
                            <Form>
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

                                <MyRadiobtn
                                    name="gender"
                                    data={gender}
                                    label="gender"
                                />

                                <MyCheckbox
                                    name="hobby"
                                    label="Hobby"
                                    data={hobby}
                                />

                                <MyTextField
                                    id="country"
                                    name="country"
                                    label="Country"
                                    InputLabelProps={{ shrink: true, required: true }}
                                    select
                                    data={country}
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}
                                />

                                <UploadFile
                                    name='profile_img'
                                />

                                <MySwitch
                                    label="Status"
                                    name="status"
                                    display="Active / Inactive"
                                />

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" >
                                        Submit
                                    </Button>
                                </DialogActions>

                            </Form>
                        </Formik>
                    </DialogContent>


                </Dialog>
            </React.Fragment>

            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div >
    );
}

export default UserForm;
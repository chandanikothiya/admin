import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { boolean, date, object, string } from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { resume } from 'react-dom/server';
import MyTextField from '../../componets/MyTextField/MyTextField';
import MyCheckbox from '../../componets/MyCheckbox/MyCheckbox';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';


function UserFormValidation(props) {

    const [data, setData] = useState([]);
    const [updatedata, setUpdateData] = useState({})
    let uname = ['riya123', 'priya1234']

    const getdata = async () => {
        const response = await fetch("http://localhost:3000/user");
        // console.log(response);

        const datar = await response.json();
        console.log(datar);

        setData(datar)
    }
    console.log(data);


    useEffect(() => {
        getdata();
    }, [])

    let formSchemaobj = object({
        username: string().required()
            .test('username', "Enter unique username", function (val) {
                if (uname.includes(val)) {
                    return false //flase thne error
                } else {
                    return true;
                }
            }),
        startdate: date().required(),
        enddate: date().required()
            .test('enddate', 'end date must be grater then start date', function (val) {
                const sdate = new Date(this.parent.startdate);
                const edate = new Date(val);

                if (sdate > edate) {
                    return false;
                } else {
                    return true;
                }
            }),
        area: string().required(),
        gst: string()
            .test('gst', "enter Valid GST no", function (val) {
                if (this.parent.area === 'residensal') {
                    return true
                }

                const gstrgx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
                if (gstrgx.test(val)) {
                    return true
                } else {
                    return false
                }
            }),


        password: string().required()
            .test('password', 'Weak password', function (val) {
                let wpassword = ['abcd', 'password', '1234']
                let flag = true;

                wpassword.map((v) => {
                    if (val.includes(v)) {
                        flag = false;
                    }
                    console.log(flag)
                })
                return flag;

            }),
        terms: boolean().required().oneOf([true], "terms must be checked")
    })

    const handleSubmit = async (values) => {
        // e.preventDefault();
        console.log(values);
        try {

            if (Object.keys(updatedata).length > 0) {
                const response = await fetch(`http://localhost:3000/user/${updatedata.id}`, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const datar = await response.json();
                console.log("datar", datar);

                const index = data.findIndex((v) => v.id === updatedata.id)
                const udata = [...data];
                udata[index] = { ...datar }

                setData(udata)
            } else {
                const response = await fetch("http://localhost:3000/user", {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const datar = await response.json();
                console.log(datar);
                setData([...data, datar]);
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(data);


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: "DELETE",
            })

            const index = data.findIndex((v) => v.id === id);
            // console.log("index",index);

            const udata = [...data];
            udata.splice(index, 1);
            setData(udata);

            //filter use for delete
            //   const f = data.filter((v) => v.id !== id)
            // setData(f)

        } catch (error) {
            console.log(error)
        }

    }

    const handleEdit = async (data) => {
        console.log(data)
        setUpdateData(data);
    }

    const columns = [
        { field: 'username', headerName: 'username', width: 130 },
        { field: 'startdate', headerName: 'startdate', width: 180 },
        { field: 'enddate', headerName: 'enddate', width: 130 },
        { field: 'area', headerName: 'area', width: 130 },
        { field: 'gst', headerName: 'gst', width: 200 },
        {
            field: 'Action', headerName: 'Action', width: 200,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete"
                        onClick={(e) => handleEdit(params.row)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete"
                        onClick={(e) => handleDelete(params.row.id)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];
    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>User Form</h2>

            <Formik
                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                    username: '',
                    startdate: '',
                    enddate: '',
                    area: '',
                    gst: '',
                    password: '',
                    terms: false
                }}
                enableReinitialize={true}
                validationSchema={formSchemaobj}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                }}
            >
                {({ values, touched, errors, handleChange }) => (
                    <Form id="userform">
                        <MyTextField
                            name="username"
                            id="username"
                            label="UserName"
                        />

                        <MyTextField
                            name="startdate"
                            id="startdate"
                            label="Start Date"
                            type='date'
                            InputLabelProps={{ shrink: true, required: true }}
                        />

                        <MyTextField
                            name="enddate"
                            id="enddate"
                            label="End Date"
                            type='date'
                            InputLabelProps={{ shrink: true, required: true }}
                        />

                        <MyTextField
                            name="area"
                            id="area"
                            label="Area"
                            data={[
                                { value: '', label: '--Select Area--' },
                                { value: 'residensal', label: 'Residensal' },
                                { value: 'company', label: 'Company' },
                            ]}
                            select
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                            InputLabelProps={{ shrink: true, required: true }}
                        />

                        <MyTextField
                            name="gst"
                            id="gst"
                            label="GST"
                        />

                        <MyTextField
                            name="password"
                            id="password"
                            label="Password"
                            type='password'
                        />


                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="terms"
                                    checked={values.terms}
                                    onChange={handleChange}
                                />
                            }
                            label="I accept Terms and Conditions"
                        />
                        {touched.terms && errors.terms && (
                            <FormHelperText style={{ color: 'red' }}>{errors.terms}</FormHelperText>
                        )}

                        <button type="submit" id="sbtn" style={{ backgroundColor: 'green', color: 'white', display: 'block', marginTop: '30px' }}>
                            Submit
                        </button>

                    </Form>
                )}
            </Formik>

            <DataGrid
                rows={data}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </div>
    );
}

export default UserFormValidation;
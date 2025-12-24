import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { boolean, date, object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


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


        password: string().required(),
        // .test('password', 'Weak password', function (val) {
        //     let wpassword = ['abcd', 'password', '1234']
        //     let flag = true;

        //     wpassword.map((v) => {
        //         if (val.includes(v)) {
        //             flag = false;
        //         }
        //         console.log(flag)
        //         return flag;
        //     })
        // }),
        terms: boolean().required().oneOf([true], "terms must be checked")
    })

    const handlefSubmit = async (values) => {
        // e.preventDefault();
        console.log(values);
        let response = '';

        try {
            
            if (Object.keys(updatedata).length > 0) {
                response = await fetch(`http://localhost:3000/user/${updatedata.id}`, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            } else {
                response = await fetch("http://localhost:3000/user", {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            }
            const datar = await response.json();
            console.log(datar);
            setData({ ...data, datar })
            resetForm();

        } catch (error) {

        }


    }

    const formikobj = useFormik({
        initialValues: Object.keys(updatedata).length > 0 ? updatedata : {
            username: '',
            startdate: '',
            enddate: '',
            area: '',
            gst: '',
            password: '',
            terms: false
        },
        enableReinitialize: true,
        validationSchema: formSchemaobj,
        onSubmit: values => {
            console.log(values);
            handlefSubmit(values)

        },
    });

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: "DELETE",
            })

            const datar = await response.json();
            setData({ ...data, datar })
        } catch (error) {
            console.log(error)
        }

    }

    const handleEdit = async (data) => {
        console.log(data)
        setUpdateData(data);
    }

    const { handleSubmit, handleChange, values, errors, handleBlur, touched, resetForm } = formikobj;
    console.log(errors, touched, values);

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

            <form id="userform" onSubmit={handleSubmit}>
                <TextField
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    error={errors.username && touched.username}
                    helperText={errors.username && touched.username ? errors.username : null}
                />


                <TextField
                    margin="dense"
                    id="startdate"
                    name="startdate"
                    label="Start Date"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.startdate}
                    error={errors.startdate && touched.startdate}
                    helperText={errors.startdate && touched.startdate ? errors.startdate : null}
                />

                <TextField
                    margin="dense"
                    id="enddate"
                    name="enddate"
                    label="End Date"
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.enddate}
                    error={errors.enddate && touched.enddate}
                    helperText={errors.enddate && touched.enddate ? errors.enddate : null}
                />

                <select style={{ width: '100%', padding: '10px', marginTop: '20px' }}
                    name='area'
                    id='area'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.area}
                >
                    <option value="">--Select Area--</option>
                    <option value="residensal">Residensal</option>
                    <option value="company">Company</option>
                </select>
                {errors.area && touched.area ? <p style={{ color: 'red' }}>{errors.area}</p> : null}

                <TextField
                    margin="dense"
                    id="gst"
                    name="gst"
                    label="GST No"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gst}
                    error={errors.gst && touched.gst}
                    helperText={errors.gst && touched.gst ? errors.gst : null}
                />

                <TextField
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    type="Password"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password ? errors.password : null}
                />

                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    style={{ marginTop: '20px' }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.terms && touched.terms}
                    checked={values.terms}
                />
                <label htmlFor="terms" style={{ fontSize: '18px' }}>Terms and Conditions</label>
                {errors.terms && touched.terms ? <p style={{ color: 'red' }}>{errors.terms}</p> : null}


                <button type="submit" id="sbtn" style={{ backgroundColor: 'green', color: 'white', display: 'block', marginTop: '30px' }}>
                    Submit
                </button>

            </form>

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
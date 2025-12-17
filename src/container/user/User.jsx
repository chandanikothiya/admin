import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { array, date, mixed, object, string } from 'yup';
import { FieldArray, useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


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

    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1)

    console.log(yesterdayDate);

    const hobby = [
        { value: 'reading', label: 'Reading' },
        { value: 'singing', label: 'Singing' },
        { value: 'cricket', label: 'Cricket' },
        { value: 'traveling', label: 'Traveling' },
        { value: 'walking', label: 'Walking' }
    ]


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
        gender: string().required(),
        hobby:array().min(2),
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
            gender: '',
            hobby:[],
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
    //touched is give true if any filed touch mena appde koi field ne touch kari hoi tyare

    function handlehchange(val) {
        console.log(val,formikobj.initialValues.hobby);

    }

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
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                error={errors.password && touched.password}
                                helperText={errors.password && touched.password ? errors.password : ""}
                            />

                            <TextField
                                margin="dense"
                                id="cpassword"
                                name="cpassword"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cpassword}
                                error={errors.cpassword && touched.cpassword}
                                helperText={errors.cpassword && touched.cpassword ? errors.cpassword : ""}
                            />

                            <TextField
                                margin="dense"
                                id="address"
                                name="address"
                                label="Address"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                error={errors.address && touched.address}
                                helperText={errors.address && touched.address ? errors.address : ""}
                            />

                            <TextField
                                margin="dense"
                                id="jd"
                                name="jd"
                                label="Joining Date"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.jd}
                                error={errors.jd && touched.jd}
                                helperText={errors.jd && touched.jd ? errors.jd : ""}
                            />

                            <FormControl name="gender">
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                                {
                                    errors.gender && touched.gender ? <p style={{ color: 'red' }}>{errors.gender}</p> : ""
                                }
                            </FormControl>

                            <FormGroup name="hobby">
                                <FormLabel component="legend">Hobby</FormLabel>
                                {
                                    hobby.map((v) => (
                                        <FormControlLabel control={<Checkbox />} label={v.label} 
                                            onChange={() => handlehchange(v.value)}
                                        />
                                    ))
                                }
                               
                                  {
                                    errors.hobby && touched.hobby ? <p style={{ color: 'red' }}>{errors.hobby}</p> : ""
                                }
                            </FormGroup>

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    name='profile_img'
                                    onChange={(event) => setFieldValue('profile_img', event.target.files[0])}
                                    onBlur={handleBlur}
                                // onChange={(event) => console.log(event.target.files[0])}
                                />
                            </Button>

                            {errors.profile_img && touched.profile_img ? <p className='ferror' style={{ color: 'red' }}>{errors.profile_img}</p> : null}

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
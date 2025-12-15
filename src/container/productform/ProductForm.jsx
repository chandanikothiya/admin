
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string,number } from 'yup';
import { useFormik } from 'formik';


function ProductForm(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let productSchema = object({
        name: string().required('Please Enter Name'),
        discription: string().max(5, 'Only 100 Charter Allowed').required('Please Enter discription'),
        price: number().moreThan(0, 'value must be grater then 0').required('Please Enter Price')
    })

    const formikobj = useFormik({
        initialValues: {
            name: '',
            discription: '',
            price: ''
        },
        validationSchema: productSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formikobj;
    console.log(errors, touched);

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open Product Form
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
                                id="discription"
                                name="discription"
                                label="discription"
                                // type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                multiline
                                rows={4}                              
                                value={values.discription}
                                error={errors.discription && touched.discription}
                                helperText={errors.discription && touched.discription ? errors.discription : ""}
                            />

                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="price"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                error={errors.price && touched.price}
                                helperText={errors.price && touched.price ? errors.price : ""}
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

export default ProductForm;
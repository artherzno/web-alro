import React from 'react'
import Header from '../components/Header';
import Nav from '../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {MTextField} from '../components/MaterialUI'
import { Formik, Form,  Field } from 'formik';

class ListFarmerPayLoan extends React.Component {

    render() {

        return (
            <div>
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />

                <Box mt={5}>
                    <div >
                        <Box ml={2}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <div className="header-tab"> บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้ </div>
                                </Grid>
                                <Grid item>
                                    <div className="header-tab"> บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้ </div>
                                </Grid>
                            </Grid>
                        </Box>
                       
                    </div>
                </Box>
                <div className="line-horizontal"/>
                <Formik
                    initialValues={{ poNumber:"" }}
                    enableReinitialize={true}
                    validate={values => {
                        const requires = ['poNumber']
                        let errors = {};

                        if (!values['requestDocTaxId']) {
                            errors['requestDocTaxId'] = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {

                        setSubmitting(false);
                        resetForm()
                   

                    }}
                    render={({ submitForm, handleSubmit, isSubmitting, values, setFieldValue, handleChange, validateForm, validateField }) => (
                        <Form>
                            <Field
                                type="number"
                                name="guaranteeAmount"
                                variant="outlined"
                                fullWidth
                                required
                                placeholder={`0`}
                                component={MTextField}
                                inputProps={{
                                    min: "0"
                                }}/>
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export default ListFarmerPayLoan
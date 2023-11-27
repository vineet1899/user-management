/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Grid, Paper, Typography, FormControlLabel, Checkbox } from '@mui/material';

import { login, getUserDetails } from '../services/auth.service';
import { validateAccessToken } from '../services/user.service';

type Props = {};

const UserUpdateForm: React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [showUserUpdateForm, setShowUserUpdateForm] = useState<boolean>(false);

  useEffect(() => {
    // Check if Access Token is valid
    validateAccessToken()
      .then(() => {
        // Access Token is valid, show User Update Details form
        setShowUserUpdateForm(true);
      })
      .catch(() => {
        // Access Token is invalid, navigate to the specified URL
        //navigate('https://localhost:3000/sso');
      });
  }, []);

  const primaryEmailValues: {
    priemail: string;
  } = {
    priemail: '',
  };

  const additionalFormValues: {
    name: string;
    email: string;
    mobile: string;
    mpCode: string;
    house: string;
    remarks: string;
    pa: string;
    signatureapprovedby: string;
    signatureverifiedby: string;
    active: boolean;
  } = {
    name: '',
    email: '',
    mobile: '',
    mpCode: '',
    house: '',
    remarks: '',
    pa: '',
    signatureapprovedby: '',
    signatureverifiedby: '',
    active: false,
  };

  const emailValidationSchema = Yup.object().shape({
    priemail: Yup.string().email('Invalid email format').required('Email is required!'),
  });

  const additionalFormValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid email format').required('Email is required!'),
    mobile: Yup.string().required('Mobile is required!'),
    mpCode: Yup.string().required('MP Code is required!'),
    signatureapprovedby: Yup.string().required('Signature Approved By is required!'),
    house: Yup.string().required('House is required!'),
    remarks: Yup.string().required('Remarks is required!'),
    pa: Yup.string().required('PA/PS is required!'),
    signatureverifiedby: Yup.string().required('Signature Verified By is required!'),
    active: Yup.boolean(),
  });

  const handleEmailValidation = (formValues: { priemail: string }) => {
    const { priemail } = formValues;

    setMessage('');
    setLoading(true);
console.log('search email: ', priemail);
    getUserDetails(priemail)
      .then(() => {
        setShowUserUpdateForm(true);
      })
      .catch((error: any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  const handleAdditionalFormSubmit = (formValues: {
    name: string;
    email: string;
    mobile: string;
    mpCode: string;
    house: string;
    remarks: string;
    pa: string;
    signatureapprovedby: string;
    signatureverifiedby: string;
    active: boolean;
  }) => {
    // Handle submission of the additional form
    console.log('Additional Form Values:', formValues);
    // You can perform further actions here
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            textAlign: 'center',
            borderRadius: 'none',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h5" sx={{ mb: 10 }}>
            User Update Details
          </Typography>

          {/* First Form */}
          <Formik
            initialValues={primaryEmailValues}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailValidation}
          >
            <Form>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={8}>
                  <Field
                    name="priemail"
                    type="text"
                    as={TextField}
                    label="Enter Email"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="priemail"
                    component="div"
                    className="alert alert-danger"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ mt: 1 }}
                  >
                    {loading && (
                      <Typography className="spinner-border spinner-border-sm"></Typography>
                    )}
                    <Typography>Validate Email</Typography>
                  </Button>
                </Grid>
                {message && (
                  <Grid item xs={12}>
                    <Typography
                      className="alert alert-danger"
                      role="alert"
                    >
                      {message}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>

      {/* Second Form */}
      {showUserUpdateForm && (
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              textAlign: 'center',
              borderRadius: 'none',
              boxShadow: 'none',
            }}
          >
            <Typography variant="h5" sx={{ mb: 10 }}>
              Additional User Details
            </Typography>

            <Formik
              initialValues={additionalFormValues}
              validationSchema={additionalFormValidationSchema}
              onSubmit={handleAdditionalFormSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="name"
                    type="text"
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />

                  <Field
                    name="email"
                    type="text"
                    as={TextField}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />

                  <Field
                    name="mobile"
                    type="text"
                    as={TextField}
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="alert alert-danger"
                  />
                  <Field
                    name="signatureapprovedby"
                    type="text"
                    as={TextField}
                    label="Signature Approved By"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                  />
                  <ErrorMessage
                    name="signatureapprovedby"
                    component="div"
                    className="alert alert-danger"
                  />
                   <FormControlLabel
                     control={
                      <Field
                        name="active"
                        type="checkbox"
                        as={Checkbox}
                      />
                    }
                     label="Active"
                     sx={{mt: 5}}
                  />
                </Grid>
                <Grid item xs={6}>
                <Field
                  name="mpCode"
                  type="text"
                  as={TextField}
                  label="Mp Code"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="mpCode"
                  component="div"
                  className="alert alert-danger"
                  />
                  <Field
                    name="house"
                    type="text"
                    as={TextField}
                    label="House"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                />
                <ErrorMessage
                  name="house"
                  component="div"
                  className="alert alert-danger"
                  />
                  <Field
                    name="pa"
                    type="text"
                    as={TextField}
                    label="PA/PS"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                />
                <ErrorMessage
                  name="pa"
                  component="div"
                  className="alert alert-danger"
                  />
                  <Field
                    name="remarks"
                    type="text"
                    as={TextField}
                    label="Remarks"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                />
                <ErrorMessage
                  name="remarks"
                  component="div"
                  className="alert alert-danger"
                  />
                  <Field
                    name="signatureverifiedby"
                    type="text"
                    as={TextField}
                    label="Signature Verified By"
                    variant="outlined"
                    fullWidth
                    sx={{mt: 5}}
                />
                <ErrorMessage
                  name="signatureverifiedby"
                  component="div"
                  className="alert alert-danger"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    {loading && (
                      <Typography className="spinner-border spinner-border-sm"></Typography>
                    )}
                    <Typography>Update User Detail</Typography>
                  </Button>
                </Grid>
                </Grid>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default UserUpdateForm;

import { Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';

const defaultValues = {
  firstname: '',
  lastname: '',
  linkedinPage: '',
  email: '',
  password: '',
  emailConfirmed: false,
  paymentIban: '',
  roleId: '',
  points: 0,
  phone: '',
  customerId: 0,
  mobile: '',
  genderId: 0,
  
};

const schema = yup.object().shape({
  description: yup.string()
    .min(3, 'Description must have more than 3 characters')
    .required('Please enter a description'),
});

const AppProfileSetting = (props) => {

}
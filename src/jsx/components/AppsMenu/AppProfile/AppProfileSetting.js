import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenders, selectGenders } from '../../../pages/users/users/store/gendersSlice';
import { getRoles, selectRoles } from '../../../pages/users/users/store/rolesSlice';
import Select from "react-select";

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
  gender: 0,
  createUser: 0,
  createDate: '',
  accountHolderName: '',
  secondaryEmail: '',
  title: '',
  profilePicture: '',
  profilePictureFile: '',
};

const schema = yup.object().shape({
  firstname: yup.string().required('Please enter a firstname'),
  lastname: yup.string().required('Please enter a lastname'),
  linkedinPage: yup.string().nullable(),
  email: yup.string().required('Please enter a email'),
  password: yup.string().nullable(),
  paymentIban: yup.string().nullable(),
  roleId: yup.string().required('Please enter a roleId'),
  points: yup.number().required('Please enter a points'),
  phone: yup.string().required('Please enter a phone'),
  customerId: yup.number().required('Please enter a customerId'),
  mobile: yup.string().required('Please enter a mobile'),
  gender: yup.number().required('Please enter a genderId'),
  createUser: yup.number().required('Please enter a createUser'),
  createDate: yup.string().required('Please enter a createDate'),
  accountHolderName: yup.string().required('Please enter a accountHolderName'),
  secondaryEmail: yup.string().nullable(),
  title: yup.string().required('Please enter a title'),
  profilePicture: yup.string().required('Please enter a profilePicture'),
  profilePictureFile: yup.string().required('Please enter a profilePictureFile'),
});

const AppProfileSetting = (props) => {
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const genders = useSelector(selectGenders);
  const user = useSelector(({ auth }) => auth.user);

  const [initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    dispatch(getGenders());
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      ...user
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleOnSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="pt-3">
      <div className="settings-form">
        <h4 className="text-primary">Account Setting</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleOnSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isValid,
            touched
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div
                  className={`form-group mb-1 col-md-6 ${values.firstname
                    ? errors.firstname
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                  }`}
                >
                  <label className="form-label">First Name</label>  
                  <input
                    type="text"
                    className="form-control"
                    id="val-firstname"
                    placeholder="Enter First Name"
                    name="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                  />
                  <div
                    id="val-firstname-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.firstname && touched.firstname ? errors.firstname : ''}
                  </div>
                </div>

                <div
                  className={`form-group mb-1 col-md-6 ${values.lastname
                    ? errors.lastname
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="val-lastname"
                    placeholder="Enter Last Name"
                    name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                  />
                  <div
                    id="val-lastname-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.lastname && touched.lastname ? errors.lastname : ''}
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className={`form-group mb-1 col-md-6 ${values.email
                    ? errors.email
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="val-email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div
                    id="val-email-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.email && touched.email ? errors.email : ''}
                  </div>
                </div>

                <div
                  className={`form-group mb-1 col-md-6 ${values.secondaryEmail
                    ? errors.secondaryEmail
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Secondary Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="val-secondaryEmail"
                    placeholder="Enter Secondary Email"
                    name="secondaryEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondaryEmail}
                  />
                  <div
                    id="val-secondaryEmail-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.secondaryEmail && touched.secondaryEmail ? errors.secondaryEmail : ''}
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className={`form-group mb-1 col-md-6 ${values.gender
                    ? errors.gender
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Gender</label>
                  <Select
                    defaultValue={''}
                    onChange={(value) => setFieldValue('gender', value.id)}
                    options={genders}
                    getOptionLabel={(o) => o.description}
                    getOptionValue={(o) => o.id}
                    value={genders.find((g) => g.id === values.gender)}
                    id="val-gender"
                    style={{
                      lineHeight: '40px',
                      color: '#7e7e7e',
                      paddingLeft: '15px',  
                    }}
                  />
                  <div
                    id="val-gender-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.gender && touched.gender ? errors.gender : ''}
                  </div>
                </div>

                <div
                  className={`form-group mb-1 col-md-6 ${values.gender
                    ? errors.gender
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Role</label>
                  <Select
                    defaultValue={''}
                    onChange={(value) => setFieldValue('roleId', value.id)}
                    options={roles}
                    getOptionLabel={(o) => o.description}
                    getOptionValue={(o) => o.id}
                    value={roles.find((r) => r.id === values.roleId)}
                    id="val-roleId"
                    style={{
                      lineHeight: '40px',
                      color: '#7e7e7e',
                      paddingLeft: '15px',
                    }}
                  />
                  <div
                    id="val-roleId-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.roleId && touched.roleId ? errors.roleId : ''}
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className={`form-group mb-1 col-md-6 ${values.linkedinPage
                    ? errors.linkedinPage
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Linkedin Page</label>
                  <input
                    type="text"
                    className="form-control"
                    id="val-linkedinPage"
                    placeholder="Enter Linkedin Page"
                    name="linkedinPage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linkedinPage}
                  />
                  <div
                    id="val-linkedinPage-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.linkedinPage && touched.linkedinPage ? errors.linkedinPage : ''}
                  </div>
                </div>

                <div
                  className={`form-group mb-1 col-md-6 ${values.paymentIban
                    ? errors.paymentIban
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="form-label">Paymen Iban</label>
                  <input
                    type="text"
                    className="form-control"
                    id="val-paymentIban"
                    placeholder="Enter Paymen Iban"
                    name="paymentIban"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.paymentIban}
                  />
                  <div
                    id="val-paymentIban-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.paymentIban && touched.paymentIban ? errors.paymentIban : ''}
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <div className="form-check custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="gridCheck"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="gridCheck"
                  >
                    Check me out
                  </label>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">Update</button>
            </form>
          )}
        </Formik>

        
      </div>
    </div>
  );
}

export default AppProfileSetting;

import React, {
  useEffect,
  useState,
  Fragment,
} from "react";
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';
import PageTItle from "../../../layouts/PageTitle";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Nouislider from "nouislider-react";
import { Stepper, Step } from "react-form-stepper";
import { Editor } from "@tinymce/tinymce-react";
import { Formik } from "formik";
import * as yup from "yup";
import { addNewJob } from './store/jobOpeningSlice';
import { getJobStatuses, selectJobStatuses } from '../../definitions/jobStatuses/store/jobStatusSlice';
import { getJobTypes, selectJobTypes } from '../../definitions/jobTypes/store/jobTypeSlice';
import { getCustomers, selectCustomers } from '../../customers/customers/store/customersSlice';
import { getCountries, selectCountries } from '../../definitions/jobLocations/store/countriesSlice';
import { getCities, selectCities } from '../../definitions/jobLocations/store/citiesSlice';
import { getEducationLevels, selectEducationLevels } from '../../definitions/educationLevels/store/educationLevelSlice';
import { getJobSalaryTypes, selectJobSalaryTypes } from '../../definitions/jobSalaryTypes/store/jobSalaryTypeSlice'; 
import { getInternalRecruiters, selectInternalRecruiters } from "../../users/users/store/internalRecruitersSlice";

const defaultValues = {
  shortName: "",
  jobDescription: "",
  genderId: 0,
  minEducationLevelId: 0,
  customerId: 0,
  customerResponsibleId: '',
  customerIsVisible: 0,
  jobTypeId: 0,
  locationCountryId: 0,
  locationCityId: 0,
  isRemote: 0,
  minExperience: 0,
  statusId: 0,
  minSalary: 0,
  salaryTypeId: 0,
  currencyTypeId: 0, //for salary
  numberOfPositions: 0,
  commissionFee: 0,
  commissionCurrencyTypeId: 0,
  targetDate: "",
  createUserId: 0,
  qualification: "",
  referenceCode: "",
  maxSalary: 0,
  openToExternal: 0,
  maxExperience: 0,
};

const OpenJob = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedJobTypeOption, setSelectedJobTypeOption] = useState(null);
  const [goSteps, setGoSteps] = useState(0);
  const jobStatuses = useSelector(selectJobStatuses);
  const jobTypes = useSelector(selectJobTypes);
  const customers = useSelector(selectCustomers);
  const customerResponsibles = useSelector(({ customerApp }) => customerApp.customerResponsibles);
  const countries = useSelector(selectCountries);
  const cities = useSelector(selectCities);
  const educationLevels = useSelector(selectEducationLevels);
  const salaryTypes = useSelector(selectJobSalaryTypes);
  const internalRecruiters = useSelector(selectInternalRecruiters);
  const genders = [
    {
      id: 1,
      description: 'Male',
    },
    {
      id: 2,
      description: 'Female',
    }
  ];

  const customerVisibilities = [
    {
      id: 1,
      description: 'Açık',
    },
    {
      id: 2,
      description: 'Gizli',
    }
  ];

  const schema = yup.object().shape({
    shortName: yup.string().required(t("required")),
    jobDescription: yup.string().required(t("required")),
    genderId: yup.boolean().required(t("required")),
    minEducationLevelId: yup.boolean().required(t("required")),
    customerId: yup.boolean().required(t("required")),
    customerIsVisible: yup.boolean().required(t("required")),
    jobTypeId: yup.boolean().required(t("required")),
    locationCountryId: yup.boolean().required(t("required")),
    locationCityId: yup.boolean().required(t("required")),
    isRemote: yup.boolean().required(t("required")),
    minExperience: yup.number().required(t("required")),
    statusId: yup.boolean().required(t("required")),
    minSalary: yup.number().required(t("required")),
    salaryTypeId: yup.boolean().required(t("required")),
    currencyTypeId: yup.boolean().required(t("required")), //for salary
    numberOfPositions: yup.number().required(t("required")),
    commissionFee: yup.number().required(t("required")),
    commissionCurrencyTypeId: yup.boolean().required(t("required")),
    targetDate: yup.date().required(t("required")),
    createUserId: yup.boolean().required(t("required")),
    qualification: yup.string().required(t("required")),
    referenceCode: yup.string().required(t("required")),
    maxSalary: yup.number().required(t("required")),
    openToExternal: yup.boolean().required(t("required")),
    maxExperience: yup.number().required(t("required")),
  });

  const handleOnSubmit = (data) => {
    dispatch(addNewJob(data))
  };

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  useEffect(() => {
    dispatch(getJobStatuses());
    dispatch(getJobTypes());
    dispatch(getCustomers());
    dispatch(getCountries());
    dispatch(getCities());
    dispatch(getEducationLevels());
    dispatch(getJobSalaryTypes());
    dispatch(getInternalRecruiters());
  }, [dispatch]);

  return (
    <Fragment>
      <PageTItle
        motherMenu={t("sidebar.jobs.job")}
        activeMenu={t("sidebar.jobs.addJob")}
      />

      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-body">
              <div className="form-wizard ">
                <Stepper
                  className="nav-wizard"
                  activeStep={goSteps}
                >
                  <Step className="nav-link" onClick={() => setGoSteps(0)} />
                  <Step className="nav-link" onClick={() => setGoSteps(1)} />
                  <Step className="nav-link" onClick={() => setGoSteps(2)} />
                  <Step className="nav-link" onClick={() => setGoSteps(3)} />
                  <Step className="nav-link" onClick={() => setGoSteps(4)} />
                </Stepper>

                <Formik
                  initialValues={defaultValues}
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
                    touched,
                    isValid,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      {goSteps === 0 && (
                        <>
                          <section>
                            <div className="row">
                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.referenceCode
                                    ? errors.referenceCode
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>{t("newJobForm.referenceCode")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  id="val-referenceCode"
                                  name="referenceCode"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.referenceCode}
                                />
                                <div
                                  id="val-referenceCode-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                >
                                  {errors.referenceCode && touched.referenceCode ? errors.referenceCode : ''}
                                </div>

                                <div
                                  id="val-referenceCode-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                />
                              </div>
                              {/*Reference Code*/}

                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.shortName
                                    ? errors.shortName
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>{t("newJobForm.shortName")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  id="val-shortName"
                                  name="shortName"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.shortName}
                                />
                                <div
                                  id="val-shortName-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                >
                                  {errors.shortName && touched.shortName ? errors.shortName : ''}
                                </div>
                                <div
                                  id="val-shortName-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                />
                              </div>
                              {/*Short Name*/}

                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.shortName
                                    ? errors.shortName
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>{t("newJobForm.targetDate")}</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="val-targetDate"
                                  name="targetDate"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.targetDate}
                                />
                              </div>
                              {/*Target Date*/}

                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.statusId
                                    ? errors.statusId
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>{t("newJobForm.status")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('status', value.id)}
                                  options={jobStatuses}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                  value={values.statusId}
                                  id="val-statusId"
                                />
                              </div>
                              {/*Job Status*/}

                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.numberOfPositions
                                    ? errors.numberOfPositions
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>
                                  {t("newJobForm.numberOfPosition")}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.numberOfPositions}
                                  id="val-numberOfPositions"
                                />
                              </div>
                              {/*Number Of Positions */}
                            </div>
                          </section>
                          <div className="text-end toolbar toolbar-bottom p-2">
                            <button
                              className="btn btn-primary sw-btn-next"
                              onClick={() => setGoSteps(1)}
                              // disabled={values.referenceCode === '' || values.shortName===''}
                            >
                              Next
                            </button>
                          </div>
                        </>
                      )}
                      {goSteps === 1 && (
                        <>
                          <section>
                            <div className="row">
                              <div className={`form-group mb-3 col-md-6 ${
                                  values.customerId
                                    ? errors.customerId
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}>
                                <label>{t("newJobForm.customerName")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => {
                                    setFieldValue('customerId', value.id);
                                    setFieldValue('customerResponsibleId', '');
                                  }}
                                  options={customers}
                                  getOptionLabel={(o) => o.name}
                                  getOptionValue={(o) => o.id}
                                  required
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                                <div
                                  id="val-customerId-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                >
                                  {errors.customerId && touched.customerId ? errors.customerId : ''}
                                </div>

                                <div
                                  id="val-customerId-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                />
                              </div>
                              {/*Customer Name */}

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.customerReponsibles")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('customerResponsibleId', value.id)}
                                  value={values.customerResponsibleId ? customerResponsibles['' + values.customerId].find((c) => c.id === values.customerResponsibleId) : ''}
                                  options={values.customerId && customerResponsibles['' + values.customerId]
                                    ? customerResponsibles['' + values.customerId]
                                    : []
                                  }
                                  getOptionLabel={(o) => o.fullname}
                                  getOptionValue={(o) => o.id}
                                  required
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: "15px"
                                  }}
                                />
                                <div
                                  id="val-customerResponsibleId-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                >
                                  {errors.customerResponsibleId && touched.customerResponsibleId ? errors.customerResponsibleId : ''}
                                </div>

                                <div
                                  id="val-customerResponsibleId-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                />
                              </div>


                              <div className={`form-group mb-3 col-md-6 ${values.customerIsVisible
                                  ? errors.customerIsVisible
                                    ? "is-invalid"
                                    : "is-valid"
                                  : ""
                                }`}>
                                <label>
                                  {t("newJobForm.customerVisibilty")}
                                </label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('customerVisibilty', value.id)}
                                  options={customerVisibilities}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Customer Is Visible */}
                            </div>
                          </section>
                          <div className="text-end toolbar toolbar-bottom p-2">
                            <button
                              className="btn btn-secondary sw-btn-prev me-1"
                              onClick={() => setGoSteps(0)}
                            >
                              Prev
                            </button>
                            <button
                              className="btn btn-primary sw-btn-next ms-1"
                              onClick={() => setGoSteps(2)}
                              disabled={values.customerId === null}
                            >
                              Next
                            </button>
                          </div>
                        </>
                      )}
                      {goSteps === 2 && (
                        <>
                          <section>
                            <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.jobType")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('jobType', value.id)}
                                  options={jobTypes}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.isRemote")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('isRemote', value.value)}
                                  options={[
                                    { value: true, label: "Evet" },
                                    { value: false, label: "Hayır" },
                                  ]}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.country")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => {
                                    setFieldValue('locationCountryId', value.id);
                                    setFieldValue('locationCityId', '');
                                  }}
                                  options={countries}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.city")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('locationCityId', value.id)}
                                  value={values.locationCityId ? cities.find((c) => c.id === values.locationCityId) : ''}
                                  options={values.locationCountryId ? cities.filter((c) => c.countryId === values.locationCountryId) : []}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.gender")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('gender', value.id)}
                                  options={genders}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.minEduLevel")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('minEduLevel', value.id)}
                                  options={educationLevels}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.experienceYear")}</label>
                                <Nouislider
                                  connect
                                  start={[20, 80]}
                                  behaviour="tap"
                                  snap
                                  range={{
                                    min: [0],
                                    "10%": 30,
                                    "20%": 40,
                                    "30%": 50,
                                    "50%": 60,
                                    "60%": 70,
                                    "70%": 80,
                                    "90%": 90,
                                    max: [100],
                                  }}
                                />
                              </div>
                            </div>
                          </section>
                          <div className="text-end toolbar toolbar-bottom p-2">
                            <button
                              className="btn btn-secondary sw-btn-prev me-1"
                              onClick={() => setGoSteps(1)}
                            >
                              Prev
                            </button>
                            <button
                              className="btn btn-primary sw-btn-next ms-1"
                              onClick={() => setGoSteps(3)}
                              disabled={values.jobTypeId === null||values.genderId===null||values.minEducationLevelId===null||values.locationCityId===null}
                            >
                              Next
                            </button>
                          </div>
                        </>
                      )}
                      {goSteps === 3 && (
                        <>
                          <section>
                            <div className="row">
                              <div className="form-group mb-3 col-md-3">
                                <label>{t("newJobForm.salaryType")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('salaryType', value.id)}
                                  options={salaryTypes}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-3">
                                <label>{t("newJobForm.salaryBetween")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>

                              <div className="form-group mb-3 col-md-3">
                                <label>{t("newJobForm.referenceCode")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>

                              <div className="form-group mb-3 col-md-3">
                                <label>{t("newJobForm.salaryBetween")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={setSelectedJobTypeOption}
                                  options={jobTypes}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-4">
                                <label>{t("newJobForm.commissionFee")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                />
                              </div>
                              <div className="form-group mb-3 col-md-2">
                                <label>{t("newJobForm.currencyType")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={setSelectedJobTypeOption}
                                  options={jobTypes}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>

                              <div className="form-group mb-3 col-md-6">
                                <label>
                                  {t("newJobForm.internalRecruiter")}
                                </label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('internalRecruiter', value.id)}
                                  options={internalRecruiters}
                                  getOptionLabel={(o) => o.fullname}
                                  getOptionValue={(o) => o.id}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                            </div>
                          </section>
                          <div className="text-end toolbar toolbar-bottom p-2">
                            <button
                              className="btn btn-secondary sw-btn-prev me-1"
                              onClick={() => setGoSteps(2)}
                            >
                              Prev
                            </button>
                            <button
                              className="btn btn-primary sw-btn-next ms-1"
                              onClick={() => setGoSteps(4)}
                              disabled={values.salaryTypeId === null}
                            >
                              Next
                            </button>
                          </div>
                        </>
                      )}
                      {goSteps === 4 && (
                        <>
                          <section>
                            <div className="row">
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.qualifications")}</label>
                                <Editor
                                  initialValue=""
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist autolink lists link image code charmap print preview anchor",
                                      "searchreplace visualblocks code fullscreen",
                                      "insertdatetime media table paste code help wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | formatselect | code |link | image | bold italic backcolor |  alignleft aligncenter alignright alignjustify | \n" +
                                      "bullist numlist outdent indent | removeformat | help ",
                                    content_style: "body { color: #828282 }",
                                  }}
                                  onEditorChange={handleEditorChange}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.description")}</label>
                                <Editor
                                  initialValue=""
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist autolink lists link image code charmap print preview anchor",
                                      "searchreplace visualblocks code fullscreen",
                                      "insertdatetime media table paste code help wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | formatselect | code |link | image | bold italic backcolor |  alignleft aligncenter alignright alignjustify | \n" +
                                      "bullist numlist outdent indent | removeformat | help ",
                                    content_style: "body { color: #828282 }",
                                  }}
                                  onEditorChange={handleEditorChange}
                                />
                              </div>
                            </div>
                          </section>
                          <div className="text-end toolbar toolbar-bottom p-2">
                            <button
                              className="btn btn-secondary sw-btn-prev me-1"
                              onClick={() => setGoSteps(3)}
                            >
                              Prev
                            </button>
                            <button className="btn btn-primary sw-btn-next ms-1" type="submit">
                              Submit
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withReducer('jobOpeningApp',reducer)(OpenJob);

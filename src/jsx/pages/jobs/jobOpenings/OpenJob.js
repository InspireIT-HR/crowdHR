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
import { Stepper, Step } from "react-form-stepper";
import { Editor } from "@tinymce/tinymce-react";
import { Formik } from "formik";
import * as yup from "yup";
import { addNewJob } from './store/jobOpeningSlice';
import { getJobStatuses, selectJobStatuses } from '../../definitions/jobStatuses/jobStatusSlice';
import { getJobTypes, selectJobTypes } from '../../definitions/jobTypes/jobTypeSlice';
import { getCustomers, selectCustomers } from '../../customers/customers/store/customersSlice';
import { getCountries, selectCountries } from '../../definitions/jobLocations/countriesSlice';
import { getCities, selectCities } from '../../definitions/jobLocations/citiesSlice';
import { getEducationLevels, selectEducationLevels } from '../../definitions/educationLevels/educationLevelSlice';
import { getJobSalaryTypes, selectJobSalaryTypes } from '../../definitions/jobSalaryTypes/jobSalaryTypeSlice'; 
import { getInternalRecruiters, selectInternalRecruiters } from "../../users/users/store/internalRecruitersSlice";
import { getCurrencyTypes, selectCurrencyTypes } from "../../definitions/currencyTypes/currenyTypeSlice";

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
  const currencyTypes=useSelector(selectCurrencyTypes);
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
      id: 0,
      description: 'Gizli',
    },
    {
      id: 1,
      description: 'Açık',
    }
    
  ];

  const yesNoOptions = [
    { id: 0, description: "Hayır" },
    { id: 1, description: "Evet" }
    
  ];

  const schema = yup.object().shape({
    shortName: yup.string().required(t("required")),
    jobDescription: yup.string().required(t("required")),
    genderId: yup.number().required(t("required")),
    minEducationLevelId: yup.number().required(t("required")),
    customerId: yup.number().required(t("required")),
    customerIsVisible: yup.number().required(t("required")),
    jobTypeId: yup.number().required(t("required")),
    locationCountryId: yup.number().required(t("required")),
    locationCityId: yup.number().required(t("required")),
    isRemote: yup.boolean().required(t("required")),
    minExperience: yup.number().required(t("required")),
    statusId: yup.number().required(t("required")),
    minSalary: yup.number().required(t("required")),
    salaryTypeId: yup.number().required(t("required")),
    currencyTypeId: yup.number().required(t("required")), //for salary
    numberOfPositions: yup.number().required(t("required")),
    commissionFee: yup.number().required(t("required")),
    commissionCurrencyTypeId: yup.number().required(t("required")),
    targetDate: yup.date().required(t("required")),
    createUserId: yup.number().required(t("required")),
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
    dispatch(getCurrencyTypes());
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
                                  onChange={(value) => setFieldValue('statusId', value.id)}
                                  options={jobStatuses}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={jobStatuses.find((js) => js.id === values.statusId)}
                                  id="val-statusId"
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
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
                                  onChange={(ev) => setFieldValue('numberOfPositions', ev.target.value)}
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
                                  value={customers.find((c) => c.id === values.customerID)}
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
                              {/*Customer Responsibles */}

                              <div className={`form-group mb-3 col-md-6 ${values.customerIsVisible
                                  ? errors.customerIsVisible
                                    ? "is-invalid"
                                    : "is-valid"
                                  : ""
                                }`}>
                                <label>
                                  {t("newJobForm.customerIsVisible")}
                                </label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('customerIsVisible', value.id)}
                                  options={customerVisibilities}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={customerVisibilities.find((cv) => cv.id === values.customerIsVisible)}
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
                                  onChange={(value) => setFieldValue('jobTypeId', value.id)}
                                  options={jobTypes}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={jobTypes.find((jt) => jt.id === values.jobTypeId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Job Type */}
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.isRemote")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('isRemote', value.id)}
                                  options={yesNoOptions}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={yesNoOptions.find((yno) => yno.id === values.isRemote)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Is Remote */}
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.country")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => {
                                    setFieldValue('locationCountryId', value.id);
                                    setFieldValue('locationCityId', '');
                                  }}
                                  options={countries}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={countries.find((c) => c.id === values.locationCountryId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Country */}
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.city")}</label>
                                <Select
                                  defaultValue={''}
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
                              {/*City */}
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.gender")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('genderId', value.id)}
                                  options={genders}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={genders.find((g) => g.id === values.genderId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Gender */}
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.minEduLevel")}</label>
                                <Select
                                  defaultValue={selectedJobTypeOption}
                                  onChange={(value) => setFieldValue('minEducationLevelId', value.id)}
                                  options={educationLevels}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={educationLevels.find((el) => el.id === values.minEducationLevelId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Min Edu Level */}
                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.minExperience
                                    ? errors.minExperience
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>
                                  {t("newJobForm.minExperienceYear")}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(ev) => setFieldValue('minExperience', ev.target.value)}
                                  onBlur={handleBlur}
                                  value={values.minExperience}
                                  id="val-minExperience"
                                />
                              </div>
                              {/*Min Exp. Year */}
                              <div
                                className={`form-group mb-3 col-md-6 ${
                                  values.maxExperience
                                    ? errors.maxExperience
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>
                                  {t("newJobForm.maxExperienceYear")}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(ev) => setFieldValue('maxExperience', ev.target.value)}
                                  onBlur={handleBlur}
                                  value={values.maxExperience}
                                  id="val-maxExperience"
                                />
                              </div>
                              {/*Max Exp. Year */}
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
                                  onChange={(value) => setFieldValue('salaryTypeId', value.id)}
                                  options={salaryTypes}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={salaryTypes.find((st) => st.id === values.salaryTypeId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Salary Type */}
                              <div
                                className={`form-group mb-3 col-md-3 ${
                                  values.minSalary
                                    ? errors.minSalary
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>
                                  {t("newJobForm.minSalary")}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(ev) => setFieldValue('minSalary', ev.target.value)}
                                  onBlur={handleBlur}
                                  value={values.minSalary}
                                  id="val-minSalary"
                                />
                              </div>
                              {/*Min Salary */}        
                              <div
                                className={`form-group mb-3 col-md-3 ${
                                  values.maxSalary
                                    ? errors.maxSalary
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>
                                  {t("newJobForm.maxSalary")}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(ev) => setFieldValue('maxSalary', ev.target.value)}
                                  onBlur={handleBlur}
                                  value={values.maxSalary}
                                  id="val-maxSalary"
                                />
                              </div>
                              {/*Max Salary */}
                              <div className="form-group mb-3 col-md-3">
                                <label>{t("newJobForm.currencyType")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('currencyTypeId', value.id)}
                                  options={currencyTypes}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={currencyTypes.find((ct) => ct.id === values.currencyTypeId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Salary Currency */}
                              <div
                                className={`form-group mb-3 col-md-4 ${
                                  values.commissionFee
                                    ? errors.commissionFee
                                      ? "is-invalid"
                                      : "is-valid"
                                    : ""
                                }`}
                              >
                                <label>
                                  {t("newJobForm.commissionFee")}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(ev) => setFieldValue('commissionFee', ev.target.value)}
                                  onBlur={handleBlur}
                                  value={values.commissionFee}
                                  id="val-commissionFee"
                                />
                              </div>
                              {/*Commission Fee*/}
                              <div className="form-group mb-3 col-md-2">
                                <label>{t("newJobForm.currencyType")}</label>
                                <Select
                                  defaultValue={''}
                                  onChange={(value) => setFieldValue('commissionCurrencyTypeId', value.id)}
                                  options={currencyTypes}
                                  getOptionLabel={(o) => o.description}
                                  getOptionValue={(o) => o.id}
                                  value={currencyTypes.find((c) => c.id === values.commissionCurrencyTypeId)}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              {/*Commission Currency Type */}
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
                              {/*Internal Recruiter */}
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
                                  onChange={handleChange}
                                  value={values.qualifications}
                                  id="val-qualifications"
                                  name="qualifications"
                                  onBlur={handleBlur}
                                />
                              </div>
                              {/*Qualifications */}
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
                                  onChange={handleChange}
                                  value={values.description}
                                  id="val-description"
                                  name="description"
                                  onBlur={handleBlur}
                                />
                              </div>
                              {/*Description */}
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

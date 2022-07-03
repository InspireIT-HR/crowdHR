import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from "react";
import PageTItle from "../../../layouts/PageTitle";
import { ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import axios from "../../../../services/axios";
import Nouislider from "nouislider-react";
import { Stepper, Step } from "react-form-stepper";
import { Editor } from "@tinymce/tinymce-react";
import { Formik } from "formik";
import * as yup from "yup";
const defaultValues = {
  referenceCode: "",
};
const schema = yup.object().shape({
  referenceCode: yup
    .string()
    .min(3, "Description must have more than 3 characters")
    .required("Please enter a reference code"),
});
const OpenJob = () => {
  const [initialValues, setInitialValues] = useState({
    referenceCode: "",
  });
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedJobTypeOption, setSelectedJobTypeOption] = useState(null);
  const [goSteps, setGoSteps] = useState(0);

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

  const handleOnSubmit = (data) => {
    // if (modal.type === 'edit') {
    //   if (props.update) {
    //     props.update(data);
    //   }
    // }
    // if (modal.type === 'new') {
    //   if (props.add) {
    //     props.add(data);
    //   }
    // }
  };

  const handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  useEffect(() => {
    axios
      .get("/JobStatus")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((err) => {});
    axios
      .get("/JobTypes")
      .then((response) => {
        setTypes(response.data);
      })
      .catch((err) => {});
  }, []);
  const options = [];
  statuses.forEach((item) => {
    options.push({ value: item.description, label: item.description });
  });
  const jobTypes = [];
  types.forEach((item) => {
    jobTypes.push({ value: item.description, label: item.description });
  });

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
                  label={false}
                >
                  <Step className="nav-link" onClick={() => setGoSteps(0)} />
                  <Step className="nav-link" onClick={() => setGoSteps(1)} />
                  <Step className="nav-link" onClick={() => setGoSteps(2)} />
                  <Step className="nav-link" onClick={() => setGoSteps(3)} />
                  <Step className="nav-link" onClick={() => setGoSteps(4)} />
                </Stepper>
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
                                  id="val-description-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                >
                                  {errors.referenceCode && errors.referenceCode}
                                </div>

                                <div
                                  id="val-description-error"
                                  className="invalid-feedback animated fadeInUp"
                                  style={{ display: "block" }}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.shortName")}</label>
                                <input type="text" className="form-control" />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.targetDate")}</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Password"
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.status")}</label>
                                <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={options}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>
                                  {t("newJobForm.numberOfPosition")}
                                </label>
                                <input type="number" className="form-control" />
                              </div>
                            </div>
                          </section>
                          <div className="text-end toolbar toolbar-bottom p-2">
                            <button
                              className="btn btn-primary sw-btn-next"
                              onClick={() => setGoSteps(1)}
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
                              <div className="form-group mb-3 col-md-6">
                                <label>
                                  {t("newJobForm.customerVisibilty")}
                                </label>
                                <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={[
                                    { value: "yes", label: "Açık" },
                                    { value: "no", label: "Gizli" },
                                  ]}
                                  style={{
                                    lineHeight: "40px",
                                    color: "#7e7e7e",
                                    paddingLeft: " 15px",
                                  }}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>{t("newJobForm.customerName")}</label>
                                <input type="text" className="form-control" />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label>
                                  {t("newJobForm.customerReponsibles")}
                                </label>
                                <input type="text" className="form-control" />
                              </div>
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
                                <label>{t("newJobForm.isRemote")}</label>
                                <Select
                                  defaultValue={selectedOption}
                                  onChange={setSelectedOption}
                                  options={[
                                    { value: "yes", label: "Evet" },
                                    { value: "no", label: "Hayır" },
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
                                <label>{t("newJobForm.city")}</label>
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
                                <label>{t("newJobForm.gender")}</label>
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
                                <label>{t("newJobForm.minEduLevel")}</label>
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
                                  onChange={setSelectedJobTypeOption}
                                  options={jobTypes}
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
                            <button className="btn btn-primary sw-btn-next ms-1">
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

export default OpenJob;

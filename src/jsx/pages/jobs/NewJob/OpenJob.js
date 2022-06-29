import React, { useEffect, useState, Fragment } from "react";
import PageTItle from "../../../layouts/PageTitle";
import { ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import axios from "../../../../services/axios";
import Nouislider from "nouislider-react";

const OpenJob = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedJobTypeOption, setSelectedJobTypeOption] = useState(null);

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);

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
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{t("newJob")}</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.referenceCode")}</label>
                      <input type="text" className="form-control" />
                    </div>{" "}
                    {/* reference code */}
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.shortName")}</label>
                      <input type="text" className="form-control" />
                    </div>{" "}
                    {/* short name */}
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.targetDate")}</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>{" "}
                    {/* target date */}
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
                    </div>{" "}
                    {/* status */}
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.numberOfPosition")}</label>
                      <input type="number" className="form-control" />
                    </div>{" "}
                    {/* number of position */}
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.customerVisibilty")}</label>
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
                    </div>{" "}
                    {/* customer visibility */}
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.customerName")}</label>
                      <input type="text" className="form-control" />
                    </div>{" "}
                    {/* customer name */}
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.customerReponsibles")}</label>
                      <input type="text" className="form-control" />
                    </div>{" "}
                    {/* customer responsibles */}
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
                    </div>{" "}
                    {/* job type */}
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
                    </div>{" "}
                    {/* country */}
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
                    </div>{" "}
                    {/* city */}
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
                    </div>{" "}
                    {/* gender */}
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
                    </div>{" "}
                    {/* min edu level */}
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
                    </div>{/* experience beetween */}
                    <div className="form-group mb-3 col-md-6">
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
                    </div>{/* salary type */}
                    <div className="form-group mb-3 col-md-6">
                      <div className="form-check custom-checkbox mb-3 checkbox-warning">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="form-check-input"
                          id="customCheckBox4"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customCheckBox4"
                        >
                          {t("newJobForm.isRemote")}
                        </label>
                      </div>
                    </div>{/* is remote */}
                  </div>

                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Check me out</label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OpenJob;

import React,{useEffect,useState,Fragment} from 'react';
import PageTItle from "../../../layouts/PageTitle";
import { ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const OpenJob=()=>{
    const { t } = useTranslation();
    return(
        <Fragment>
            <PageTItle motherMenu={t("sidebar.jobs.job")} activeMenu={t("sidebar.jobs.addJob")} />
            <div className='row'>
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
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label>{t("newJobForm.shortName")}</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label>City</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <label>State</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label>Zip</label>
                      <input type="text" className="form-control" />
                    </div>
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
    )
}

export default OpenJob;
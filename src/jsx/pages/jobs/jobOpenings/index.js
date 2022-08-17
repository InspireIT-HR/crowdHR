import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withReducer from "../../../../store/withReducer";
import reducer from "./store";
import { getJobOpenings, resetFilters, selectJobOpenings, setFilterField } from "./store/jobOpeningSlice";
import ReferModal from "./ReferModal";
import ApplyModal from "./ApplyModal";
import Select from 'react-select';
import DefaultTable from "../../../components/table/DefaultTable";

const JobOpenings = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobOpenings);
  const [referModal, setReferModal] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [selectedJobName, setSelectedJobName] = useState('');
  const filters = useSelector(({ jobOpeningApp }) => jobOpeningApp.jobOpenings.filters);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(getJobOpenings());
  }, [dispatch]);

  useEffect(() => {
    const newData = [];
    data.forEach((d) => {
      if (filters.jobTypeDesc.selectedValue) {
        if (d.jobType.id !== filters.jobTypeDesc.selectedValue) {
          return;
        }
      }

      if (filters.jobStatusDesc.selectedValue) {
        if (d.status.id !== filters.jobStatusDesc.selectedValue) {
          return;
        }
      }
      
      if (filters.jobInternalRecruiterDesc.selectedValue) {
        if (!d.jobOpeningInternalRecruiters.find((jir) => jir.internalRecruiter.id === filters.jobInternalRecruiterDesc.selectedValue)) {
          return;
        }
      }

      newData.push(d);
    });

    setFilteredData(newData);
  }, [data, filters.jobInternalRecruiterDesc.selectedValue, filters.jobStatusDesc.selectedValue, filters.jobTypeDesc.selectedValue]);

  const columns = useMemo(
    () => [
      {
        Header: "Customer",
        accessor: "customer.logoPath",
        Cell: (props) => {
          return (
            <img
              width="70"
              height="30"
              src={`https://77.79.108.34:63748/CustomerLogos/${props.value}`}
              alt="company_logo"
            />
          );
        },
      },
      {
        Header: "Job Name",
        accessor: "shortName",
        sortable: true,
      },
      {
        Header: 'Code',
        accessor: 'referenceCode',
        sortable: true,
      },
      {
        Header: "Customer",
        accessor: "customer.name",
        sortable: true,
      },
      {
        Header: "Job Type",
        accessor: "jobType.description",
        sortable: true,
      },
      {
        Header: 'Status',
        accessor: 'status.description',
        sortable: true,
      },
      {
        Header: "Location",
        accessor: "locationCity.description",
        sortable: true,
        Cell: (props) => {
          return (
            <span>
              {props.row.original.locationCountry.description}/{props.row.original.locationCity.description}
            </span>
          )
        }
      },
      {
        Header: 'Referral Fee',
        accessor: 'commissionFee',
        sortable: true,
        Cell: (props) => (
          <span>
            {props.row.original.commissionFee} {props.row.original.currencyType.description}
          </span>
        )
      },
      {
        Header: "Posted Date",
        accessor: "createDate",
        sortable: true,
        Cell: (props) => {
          return new Date(props.value).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });
        },
      },
      {
        Header: "Actions",
        accessor: "",
        sortable: true,
        Cell: (props) => {
          return (
            <>
              <button
                className="btn btn-primary shadow btn-xs sharp me-1"
                // onClick={() =>
                //   dispatch(openEditCandidateStatusModal(props.row.original))
                // }
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn btn-danger shadow btn-xs sharp"
                // onClick={() => {
                //   setConfirmModalData(props.row.original.id);
                //   setShowConfirmModal(true);
                // }}
              >
                <i className="bi bi-eye-slash"></i>
              </button>
            </>
          );
        },
      },
      {
        Header: ".",
        accessor: "",
        sortable: true,
        Cell: (props) => {
          return (
            <>
              <button
                className="btn btn-outline-success btn-sm me-1"
                onClick={() => {
                  setApplyModal(true);
                  setSelectedJobName(`${props.row.original.shortName} / ${props.row.original.customer.name}`)
                }}
              >
                Apply
              </button>
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => {
                  setReferModal(true);
                  setSelectedJobName(`${props.row.original.shortName} / ${props.row.original.customer.name}`)
                }}
              >
                Refer
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  const customFilter = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
      <div className="mx-4" style={{ minWidth: '200px' }}>
        <label htmlFor="filter-role">Job Type:</label>
        <Select
          defaultValue={''}
          onChange={(value) => dispatch(setFilterField({ field: 'jobTypeDesc', value: value.id }))}
          options={filters.jobTypeDesc.values}
          getOptionLabel={(o) => o.displayValue}
          getOptionValue={(o) => o.id}
          value={filters.jobTypeDesc.values.find((r) => r.id === filters.jobTypeDesc.selectedValue)}
        />
      </div>
      <div className="mx-4" style={{ minWidth: '200px' }}>
        <label htmlFor="filter-role">Job Status:</label>
        <Select
          defaultValue={''}
          onChange={(value) => dispatch(setFilterField({ field: 'jobStatusDesc', value: value.id }))}
          options={filters.jobStatusDesc.values}
          getOptionLabel={(o) => o.displayValue}
          getOptionValue={(o) => o.id}
          value={filters.jobStatusDesc.values.find((r) => r.id === filters.jobStatusDesc.selectedValue)}
        />
      </div>
      <div className="mx-4" style={{ minWidth: '200px' }}>
        <label htmlFor="filter-role">Internal Recruiter:</label>
        <Select
          defaultValue={''}
          onChange={(value) => dispatch(setFilterField({ field: 'jobInternalRecruiterDesc', value: value.id }))}
          options={filters.jobInternalRecruiterDesc.values}
          getOptionLabel={(o) => o.displayValue}
          getOptionValue={(o) => o.id}
          value={filters.jobInternalRecruiterDesc.values.find((r) => r.id === filters.jobInternalRecruiterDesc.selectedValue)}
        />
      </div>
    </div>
  )

  const rightButtons = (
    <Link to={"/jobs/open-job"} className="btn add_button  mr-2">
      <i className="bi bi-plus-circle add_icon"></i>
    </Link>
  );

  return (
    <Fragment>
      <ReferModal open={referModal} jobName={selectedJobName} closeModal={() => setReferModal(false)}/>
      <ApplyModal open={applyModal} jobName={selectedJobName} closeModal={() => setApplyModal(false)} />

      <DefaultTable
        data={filteredData}
        columns={columns}
        motherMenu="sidebar.jobs.job"
        activeMenu="sidebar.jobs.jobOpenings"
        usePageTitle
        useFilter
        customFilter={customFilter}
        rightButtons={rightButtons}
      />
    </Fragment>
  );
};

export default withReducer("jobOpeningApp", reducer)(JobOpenings);

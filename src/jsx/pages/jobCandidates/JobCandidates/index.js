import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AccordionTable from "../../../components/table/AccordionTable";
import JobCandidatesTable from "./jobCandidatesTable";
import { getJobOpenings, resetFilters, selectJobOpenings, setFilterField } from "../../jobs/jobOpenings/store/jobOpeningSlice";
import { Link } from "react-router-dom";
import Select from 'react-select';

const JobCandidates = (props) => {
    const dispatch = useDispatch();
  const data = useSelector(selectJobOpenings);
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
        Header: "Company Logo",
        accessor: "customer.logoPath",
        sortable: false,
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
        Header: "Reference Code",
        accessor: "referenceCode",
        sortable: true,
      },
      {
        Header: 'Company Name',
        accessor: 'customer.name',
        sortable: true,
      },
      {
        Header: "Job Type",
        accessor: "jobType.description",
        sortable: true,
      },
      {
        Header: 'Country',
        accessor: 'locationCountry.description',
        sortable: true,
      },
      {
        Header: 'City',
        accessor: 'locationCity.description',
        sortable: true,
      },
      {
        Header: 'Action',
        accessor: '',
        sortable: false,
        Cell: (props) => (
          <>
            <button
              className="btn btn-primary shadow sharp me-1"
            >
              Add Existing Candidate
            </button>
            <button
              className="btn btn-primary shadow sharp me-1"
            >
              Add Candidate
            </button>
          </>
        )
      }
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
    <AccordionTable
      data={filteredData}
      columns={columns}
      motherMenu="sidebar.candidates.cand"
      activeMenu="sidebar.candidates.jobCandidates"
      usePageTitle
      useFilter
      customFilter={customFilter}
      rightButtons={rightButtons}
      accordionBody={JobCandidatesTable}
    />
  );
};

export default JobCandidates;

import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DefaultTable from '../../../components/table/DefaultTable';
import {getCompanies, selectCompanies} from './companySlice'
import AccordionTable from "../../../components/table/AccordionTable";
import JobCandidatesTable from "./jobCandidatesTable";

const JobCandidates = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(selectCompanies);

    useEffect(() => {
        dispatch(getCompanies());
      }, [dispatch]);
      

      const columns = useMemo(
        () => [
          {
            Header: "Logo",
            accessor: "logoPath",
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
            Header: "Name",
            accessor: "name",
            sortable: true,
          },
          {
            Header: "Industry",
            accessor: "industry.description",
            sortable: true,
          },
          {
            Header: "Website",
            accessor: "website",
            sortable: true,
          },
          {
            Header: "Primary Internal Recruiter",
            accessor: "primaryInternalRecruiter.fullname",
            sortable: true,
          },
        ],
        []
      );
    
      return (
        <AccordionTable
          data={data}
          columns={columns}
          motherMenu="sidebar.candidates.cand"
          activeMenu="sidebar.candidates.jobCandidates"
          usePageTitle
          useFilter
          accordionBody={JobCandidatesTable}
        />
      );
};

export default JobCandidates;

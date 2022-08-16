import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { camelize } from "../../../components/PluginsMenu/Nestable/utils";
import DefaultTable from "../../../components/table/DefaultTable";
// import { selectCandidateStages } from "../../definitions/candidates/candidateStageSlice";
import { getApplicationHistory } from "./store/jobOpeningSlice";

const ApplicationHistoryTable = (props) => {
  const dispatch = useDispatch();
  // const stages = useSelector(selectCandidateStages);
  const applicationHistories = useSelector(({ jobOpeningApp }) => jobOpeningApp.jobOpenings.applicationHistory);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (applicationHistories[props.row.id]) {
      setData(applicationHistories[props.row.id]);
    }
  }, [applicationHistories, props.row.id]);

  useEffect(() => {
    if (props.row && props.row.id && props.open) {
      dispatch(getApplicationHistory(props.row.id));
    }
    
  }, [dispatch, props]);

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'user.fullname',
      sortable: true,
    },
    {
      Header: 'Screening',
      accessor: 'submissionProcess',
      sortable: true,
      Cell: ({ value }) => {
        let info = value;
        let date = '';
        if (value && value.indexOf('\r') > -1) {
          [info, date] = value.split('\r');
        }
        return (
          <>
            <span>{info}</span><br/>
            <span>{date}</span>
          </>
        )
      }
    },
    {
      Header: 'Internal Interviews',
      accessor: 'internalInterviewProcess',
      sortable: true,
      Cell: ({ value }) => {
        let info = value;
        let date = '';
        if (value && value.indexOf('\r') > -1) {
          [info, date] = value.split('\r');
        }
        return (
          <>
            <span>{info}</span><br/>
            <span>{date}</span>
          </>
        )
      }
    },
    {
      Header: 'Submission to Customer',
      accessor: 'submissionToCustomerProcess',
      sortable: true,
      Cell: ({ value }) => {
        let info = value;
        let date = '';
        if (value && value.indexOf('\r') > -1) {
          [info, date] = value.split('\r');
        }
        return (
          <>
            <span>{info}</span><br/>
            <span>{date}</span>
          </>
        )
      }
    },
    {
      Header: 'Customer Interviews',
      accessor: 'customerInterviewProcess',
      sortable: true,
      Cell: ({ value }) => {
        let info = value;
        let date = '';
        if (value && value.indexOf('\r') > -1) {
          [info, date] = value.split('\r');
        }
        return (
          <>
            <span>{info}</span><br/>
            <span>{date}</span>
          </>
        )
      }
    },
    {
      Header: 'Offer',
      accessor: 'offeredProcess',
      sortable: true,
      Cell: ({ value }) => {
        let info = value;
        let date = '';
        if (value && value.indexOf('\r') > -1) {
          [info, date] = value.split('\r');
        }
        return (
          <>
            <span>{info}</span><br/>
            <span>{date}</span>
          </>
        )
      }
    },
    {
      Header: 'Hire',
      accessor: 'hiredProcess',
      sortable: true,
      Cell: ({ value }) => {
        let info = value;
        let date = '';
        if (value && value.indexOf('\r') > -1) {
          [info, date] = value.split('\r');
        }
        return (
          <>
            <span>{info}</span><br/>
            <span>{date}</span>
          </>
        )
      }
    },
    {
      Header: 'Created At',
      accessor: '',
      sortable: true,
      Cell: ({ value }) => {
        return (
          <span>

          </span>
        )
      }
    },
    // ...stages.map((stage) => {
    //   return {
    //     Header: stage.description,
    //     accessor: '',
    //     sortable: false,
    //     Cell: (props) => {
    //       return (
    //         <span>
    //           {props.row.original[stage.id]}
    //           {props.row.original[camelize(stage.description)]}
    //         </span>
    //       )
    //     }
    //   }
    // })
  ], []);

  return (
    <Fragment>
      <DefaultTable
        data={data}
        columns={columns}
      />
    </Fragment>
  )
}

export default ApplicationHistoryTable;

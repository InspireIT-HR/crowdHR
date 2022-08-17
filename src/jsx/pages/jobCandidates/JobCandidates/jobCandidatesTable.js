import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { camelize } from "../../../components/PluginsMenu/Nestable/utils";
import DefaultTable from "../../../components/table/DefaultTable";
import { getApplicationHistory } from '../../jobs/jobOpenings/store/jobOpeningSlice';
// import { selectCandidateStages } from "../../definitions/candidates/candidateStageSlice";

const JobCandidatesTable = (props) => {
  const dispatch = useDispatch();
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
            <span>{info}</span><br />
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
            <span>{info}</span><br />
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
            <span>{info}</span><br />
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
            <span>{info}</span><br />
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
            <span>{info}</span><br />
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
            <span>{info}</span><br />
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

  // const rightButtons = (
  //   <button className="btn add_button" >
  //     <i className="bi bi-plus-circle add_icon"></i>
  //   </button>
  // )

  return (
    <div>
      <DefaultTable
        data={data}
        columns={columns}
      />
    </div>
  );
};

export default JobCandidatesTable;

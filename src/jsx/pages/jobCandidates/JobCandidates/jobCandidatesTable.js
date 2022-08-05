import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DefaultTable from '../../../components/table/DefaultTable';
import {getJobCandidates, selectJobCandidates} from './jobCandidateSlice'

const JobCandidatesTable = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(selectJobCandidates);

    useEffect(() => {
        if(props.row.id){
            dispatch(getJobCandidates(props.row.id));
        }

      }, [props.row.id,dispatch]);


      const columns = useMemo(() => [
        {
          Header: 'Id',
          accessor: 'id',
          sortable: true,
        },
        {
          Header: 'Description',
          accessor: 'description',
          sortable: true,
        },
        {
          Header: 'Actions',
          accessor: '',
          sortable: false,
          Cell: (props) => {
            return (
              <>
                <button
                  className="btn btn-primary shadow btn-xs sharp me-1"
                //   onClick={() => dispatch(openEditAttachmentTypeModal(props.row.original))}
                >
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button
                  className="btn btn-danger shadow btn-xs sharp"
                //   onClick={() => {
                //     setConfirmModalData(props.row.original.id);
                //     setShowConfirmModal(true);
                //   }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </>
            )
          }
        }
      ], [dispatch]);
      const rightButtons = (
        <button className="btn add_button" >
          <i className="bi bi-plus-circle add_icon"></i>
        </button>
      )
  return (
  <div>
        <DefaultTable
        data={data}
        columns={columns}
        useFilter
        rightButtons={rightButtons}
      />
  </div>
  );
};

export default JobCandidatesTable;

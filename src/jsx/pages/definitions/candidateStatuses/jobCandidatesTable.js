import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// import EditIconSvg from '../../../../svg/edit-icon';
// import TrashIconSvg from '../../../../svg/trash-icon';

import DefaultTable from '../../../components/table/DefaultTable';

const JobCandidatesTable = (props) => {
  const [jobCandidates, setJobCandidates] = useState([]);

  useEffect(() => {
    if (props.row) {
      setJobCandidates(props.row.candidateStatuses);
    }
  }, [props.row]);
  
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
    // {
    //   Header: 'Actions',
    //   accessor: '',
    //   sortable: false,
    //   Cell: (props) => {
    //     return (
    //       <>
    //       {/* props.row.original */}
    //         <button className="btn btn-secondary btn-icon light mr-2 p-2">
    //           <EditIconSvg />
    //         </button>
    //         <button className="btn btn-danger btn-icon light mr-2 p-2">
    //           <TrashIconSvg />
    //         </button>
    //       </>
    //     )
    //   }
    // }
  ], []);

  return <DefaultTable
    data={jobCandidates}
    columns={columns}
  />
}

export default JobCandidatesTable;

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// import EditIconSvg from '../../../../svg/edit-icon';
// import TrashIconSvg from '../../../../svg/trash-icon';

import DefaultTable from '../../../components/table/DefaultTable';

const JobCandidatesTable = (props) => {
  const [jobCandidates, setJobCandidates] = useState([]);
  const allJobCandidates = useSelector(({ candidateStatusApp }) => candidateStatusApp.candidateStatuses.jobCandidates);

  useEffect(() => {
    if (props.row) {
      if (allJobCandidates[props.row.id] && allJobCandidates[props.row.id].length) {
        setJobCandidates(allJobCandidates[props.row.id]);
      }
    }
  }, [allJobCandidates, props.row]);
  
  const columns = useMemo(() => [
    {
      Header: 'User',
      accessor: 'user.fullname',
      sortable: true,
    },
    {
      Header: 'Additional Info',
      accessor: 'additionalInfo',
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

import { useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getEducationLevels } from '../../../../store/actions/definitions/EducationLevelActions';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import DefaultTable from '../../../components/table/DefaultTable';

const EducationLevels = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEducationLevels());
  }, [dispatch]);

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
            <button className="btn btn-secondary btn-icon light mr-2 p-2">
              <EditIconSvg />
            </button>
            <button className="btn btn-danger btn-icon light mr-2 p-2">
              <TrashIconSvg />
            </button>
          </>
        )
      }
    }
  ], []);


  const data = useMemo(() => props.data, [props.data]);

  return <DefaultTable
    data={data}
    columns={columns}
    motherMenu="sidebar.definitions.def"
    activeMenu="sidebar.definitions.educationLevels"
  />
}

const mapStateToProps = (state) => {
  return {
    data: state.educationLevel.items
  }
}

export default connect(mapStateToProps)(EducationLevels);
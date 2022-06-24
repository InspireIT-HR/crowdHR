import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import DefaultTable from '../../../components/table/DefaultTable';
import { getUsers, selectUsers } from './store/usersSlice';

const Users = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'firstname',
      sortable: true,
    },
    {
      Header: 'Last Name',
      accessor: 'lastname',
      sortable: true,
    },
    {
      Header: 'Email',
      accessor: 'email',
      sortable: true,
    },
    {
      Header: 'Linkedin Page',
      accessor: 'linkedinPage',
      sortable: true,
    },
    {
      Header: 'Role',
      accessor: 'role.description',
      sortable: true,
    },
    {
      Header: 'Actions',
      accessor: '',
      sortable: true,
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

  return <DefaultTable
    data={data}
    columns={columns}
    motherMenu="sidebar.users.user"
    activeMenu="sidebar.users.userList"
    usePageTitle
    useFilter
  />
}

export default withReducer('userApp', reducer)(Users);

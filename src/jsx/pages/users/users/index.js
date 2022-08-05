import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import DefaultTable from '../../../components/table/DefaultTable';
import { getUsers, selectUsers, setFilterField } from './store/usersSlice';
import Select from 'react-select';

const Users = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectUsers);
  const filters = useSelector(({ userApp }) => userApp.users.filters);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const newData = [];
    data.forEach((d) => {
      if (filters.name.selectedValue) {
        if (d.fullname.toLowerCase().indexOf(filters.name.selectedValue) === -1) {
          return;
        }
      }

      if (filters.role.selectedValue) {
        if (d.role.description !== filters.role.selectedValue) {
          return;
        }
      }

      newData.push(d);
    });

    setFilteredData(newData);
  }, [data, filters.name.selectedValue, filters.role.selectedValue]);

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
            <button
              className="btn btn-primary shadow btn-xs sharp me-1"
              // onClick={() => dispatch(openEditAttachmentTypeModal(props.row.original))}
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
              <i className="fa fa-trash"></i>
            </button>
          </>
        )
      }
    }
  ], []);

  const customFilter = (
    <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 
      }}
    >
      <div>
        <label htmlFor="filter-name">Name:</label>
        <input
          id="filter-name"
          className="input-search form-control"
          onChange={(ev) => dispatch(setFilterField({ field: 'name', value: ev.target.value || '' }))}
          value={filters.name.selectedValue}
        />
      </div>
      <div className="mx-4" style={{ minWidth: '200px' }}>
        <label htmlFor="filter-role">Role:</label>
        <Select
          defaultValue={''}
          onChange={(value) => dispatch(setFilterField({ field: 'role', value: value.description }))}
          options={filters.role.values}
          getOptionLabel={(o) => o.displayValue}
          getOptionValue={(o) => o.description}
          value={filters.role.values.find((r) => r.id === filters.role.selectedValue)}
        />
      </div>
    </div>
  )

  return <DefaultTable
    data={filteredData}
    columns={columns}
    motherMenu="sidebar.users.user"
    activeMenu="sidebar.users.userList"
    usePageTitle
    customFilter={customFilter}
  />
}

export default withReducer('userApp', reducer)(Users);

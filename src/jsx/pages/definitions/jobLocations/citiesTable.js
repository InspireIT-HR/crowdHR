import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import EditIconSvg from '../../../../svg/edit-icon';
import TrashIconSvg from '../../../../svg/trash-icon';
import { selectCities } from './store/citiesSlice';
import DefaultTable from '../../../components/table/DefaultTable';

const CitiesTable = (props) => {
  const allCities = useSelector(selectCities);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (props.row.id) {
      setFilteredCities(allCities.filter((c) => c.countryId === props.row.id));
    }
  }, [allCities, props.row.id]);

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
           <button className="btn btn-primary shadow btn-xs sharp me-1">
            <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-danger shadow btn-xs sharp">
            <i className="fa fa-trash"></i>
            </button>
          </>
        )
      }
    }
  ], []);

  return <DefaultTable
    data={filteredCities}
    columns={columns}
  />
}

export default CitiesTable;

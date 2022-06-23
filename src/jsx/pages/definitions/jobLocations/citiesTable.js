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
    if (props.country.id) {
      setFilteredCities(allCities.filter((c) => c.countryId === props.country.id));
    }
  }, [allCities, props.country.id]);

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

  return <DefaultTable
    data={filteredCities}
    columns={columns}
  />
}

export default CitiesTable;

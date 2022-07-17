import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  addCityRequest, 
  closeCityModal, 
  openEditCityModal, 
  openNewCityModal, 
  removeCityRequest, 
  selectCities, 
  updateCityRequest 
} from './store/citiesSlice';
import DefaultTable from '../../../components/table/DefaultTable';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';
import ConfirmModal from '../../../components/ConfirmModal';

const CitiesTable = (props) => {
  const dispatch = useDispatch();
  const allCities = useSelector(selectCities);
  const [filteredCities, setFilteredCities] = useState([]);
  const modal = useSelector(({ jobLocationApp }) => jobLocationApp.cities.modal);
  const isSubmitting = useSelector(({ jobLocationApp }) => jobLocationApp.cities.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

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
            <button 
              className="btn btn-primary shadow btn-xs sharp me-1"
              onClick={() => dispatch(openEditCityModal(props.row.original))}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button 
              className="btn btn-danger shadow btn-xs sharp"
              onClick={() => {
                setConfirmModalData(props.row.original.id);
                setShowConfirmModal(true);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        )
      }
    }
  ], [dispatch]);

  const handleRemove = (data) => {
    dispatch(removeCityRequest(data));
  }

  const rightButtons = (
    <button className="btn add_button" onClick={() => dispatch(openNewCityModal(props.row.id))}>
      <i class="bi bi-plus-circle add_icon"></i>
    </button>
  )

  return (
    <Fragment>
      <DefaultTable
        data={filteredCities}
        columns={columns}
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="City"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addCityRequest(data))}
        update={(data) => dispatch(updateCityRequest(data))}
        closeModal={() => dispatch(closeCityModal())}
      />
      <ConfirmModal
        title="Deleting City"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default CitiesTable;

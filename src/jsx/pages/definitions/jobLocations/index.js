import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addCountryRequest,
  closeCountryModal,
  getCountries,
  openEditCountryModal,
  openNewCountryModal,
  removeCountryRequest,
  selectCountries,
  updateCountryRequest,
} from './countriesSlice';
import { addCityRequest, closeCityModal, getCities, openNewCityModal, updateCityRequest } from './citiesSlice';
import CitiesTable from './citiesTable';
import AccordionTable from '../../../components/table/AccordionTable';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';
import ConfirmModal from '../../../components/ConfirmModal';

const JobLocations = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCountries);
  const modal = useSelector(({ definitions }) => definitions.jobLocation.country.modal);
  const modalCity = useSelector(({ definitions }) => definitions.jobLocation.city.modal);
  const isSubmitting = useSelector(({ definitions }) => definitions.jobLocation.country.isSubmitting);
  const isSubmittingCity = useSelector(({ definitions }) => definitions.jobLocation.city.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCities());
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
            <button
              className="btn btn-primary shadow btn-xs sharp me-1"
              onClick={() => dispatch(openEditCountryModal(props.row.original))}
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
    dispatch(removeCountryRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewCountryModal());
  }

  const rightButtons = (
    <button className="btn add_button" onClick={handleCreate}>
      <i className="bi bi-plus-circle add_icon"></i>
    </button>
  );

  return (
    <Fragment>
      <AccordionTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.jobLocations"
        usePageTitle
        useFilter
        accordionBody={CitiesTable}
        rightButtons={rightButtons}
        handleAdd={(data) => dispatch(openNewCityModal(data))}
      />
      <OnlyDescriptionModal
        header="Country"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addCountryRequest(data))}
        update={(data) => dispatch(updateCountryRequest(data))}
        closeModal={() => dispatch(closeCountryModal())}
      />
      <OnlyDescriptionModal
        header="City"
        modal={modalCity}
        isSubmitting={isSubmittingCity}
        add={(data) => dispatch(addCityRequest(data))}
        update={(data) => dispatch(updateCityRequest(data))}
        closeModal={() => dispatch(closeCityModal())}
      />
      <ConfirmModal
        title="Deleting Country"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default JobLocations;

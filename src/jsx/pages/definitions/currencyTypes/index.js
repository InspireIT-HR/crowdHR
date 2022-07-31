import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultTable from '../../../components/table/DefaultTable';
import { 
  addCurrencyTypeRequest, 
  closeCurrencyTypeModal, 
  getCurrencyTypes, 
  openEditCurrencyTypeModal, 
  openNewCurrencyTypeModal, 
  removeCurrencyTypeRequest, 
  selectCurrencyTypes, 
  updateCurrencyTypeRequest 
} from './currenyTypeSlice';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';
import ConfirmModal from '../../../components/ConfirmModal';

const CurrencyTypes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCurrencyTypes);
  const modal = useSelector(({ definitions }) => definitions.currencyType.modal);
  const isSubmitting = useSelector(({ definitions }) => definitions.currencyType.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getCurrencyTypes());
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
              onClick={() => dispatch(openEditCurrencyTypeModal(props.row.original))}
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
    dispatch(removeCurrencyTypeRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewCurrencyTypeModal());
  }

  const rightButtons = (
    <button className="btn add_button" onClick={handleCreate}>
      <i className="bi bi-plus-circle add_icon"></i>
    </button>
  )

  return (
    <Fragment>
      <DefaultTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.currencyTypes"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Currency Type"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addCurrencyTypeRequest(data))}
        update={(data) => dispatch(updateCurrencyTypeRequest(data))}
        closeModal={() => dispatch(closeCurrencyTypeModal())}
      />
      <ConfirmModal
        title="Deleting Currency Type"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default CurrencyTypes;

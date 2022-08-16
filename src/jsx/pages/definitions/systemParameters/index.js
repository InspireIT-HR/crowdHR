import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../../../components/ConfirmModal';

import DefaultTable from '../../../components/table/DefaultTable';
import SystemParameterModal from './systemParameterModal';
import { addSystemParameterRequest, closeSystemParameterModal, getSystemParameters, openEditSystemParameterModal, openNewSystemParameterModal, removeSystemParameterRequest, selectSystemParameters, updateSystemParameterRequest } from './systemParametersSlice';

const SystemParameters = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectSystemParameters);
  const modal = useSelector(({ definitions }) => definitions.systemParameter.modal);
  const isSubmitting = useSelector(({ definitions }) => definitions.systemParameter.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getSystemParameters());
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
      Header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      Header: 'Value',
      accessor: 'value',
      sortable: true,
    },
    {
      Header: 'Actions',
      accessor: '',
      sortable: false,
      Cell: (props) => (
        <>
          <button
            className="btn btn-primary shadow btn-xs sharp me-1"
            onClick={() => dispatch(openEditSystemParameterModal(props.row.original))}
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
  ], [dispatch]);

  const handleRemove = (data) => {
    dispatch(removeSystemParameterRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewSystemParameterModal());
  }

  const rightButtons = (
    <button className="btn add_button" onClick={handleCreate}>
      <i className="bi bi-plus-circle add_icon"></i>
    </button>
  );

  return (
    <Fragment>
      <DefaultTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.systemParameters"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
      <SystemParameterModal
        header="System Parameter"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addSystemParameterRequest(data))}
        update={(data) => dispatch(updateSystemParameterRequest(data))}
        closeModal={() => dispatch(closeSystemParameterModal())}
      />
      <ConfirmModal
        title="Deleting System Parameter"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default SystemParameters;

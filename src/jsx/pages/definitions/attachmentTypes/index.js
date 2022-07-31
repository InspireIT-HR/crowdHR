import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultTable from '../../../components/table/DefaultTable';
import { 
  addAttachmentTypeRequest, 
  closeAttachmentTypeModal, 
  getAttachmentTypes, 
  openEditAttachmentTypeModal, 
  openNewAttachmentTypeModal, 
  removeAttachmentTypeRequest, 
  selectAttachmentTypes, 
  updateAttachmentTypeRequest 
} from './attachmentTypeSlice';
import OnlyDescriptionModal from '../../../components/OnlyDescriptionModal';
import ConfirmModal from '../../../components/ConfirmModal';

const AttachmentTypes = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectAttachmentTypes);
  const modal = useSelector(({ definitions }) => definitions.attachmentType.modal);
  const isSubmitting = useSelector(({ definitions }) => definitions.attachmentType.isSubmitting);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState('');

  useEffect(() => {
    dispatch(getAttachmentTypes());
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
              onClick={() => dispatch(openEditAttachmentTypeModal(props.row.original))}
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
    dispatch(removeAttachmentTypeRequest(data));
  }

  const handleCreate = () => {
    dispatch(openNewAttachmentTypeModal());
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
        activeMenu="sidebar.definitions.attachmentTypes"
        usePagetitle
        useFilter
        rightButtons={rightButtons}
      />
      <OnlyDescriptionModal
        header="Attachment Type"
        modal={modal}
        isSubmitting={isSubmitting}
        add={(data) => dispatch(addAttachmentTypeRequest(data))}
        update={(data) => dispatch(updateAttachmentTypeRequest(data))}
        closeModal={() => dispatch(closeAttachmentTypeModal())}
      />
      <ConfirmModal
        title="Deleting Attachment Type"
        content="Are you sure about deleting?"
        onConfirm={handleRemove}
        onClose={() => setShowConfirmModal(false)}
        showModal={showConfirmModal}
        data={confirmModalData}
      />
    </Fragment>
  )
}

export default AttachmentTypes;

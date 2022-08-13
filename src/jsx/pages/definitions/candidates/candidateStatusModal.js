import { Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

const defaultValues = {
  description: '',
  stageId: 0,
  viewOrder: 0,
  stageProgressId: 1,
  uiVisible: 0,
  moveToNextStage: null,
};

const schema = yup.object().shape({
  description: yup.string()
    .min(3, 'Description must have more than 3 characters')
    .required('Please enter a description'),
  stageId: yup.number().min(1).required('Stage Id must be entered'),
  viewOrder: yup.number().required('View order must be entered'),
  stageProgressId: yup.number().min(1).max(4).required('Stage Progress must be entered'),
  uiVisible: yup.number().required('UI Visible must be entered'),
  moveToNextStage: yup.number().nullable()
});

const yesNoOptions = [
  { id: 0, description: 'Hayır' },
  { id: 1, description: 'Evet' },
]

const CandidateStatusModal = (props) => {
  const modal = useMemo(() => props.modal, [props.modal]);
  const isSubmitting = useMemo(() => props.isSubmitting, [props.isSubmitting]);

  const [initialValues, setInitialValues] = useState(defaultValues);

  const initModal = useCallback(() => {
    if (modal.type === 'edit' && modal.data) {
      setInitialValues(modal.data);
    }

    if (modal.type === 'new') {
      setInitialValues({
        ...defaultValues,
        stageId: modal.stageId
      });
    }
  }, [modal.data, modal.stageId, modal.type]);

  useEffect(() => {
    if (modal.open) {
      initModal();
    }
  }, [initModal, modal.open]);

  const handleOnSubmit = (data) => {
    if (modal.type === 'edit') {
      if (props.update) {
        props.update(data);
      }
    }

    if (modal.type === 'new') {
      if (props.add) {
        props.add(data);
      }
    }
  }

  const handleModalClose = () => {
    if (props.closeModal) {
      props.closeModal({});
    }
  }

  return (
    <Modal className="fade" show={modal.open} onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>
          {modal.type === 'new' ? 'New' : 'Edit'} {props.header}
        </Modal.Title>
        <Button
          variant=""
          className="btn-close"
          onClick={handleModalClose}
        ></Button>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
          touched
        }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div
                className={`form-group mb-1 ${values.description
                  ? errors.description
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">Description</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="val-description"
                    placeholder="Enter a description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <div
                    id="val-description-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.description && touched.description ?  errors.description : ''}
                  </div>

                  <div
                    id="val-description-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <div
                className={`form-group mb-1 ${values.viewOrder
                  ? errors.viewOrder
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">viewOrder</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="val-viewOrder"
                    placeholder="Enter a viewOrder"
                    name="viewOrder"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.viewOrder}
                  />
                  <div
                    id="val-viewOrder-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.viewOrder && touched.viewOrder ? errors.viewOrder : ''}
                  </div>

                  <div
                    id="val-viewOrder-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <div
                className={`form-group mb-1 ${values.stageProgressId
                  ? errors.stageProgressId
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">stageProgressId</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="val-stageProgressId"
                    placeholder="Enter a stageProgressId"
                    name="stageProgressId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.stageProgressId}
                  />
                  <div
                    id="val-stageProgressId-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.stageProgressId && touched.stageProgressId ? errors.stageProgressId : ''}
                  </div>

                  <div
                    id="val-stageProgressId-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <div
                className={`form-group mb-1 ${values.uiVisible
                  ? errors.uiVisible
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">Visible</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <Select
                    defaultValue={''}
                    className="form-control p-0 b-0 h-auto"
                    onChange={(value) => setFieldValue('uiVisible', value.id)}
                    options={yesNoOptions}
                    getOptionLabel={(o) => o.description}
                    getOptionValue={(o) => o.id}
                    value={yesNoOptions.find((yno) => yno.id === values.uiVisible)}
                  />
                  {/* <input
                    type="number"
                    className="form-control"
                    id="val-uiVisible"
                    placeholder="Enter a uiVisible"
                    name="uiVisible"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.uiVisible}
                  /> */}
                  <div
                    id="val-uiVisible-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.uiVisible && touched.uiVisible ? errors.uiVisible : ''}
                  </div>

                  <div
                    id="val-uiVisible-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <div
                className={`form-group mb-1 ${values.moveToNextStage
                  ? errors.moveToNextStage
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">moveToNextStage</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    id="val-moveToNextStage"
                    placeholder="Enter a moveToNextStage"
                    name="moveToNextStage"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.moveToNextStage}
                  />
                  <div
                    id="val-moveToNextStage-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.moveToNextStage && touched.moveToNextStage ? errors.moveToNextStage : ''}
                  </div>

                  <div
                    id="val-moveToNextStage-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger light"
                onClick={handleModalClose}
                disabled={isSubmitting}
              >
                Close
              </Button>
              {modal.type === 'new' && (
                <Button
                  variant="primary"
                  disabled={isSubmitting || !isValid}
                  type="submit"
                >
                  Add
                </Button>
              )}
              {modal.type === 'edit' && (
                <Button
                  variant="primary"
                  disabled={isSubmitting || !isValid}
                  type="submit"
                >
                  Update
                </Button>
              )}
            </Modal.Footer>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

export default CandidateStatusModal;

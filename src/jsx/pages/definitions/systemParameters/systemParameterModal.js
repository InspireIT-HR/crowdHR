import { Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';

const defaultValues = {
  description: '',
  name: '',
  value: '',
};

const schema = yup.object().shape({
  description: yup.string()
    .min(3, 'Description must have more than 3 characters')
    .required('Please enter a description'),
  name: yup.string()
    .min(3, 'Name must have more than 3 characters')
    .required('Please enter a name'),
  value: yup.string()
    .required('Please enter a value')
});

const SystemParameterModal = (props) => {
  const modal = useMemo(() => props.modal, [props.modal]);
  const isSubmitting = useMemo(() => props.isSubmitting, [props.isSubmitting]);

  const [initialValues, setInitialValues] = useState(defaultValues);

  const initModal = useCallback(() => {
    if (modal.type === 'edit' && modal.data) {
      setInitialValues(modal.data);
    }

    if (modal.type === 'new') {
      setInitialValues(defaultValues);
    }
  }, [modal.data, modal.type]);

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
          isValid
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
                    {errors.description && errors.description}
                  </div>

                  <div
                    id="val-description-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <div
                className={`form-group mb-1 ${values.name
                  ? errors.name
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="val-name"
                    placeholder="Enter a name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <div
                    id="val-name-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.name && errors.name}
                  </div>

                  <div
                    id="val-name-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <div
                className={`form-group mb-1 ${values.value
                  ? errors.value
                    ? 'is-invalid'
                    : 'is-valid'
                  : ''
                  }`}
              >
                <label className="text-label">Value</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-text-height" />{" "}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="val-value"
                    placeholder="Enter a value"
                    name="value"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.value}
                  />
                  <div
                    id="val-value-error"
                    className="invalid-feedback animated fadeInUp"
                    style={{ display: 'block' }}
                  >
                    {errors.value && errors.value}
                  </div>

                  <div
                    id="val-value-error"
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
};

export default SystemParameterModal;

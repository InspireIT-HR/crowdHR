import { Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { referUser } from './store/jobOpeningSlice';
import { useDropzone } from 'react-dropzone';
import { formatBytes } from '../../../../helpers/formatter';

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const linkedinRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/[(a-z)-]+[a-zA-Z0-9]+/gm;

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  linkedinPage: '',
  mobile: '',
  phone: '',
  additionalInfo: '',
};

const schema = yup.object().shape({
  firstName: yup.string().required('Please enter a first name'),
  lastName: yup.string().required('Please enter a last name'),
  email: yup.string().email('Must be valid email').required('Please enter an email'),
  linkedinPage: yup.string().trim().matches(linkedinRegex).required('Please enter a proper linkedin page link'),
  mobile: yup.string().trim().matches(phoneRegex, 'Please enter a valid mobile').required('Please enter a mobile number'),
  phone: yup.string().trim().matches(phoneRegex, 'Please enter a valid phone').required('Please enter a phone number'),
  additionalInfo: yup.string().required('Please enter additional info'),
});

const ReferModal = (props) => {
  const dispatch = useDispatch();
  const isSubmitting = false;
  const acceptedFileTypes = ['application/pdf'];
  const [fileUploadError, setFileUploadError] = useState(null);
  const [cvFiles, setCvFiles] = useState([]);
  const [acceptCheckbox, setAcceptCheckbox] = useState(false);

  useEffect(() => {
    if (!props.open) {
      setFileUploadError(null);
      setCvFiles([]);
    }
  }, [props.open])

  const handleOnDrop = (acceptedFiles) => {
    setFileUploadError(null);

    const newCvFiles = [];
    acceptedFiles.forEach((file) => {
      if (!acceptedFileTypes.includes(file.type)) {
        setFileUploadError(`File type not accepted: ${file.type}`);
        return;
      }
  
      let fileName = '';
      let fileExtension = '';
      const filePathSplit = file.path.split('.');
      const filePathSplitLength = filePathSplit.length;
  
      if (filePathSplitLength === 1) {
        fileName = file.path;
      } else {
        fileExtension = filePathSplit[filePathSplitLength - 1];
        fileName = file.path.split(`.${fileExtension}`)[0];
      }
  
      const newCvFilesLength = cvFiles.length;
      for (let i = 0; i < newCvFilesLength; i += 1) {
        if (cvFiles[i].name === fileName) {
          setFileUploadError('File already exist');
          return;
        }
      }
      newCvFiles.push({
        name: fileName,
        size: file.size,
      });
    });
    
    setCvFiles([
      ...cvFiles,
      ...newCvFiles
    ]);
  }

  const {
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    noClick: true,
    onDrop: handleOnDrop,
    onError: (e) => console.log(e),
  });

  const handleOnSubmit = (data) => {
    dispatch(referUser(data));
  }

  const handleModalClose = () => {
    if (props.closeModal) {
      props.closeModal({});
    }
  }

  const handleFileRemove = (cvFile) => {
    const newCvFiles = cvFiles.filter((cf) => cf.name !== cvFile.name);
    setCvFiles(newCvFiles);
  }

  return (
    <Modal 
      className="fade" 
      show={props.open || false} 
      onHide={handleModalClose}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          Refer - {props.jobName}
        </Modal.Title>
        <div>
          <button
            variant="primary"
            className="btn btn-primary btn-sm"
            style={{ marginRight: '1rem' }}
          >
            Add Existing Candidate
          </button>
          <Button
            variant=""
            className="btn-close"
            onClick={handleModalClose}
          ></Button>
        </div>
      </Modal.Header>
      <Formik
        initialValues={defaultValues}
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
          isValid,
          touched
        }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <div
                  className={`form-group mb-1 ${values.firstName
                    ? errors.firstName
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                  }`}
                  style={{ width: 'calc(50% - 1rem)', marginRight: '1rem' }}
                >
                  <label className="text-label">First Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="val-first-name"
                      placeholder="First Name ..."
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    <div
                      id="val-first-name-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.firstName && touched.firstName ? errors.firstName : ''}
                    </div>
                  </div>
                </div>
                
                <div
                  className={`form-group mb-1 ${values.lastName
                    ? errors.lastName
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                  style={{ width: 'calc(50% - 1rem)', marginLeft: '1rem' }}
                >
                  <label className="text-label">Last Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="val-last-name"
                      placeholder="Last Name ..."
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    <div
                      id="val-first-name-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.lastName && touched.lastName ? errors.lastName : ''}
                    </div>
                  </div>
                </div>

                <div
                  className={`form-group mb-1 ${values.email
                    ? errors.email
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                  style={{ width: 'calc(50% - 1rem)', marginRight: '1rem' }}
                >
                  <label className="text-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="val-email"
                      placeholder="Email ..."
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <div
                      id="val-email-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.email && touched.email ? errors.email : ''}
                    </div>
                  </div>
                </div>

                <div
                  className={`form-group mb-1 ${values.linkedinPage
                    ? errors.linkedinPage
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                  style={{ width: 'calc(50% - 1rem)', marginLeft: '1rem' }}
                >
                  <label className="text-label">Linkedin Page</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="val-linkedin-page"
                      placeholder="Linkedin Page ..."
                      name="linkedinPage"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.linkedinPage}
                    />
                    <div
                      id="val-linkedin-page-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.linkedinPage && touched.linkedinPage ? errors.linkedinPage : ''}
                    </div>
                  </div>
                </div>

                <div
                  className={`form-group mb-1 ${values.mobile
                    ? errors.mobile
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                  style={{ width: 'calc(50% - 1rem)', marginRight: '1rem' }}
                >
                  <label className="text-label">Mobile</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="val-mobile"
                      placeholder="Mobile ..."
                      name="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                    />
                    <div
                      id="val-mobile-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.mobile && touched.mobile ? errors.mobile : ''}
                    </div>
                  </div>
                </div>

                <div
                  className={`form-group mb-1 ${values.phone
                    ? errors.phone
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                  style={{ width: 'calc(50% - 1rem)', marginLeft: '1rem' }}
                >
                  <label className="text-label">Phone</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="val-phone"
                      placeholder="Phone ..."
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    <div
                      id="val-phone-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.phone && touched.phone ? errors.phone : ''}
                    </div>
                  </div>
                </div>

                <div
                  className={`form-group mb-1 w-100 ${values.additionalInfo
                    ? errors.additionalInfo
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                    }`}
                >
                  <label className="text-label">Additional Info</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-text-height" />{" "}
                    </span>
                    <textarea
                      className="form-control"
                      id="val-additional-info"
                      placeholder="Additional Info ..."
                      name="additionalInfo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.additionalInfo}
                      rows={5}
                    />
                    <div
                      id="val-additional-info-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: 'block' }}
                    >
                      {errors.additionalInfo && touched.additionalInfo ? errors.additionalInfo : ''}
                    </div>
                  </div>
                </div>

                <div className="form-group mb-1 w-100">
                  <section 
                    className="container"
                    style={{ border: '.1rem solid #6e6e6e' }}
                  >
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <button 
                        className="btn btn-primary btn-sm my-4"
                        onClick={(ev) => {
                          ev.preventDefault();
                          open();
                        }}
                      >
                        Upload CV
                      </button>
                      <span style={{ paddingLeft: '2rem' }}>Or drop files here to upload...</span>
                    </div>
                    <div>
                      <span style={{ color: 'red' }}>{fileUploadError}</span>
                    </div>
                  </section>
                  <section>
                    <sub>*Accepted Extensions: {
                      acceptedFileTypes.map((acceptedFileType) => {
                         return acceptedFileType.split('/')[1];
                      }
                    ).join(', ')}</sub>
                  </section>
                </div>

                {cvFiles.length > 0 && (
                  <div 
                    className="form-group mb-1 w-100"
                    style={{ 
                      maxHeight: '190px', 
                      overflow: 'auto',
                      border: '.1rem solid #6e6e6e',
                      padding: '.5rem'
                    }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Size</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ maxHeight: 'calc(35.69px * 3)' }}>
                        {cvFiles.map((cvFile, index) => (
                          <tr key={index}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {cvFile.name}
                            </td>
                            <td>
                              {formatBytes(cvFile.size)}
                            </td>
                            <td>
                              <button
                                className="btn-close"
                                type="button"
                                onClick={() => handleFileRemove(cvFile)}
                              ></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="form-group mb-1 mt-4 w-100">
                  <input 
                    type="checkbox" 
                    value={acceptCheckbox} 
                    id="accept-checkbox" 
                    onChange={(e) => setAcceptCheckbox(e.target.checked)}
                  />
                  <label className="noselect" style={{ marginLeft: '.5rem' }} htmlFor="accept-checkbox">Okudum, anladım</label>
                </div>

                <div className="form-group mb-1 mt-2 w-100">
                  <sub>
                    We Will Contact your Referred Candidate as soon as possible.Due to our privacy policy ,we may not be able to inform you directly about your candidate's interests.....'
                  </sub>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger light"
                onClick={handleModalClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={isSubmitting || !isValid || !acceptCheckbox}
                type="submit"
              >
                Save
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

export default ReferModal;

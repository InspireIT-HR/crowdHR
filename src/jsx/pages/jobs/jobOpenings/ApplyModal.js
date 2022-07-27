import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { applyJobOpening } from './store/jobOpeningSlice';
import { Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { formatBytes } from '../../../../helpers/formatter';

const defaultValues = {
  additionalInfo: '',
}

const schema = yup.object().shape({
  additionalInfo: yup.string().required('Please enter additional info'),
})

const ApplyModal = (props) => {
  const dispatch = useDispatch();
  const isSubmitting = false;
  const acceptedFileTypes = ['application/pdf'];
  const [fileUploadError, setFileUploadError] = useState(null);
  const [cvFiles, setCvFiles] = useState([]);
  const [acceptCheckbox, setAcceptCheckbox] = useState(false);
  const [isDropzoneBusy, setIsDropzoneBusy] = useState(false);

  useEffect(() => {
    if (!props.open) {
      setFileUploadError(null);
      setCvFiles([]);
      setIsDropzoneBusy(false);
    }
  }, [props.open]);

  const handleOnDrop = (acceptedFiles) => {
    setFileUploadError(null);

    const newCvFiles = [];
    const acceptedFilesLength = acceptedFiles.length;
    let done = 0;

    if (acceptedFiles.length) {
      setIsDropzoneBusy(true);
    }

    acceptedFiles.forEach((file) => {
      if (!acceptedFileTypes.includes(file.type)) {
        setFileUploadError(`File type not accepted: ${file.type}`);
        setIsDropzoneBusy(false);
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
          setIsDropzoneBusy(false);
          return;
        }
      }

      const reader = new FileReader();

      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => console.log('File reading has failed');
      reader.onload = () => {
        newCvFiles.push({
          name: fileName,
          size: file.size,
          content: reader.result,
        });

        done += 1;

        if (done === acceptedFilesLength) {
          setCvFiles([
            ...cvFiles,
            ...newCvFiles
          ]);

          setIsDropzoneBusy(false);
        }
      }

      reader.readAsArrayBuffer(file);
    });
  }

  const {
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    noClick: true,
    disabled: isDropzoneBusy,
    onDrop: handleOnDrop,
    onError: (e) => console.log(e),
  });

  const handleOnSubmit = (data) => {
    dispatch(applyJobOpening(data));
  }

  const handleModalClose = () => {
    if (props.closeModal) {
      props.closeModal();
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
          Apply to - ${props.jobName} 
        </Modal.Title>
        <div>
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
                  flexWrap: 'wrap',
                }}
              >
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
                      placeholder="Additional Info..."
                      name="additionalInfo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.additionalInfo}
                      row={5}
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
                    <div {...getRootProps({ className: `dropzone ${isDropzoneBusy ? 'disabled' : ''}` })}>
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

export default ApplyModal;

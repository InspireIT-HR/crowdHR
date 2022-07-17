import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withReducer from "../../../../store/withReducer";
import reducer from "./store";
import DefaultTable from "../../../components/table/DefaultTable";
import { getJobOpenings, selectJobOpenings } from "./store/jobOpeningSlice";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import ReferModal from "./ReferModal";

const JobOpenings = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectJobOpenings);
  const [referModal, setReferModal] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [referJob, setReferJob] = useState();
  const [selectedJobName, setSelectedJobName] = useState('');
  

  useEffect(() => {
    dispatch(getJobOpenings());
  }, [dispatch]);

const referClick=(original,open)=>{
  setReferModal(open);


}

  const columns = useMemo(
    () => [
      {
        Header: "Customer",
        accessor: "customer.logoPath",
        Cell: (props) => {
          return (
            <img
              width="70"
              height="30"
              src={`https://77.79.108.34:63748/CustomerLogos/${props.value}`}
              alt="company_logo"
            />
          );
        },
      },
      {
        Header: "Position",
        accessor: "shortName",
      },
      {
        Header: "Type",
        accessor: "jobType.description",
      },
      {
        Header: "Status",
        accessor: "status.description",
      },
      {
        Header: "Location",
        accessor: "locationCity.description",
      },
      {
        Header: "Posted Date",
        accessor: "createDate",
        Cell: (props) => {
          return new Date(props.value).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });
        },
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: (props) => {
          return (
            <>
              <button
                className="btn btn-primary shadow btn-xs sharp me-1"
                // onClick={() =>
                //   dispatch(openEditCandidateStatusModal(props.row.original))
                // }
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="btn btn-danger shadow btn-xs sharp"
                // onClick={() => {
                //   setConfirmModalData(props.row.original.id);
                //   setShowConfirmModal(true);
                // }}
              >
                <i className="bi bi-eye-slash"></i>
              </button>
            </>
          );
        },
      },
      {
        Header: ".",
        accessor: "",
        Cell: (props) => {
          return (
            <>
              <button
                className="btn btn-outline-success btn-sm me-1"
                onClick={() => referClick("a",true)}
              >
                Apply
              </button>
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => {
                  setReferModal(true);
                  setSelectedJobName(`${props.row.original.shortName} / ${props.row.original.customer.name}`)
                }}
              >
                Refer
              </button>
            </>
          );
        },
      },
    ],
    []
  );
  const rightButtons = (
    <Link to={"/jobs/open-job"} className="btn add_button  mr-2">
      <i class="bi bi-plus-circle add_icon"></i>
    </Link>
  );

  return (
    <Fragment>
      <ReferModal open={referModal} jobName={selectedJobName} closeModal={() => setReferModal(false)}/>
      
      {/*Apply Modal*/}
      <Modal className="fade" show={applyModal}>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Button
              onClick={() => setApplyModal(false)}
              variant=""
              className="btn-close"
            ></Button>
          </Modal.Header>
          <Modal.Body>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setApplyModal(false)} variant="danger light">
              Close
            </Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      {/*Apply Modal End*/}

      <DefaultTable
        data={data}
        columns={columns}
        motherMenu="sidebar.jobs.job"
        activeMenu="sidebar.jobs.jobOpenings"
        usePageTitle
        useFilter
        rightButtons={rightButtons}
      />
    </Fragment>
  );
};

export default withReducer("jobOpeningApp", reducer)(JobOpenings);

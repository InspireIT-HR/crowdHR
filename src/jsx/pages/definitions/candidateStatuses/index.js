import { useEffect, useMemo,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import reducer from './store';

import DefaultTable from '../../../components/table/DefaultTable';
import { getCandidateStatuses, selectCandidateStatuses } from './store/candidateStatusSlice';
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";

const CandidateStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandidateStatuses);
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const openModal=()=>{
    setAddModal(true)
  }

  useEffect(() => {
    dispatch(getCandidateStatuses());
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
            <button className="btn btn-primary shadow btn-xs sharp me-1" onClick={() => setUpdateModal(true)}>
            <i className="fas fa-pencil-alt"></i>
            </button>
            <button className="btn btn-danger shadow btn-xs sharp">
            <i className="fa fa-trash"></i>
            </button>
          </>
        )
      }
    }
  ], []);

  return (
    <div>
      {/* <!-- Update Modal --> */}
      <Modal className="fade" show={updateModal}>
                  <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    <Button
                      onClick={() => setUpdateModal(false)}
                      variant=""
                      className="btn-close"
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Cras mattis consectetur purus sit amet fermentum. Cras
                      justo odio, dapibus ac facilisis in, egestas eget quam.
                      Morbi leo risus, porta ac consectetur ac, vestibulum at
                      eros.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setUpdateModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
                    <Button variant="primary">Save changes</Button>
                  </Modal.Footer>
      </Modal>
      {/* <!-- Update Modal --> */}
      {/* <!-- Add Modal --> */}
      <Modal className="fade" show={addModal}>
                  <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    <Button
                      onClick={() => setAddModal(false)}
                      variant=""
                      className="btn-close"
                    >
                      
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Cras mattis consectetur purus sit amet fermentum. Cras
                      justo odio, dapibus ac facilisis in, egestas eget quam.
                      Morbi leo risus, porta ac consectetur ac, vestibulum at
                      eros.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setAddModal(false)}
                      variant="danger light"
                    >
                      Close
                    </Button>
                    <Button variant="primary">Save changes</Button>
                  </Modal.Footer>
      </Modal>
      {/* <!-- Add Modal --> */}
      <DefaultTable
          data={data}
          columns={columns}
          motherMenu="sidebar.definitions.def"
          activeMenu="sidebar.definitions.candidateStatuses"
          usePageTitle
          useFilter
          openModal={openModal}
          display='none'
        />
    </div>
  
  )
}


export default withReducer('candidateStatusApp', reducer)(CandidateStatuses);
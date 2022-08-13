import { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCandidateStatusRequest, closeCandidateStatusModal, getCandidateStatuses, updateCandidateStatusRequest } from "./candidateStatusSlice";
import AccordionTable from "../../../components/table/AccordionTable";
import JobCandidatesTable from "./jobCandidatesTable";
import { getCandidateSkills } from "./candidateSkillSlice";
import { getCandidateStages, selectCandidateStages } from "./candidateStageSlice";
import CandidateStatusModal from "./candidateStatusModal";
import { getCandidateProgresses } from "./candidateProgressSlice";

const CandidateStatuses = (props) => {
  const dispatch = useDispatch();
  const data = useSelector(selectCandidateStages);
  const modal = useSelector(({ definitions }) => definitions.candidateStatus.modal);

  useEffect(() => {
    dispatch(getCandidateStatuses());
    dispatch(getCandidateSkills());
    dispatch(getCandidateStages());
    dispatch(getCandidateProgresses());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sortable: true,
      },
      {
        Header: "Description",
        accessor: "description",
        sortable: true,
      },
      {
        Header: "",
        accessor: ".id",
        sortable: false,
      },
    ],
    []
  );

  return (
    <Fragment>
      <AccordionTable
        data={data}
        columns={columns}
        motherMenu="sidebar.definitions.def"
        activeMenu="sidebar.definitions.candidateStatuses"
        usePageTitle
        useFilter
        accordionBody={JobCandidatesTable}
      />
      <CandidateStatusModal
        header="Job Candidate Status"
        modal={modal}
        isSubmitting={false}
        add={(data) => {
          dispatch(addCandidateStatusRequest(data));
        }}
        update={(data) => {
          dispatch(updateCandidateStatusRequest(data));
        }}
        closeModal={() => dispatch(closeCandidateStatusModal())}
      />
    </Fragment>
  );
};

export default CandidateStatuses;

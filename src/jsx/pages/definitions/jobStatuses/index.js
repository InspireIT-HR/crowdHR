import withReducer from '../../../../store/withReducer';
import reducer from './store';

const JobStatuses = (props) => {
  return <>Hello</>
}

export default withReducer('jobStatusApp', reducer)(JobStatuses);

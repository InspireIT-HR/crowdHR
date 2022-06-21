import Home from "./components/Dashboard/Home";
import CandidateStatuses from "./pages/definitions/candidateStatuses";
import EducationLevels from "./pages/definitions/educationLevels";

import JobView from "./components/Jobs/JobView";
import JobApplication from "./components/Jobs/JobApplication";
import ApplyJob from "./components/Jobs/ApplyJob";
import NewJob from "./components/Jobs/NewJob";
import UserProfile from "./components/Jobs/UserProfile";
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import RechartJs from "./components/charts/rechart";
import JobOpenings from "./components/Jobs/JobOpenings";
import UiAlert from "./components/bootstrap/Alert";
import Select2 from "./components/PluginsMenu/Select2/Select2";
import jobTypes from "./pages/definitions/jobTypes";

export const routes = [
  {
    title: 'sidebar.dashboard',
    url: 'dashboard',
    icon: 'flaticon-025-dashboard',
    component: Home,
    children: [],
  },
  {
    title: 'sidebar.definitions.def',
    url: 'definitions',
    icon: 'flaticon-093-waving',
    component: CandidateStatuses,
    children: [
      {
        title: 'sidebar.definitions.candidateStatuses',
        url: 'candidate-statuses',
        component: CandidateStatuses,
      },
      {
        title: 'sidebar.definitions.educationLevels',
        url: 'education-levels',
        component: EducationLevels,
      },
      {
        title: 'sidebar.definitions.jobTypes',
        url: 'job-types',
        component: jobTypes,
      },
      {
        title: 'sidebar.definitions.jobStatuses',
        url: 'job-application',
        component: JobApplication,
      },
      {
        title: 'sidebar.definitions.jobIndustries',
        url: 'apply-job',
        component: ApplyJob,
      },
      {
        title: 'sidebar.definitions.jobLocations',
        url: 'new-job',
        component: NewJob,
      },
      {
        title: 'sidebar.definitions.jobSalaryTypes',
        url: 'user-profile',
        component: UserProfile,
      },
    ]
  },
  {
    title: 'sidebar.users.user',
    url: '#',
    icon: 'flaticon-050-info',
    component: AppProfile,
    children: [
      {
        title: 'sidebar.users.userList',
        url: 'app-profile',
        component: AppProfile,
      }
    ]
  },
  {
    title: 'sidebar.customers.cus',
    url: '#',
    icon: 'flaticon-041-graph',
    component: RechartJs,
    children: [
      {
        title: 'sidebar.customers.customerList',
        url: 'chart-rechart',
        component: RechartJs,
      },
    ]
  },
  {
    title: 'sidebar.jobs.job',
    url: 'jobs',
    icon: 'flaticon-086-star',
    component: JobOpenings,
    children: [
      {
        title: 'sidebar.jobs.jobOpenings',
        url: 'job-openings',
        component: JobOpenings,
      },
      {
        title: 'sidebar.jobs.addJob',
        url: 'ui-alert',
        component: UiAlert,
      }
    ]
  },
  {
    title: 'sidebar.candidates.cand',
    url: '#',
    icon: 'flaticon-045-heart',
    component: Select2,
    children: [
      {
        title: 'sidebar.candidates.jobCandidates',
        url: 'uc-select2',
        component: Select2,
      }
    ]
  }
];

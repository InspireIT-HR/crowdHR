import Home from "./components/Dashboard/Home";
import CandidateStatuses from "./pages/definitions/candidateStatuses";
import EducationLevels from "./pages/definitions/educationLevels";

import UserProfile from "./components/Jobs/UserProfile";
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import RechartJs from "./components/charts/rechart";
import UiAlert from "./components/bootstrap/Alert";
import Select2 from "./components/PluginsMenu/Select2/Select2";
import jobTypes from "./pages/definitions/jobTypes";
import JobOpenings from "./pages/jobs/jobOpenings";
import jobStatuses from "./pages/definitions/jobStatuses";
import jobIndustries from "./pages/definitions/jobIndustries";
import jobLocations from "./pages/definitions/jobLocations";

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
        component: jobStatuses,
      },
      {
        title: 'sidebar.definitions.jobIndustries',
        url: 'job-industries',
        component: jobIndustries,
      },
      {
        title: 'sidebar.definitions.jobLocations',
        url: 'job-locations',
        component: jobLocations,
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

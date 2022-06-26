import Home from "./components/Dashboard/Home";
import CandidateStatuses from "./pages/definitions/candidateStatuses";
import EducationLevels from "./pages/definitions/educationLevels";

import Select2 from "./components/PluginsMenu/Select2/Select2";
import jobTypes from "./pages/definitions/jobTypes";
import JobOpenings from "./pages/jobs/jobOpenings";
import jobStatuses from "./pages/definitions/jobStatuses";
import jobIndustries from "./pages/definitions/jobIndustries";
import jobLocations from "./pages/definitions/jobLocations";
import jobSalaryTypes from "./pages/definitions/jobSalaryTypes";
import customers from "./pages/customers/customers";
import users from "./pages/users/users";
import openJob from "./pages/jobs/NewJob/OpenJob";

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
        url: 'job-salary-types',
        component: jobSalaryTypes,
      },
    ]
  },
  {
    title: 'sidebar.users.user',
    url: 'users',
    icon: 'flaticon-050-info',
    component: users,
    children: [
      {
        title: 'sidebar.users.userList',
        url: 'users',
        component: users,
      }
    ]
  },
  {
    title: 'sidebar.customers.cus',
    url: 'customers',
    icon: 'flaticon-041-graph',
    component: customers,
    children: [
      {
        title: 'sidebar.customers.customerList',
        url: 'customers',
        component: customers,
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
        url: 'open-job',
        component: openJob,
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

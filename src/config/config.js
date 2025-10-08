module.exports = {
  // baseURL: "http://192.168.60.75:8082/",
  baseURL: "https://citizen-xpapi-app-v1-ruiy1y.5sc6y6-2.usa-e2.cloudhub.io/",

  apiEndpoints: {
    authenticate: "api/citizen/login",
    adminLogin: "api/admin/login",
    register: "api/citizen/register",
    userDetails: "api/citizenId",
    userConsents: "api/consents",
    basicDetails: "api/admin/data/search",
    demographyWiseDetails: "api/demography",
    educationWeiseDetails: "api/education",
    employmentWiseDetails: "api/employment",
    healthWiseDetails: "api/health",
    propertyWiseDetails: "api/property",
    employerWiseDetails: "api/employer",
  },
};

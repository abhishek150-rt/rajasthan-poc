module.exports = {
  baseURL: "http://192.168.60.75:8082/",

  apiEndpoints: {
    authenticate: "api/citizen/login",
    adminLogin:"api/admin/login",
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

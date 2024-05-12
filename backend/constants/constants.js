const sql = require("mssql");

const doctorAttributes = (params) => {
  return [
    { name: "qualification", type: sql.VarChar, value: params.Qualification },
    { name: "specialization", type: sql.VarChar, value: params.Specialization },
    { name: "experience", type: sql.NVarChar, value: params.Experience },
    { name: "checkupstatus", type: sql.Int, value: params.Checkupstatus },
    {
      name: "consulationfee",
      type: sql.Decimal,
      value: params.ConsultationFee,
    },
  ];
};

const hospitalAttributes = (params) => {
  return [
    { name: "adminID", type: sql.Int, value: params.AdminID },
    { name: "name", type: sql.VarChar, value: params.Name },
    { name: "email", type: sql.NVarChar, value: params.Email },
    { name: "website", type: sql.NVarChar, value: params.Website },
    { name: "location", type: sql.NVarChar, value: params.Location },
    { name: "city", type: sql.NVarChar, value: params.City },
    { name: "state", type: sql.NVarChar, value: params.State },
    { name: "zipCode", type: sql.NVarChar, value: params.ZipCode },
    { name: "contact", type: sql.NVarChar, value: params.Contact },
  ];
};
const departmentAttributes = (params) => {
  return [
    {
      name: "hospitalID",
      type: sql.Int,
      value: params.HospitalID,
      require: true,
    },
    { name: "name", type: sql.VarChar, value: params.Name, require: true },
    {
      name: "location",
      type: sql.NVarChar,
      value: params.Location || null,
      require: false,
    },
    { name: "contact", type: sql.NVarChar, value: params.Contact, require: true },
  ];
};

const medicinesAttributes = (params) => {
  return [
    { name: "name", type: sql.VarChar, value: params.Name, require: true },
    {
      name: "description",
      type: sql.VarChar,
      value: params.Description || null,
      require: false,
    },
    { name: "manufacturer", type: sql.NVarChar, value: params.Manufacturer },
    { name: "price", type: sql.Decimal, value: params.Price, require: true },
    {
      name: "dosage",
      type: sql.VarChar,
      value: params.Dosage || null,
      require: false,
    },
    { name: "quantity", type: sql.Int, value: params.Quantity, require: true },
  ];
};
const prescriptionAttributes = (params) => {
  return [
    {
      name: "symptomID",
      type: sql.Int,
      value: params.SymptomID || null,
      require: true,
    },
    {
      name: "treatmentID",
      type: sql.Int,
      value: params.TreatmentID || null,
      require: false,
    },

    {
      name: "Diagnosis",
      type: sql.VarChar,
      value: params.Diagnosis || null,
      require: false,
    },
    {
      name: "CaseType",
      type: sql.Int,
      value: params.CaseType,
      require: true,
    },

    {
      name: "dateStarted",
      type: sql.DateTime,
      value: params.DateStarted,
      require: true,
    },
    {
      name: "advice",
      type: sql.VarChar,
      value: params.Advice || null,
      require: false,
    },
  ];
};
const treatmentAttributes = (params) => {
  return [
    { name: "name", type: sql.VarChar, value: params.Name, require: true },
    {
      name: "description",
      type: sql.Text,
      value: params.Description,
      require: true,
    },
    {
      name: "departmentID",
      type: sql.Int,
      value: params.DepartmentID,
      require: true,
    },
    { name: "cost", type: sql.Decimal, value: params.Cost, require: true },
    { name: "duration", type: sql.NVarChar, value: params.Duration, require: true },
  ];
};
const invoiceAttributes = (params) => {
  return [
    {
      name: "prescriptionID",
      type: sql.Int,
      value: params.PrescriptionID,
      require: true,
    },
    {
      name: "totalAmount",
      type: sql.Decimal,
      value: params.TotalAmount,
      require: true,
    },
    {
      name: "paymentStatus",
      type: sql.Int,
      value: params.PaymentStatus,
      require: true,
    },
    {
      name: "dateIssued",
      type: sql.DateTime,
      value: params.DateIssued,
      require: true,
    },
  ];
};
const appointmentAttributes = (params) => {
  return [
    {
      name: "doctorId",
      type: sql.Int,
      value: params.DoctorID,
      require: true,
    },
    {
      name: "patientId",
      type: sql.Int,
      value: params.PatientID,
      require: true,
    },
    {
      name: "status",
      type: sql.Int,
      value: params.Status,
      require: true,
    },
    {
      name: "appointmentDate",
      type: sql.DateTime,
      value: params.AppointmentDate,
      require: true,
    },
  ];
};

// export const petientInfoInputs = [
//   {
//     value: 1,
//     label: "Description",
//     name: "description",
//     type: "textarea",
//     validationfn: "",
//   },
//   {
//     value: 2,
//     label: "Alive Status",
//     name: "aliveStatus",
//     type: "radio",
//     validationfn: "",
//   },
//   {
//     value: 3,
//     label: "Medical History",
//     name: "medicalHistory",
//     type: "textarea",
//     validationfn: "",
//   },
// ];

const personAttributes = (params, userID) => {
  return [
    {
      name: "firstname",
      type: sql.NVarChar,
      value: params.FirstName,
      require: true,
    },
    {
      name: "lastname",
      type: sql.NVarChar,
      value: params.LastName,
      require: true,
    },
    { name: "email", type: sql.NVarChar, value: params.Email, require: true },
    {
      name: "dateofbirth",
      type: sql.Date,
      value: params.DateofBirth,
      require: true,
    },
    {
      name: "address",
      type: sql.NVarChar,
      value: params.Address,
      require: false,
    },
    { name: "gender", type: sql.Int, value: params.Gender, require: true },
    {
      name: "contact",
      type: sql.NVarChar,
      value: params.Contact,
      require: false,
    },
    {
      name: "zipcode",
      type: sql.Int,
      value: params.ZipCode,
      require: false,
    },
    { name: "city", type: sql.NVarChar, value: params.City, require: false },
    { name: "state", type: sql.NVarChar, value: params.State, require: false },
    {
      name: "country",
      type: sql.NVarChar,
      value: params.Country,
      require: false,
    },
    { name: "userID", type: sql.Int, value: userID, require: true },
  ];
};
module.exports = {
  doctorAttributes,
  personAttributes,
  hospitalAttributes,
  departmentAttributes,
  treatmentAttributes,
  medicinesAttributes,
  prescriptionAttributes,
  invoiceAttributes,
  appointmentAttributes,
};

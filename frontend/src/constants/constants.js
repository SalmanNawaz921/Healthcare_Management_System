import MainAdminDashboard from "@/components/Pages/MainAdmin/MainAdmin";
import {
  validateEmail,
  validatePassword,
  validatecPassword,
  validateExperience,
  validatePhoneNumber,
  validateName,
  usernameValidation,
  validateTime,
  validateNumber,
} from "@/utils/utils";
import Doctor from "@/components/Pages/Doctor/Doctor";
import {
  FaUsers,
  FaHome,
  FaUserMd,
  FaCalendarAlt,
  FaFileInvoice,
  FaCapsules,
  FaSignOutAlt,
  FaCog,
  FaCogs,
  FaMoneyBill,
  FaHospital,
  FaHospitalSymbol,
  FaRegHospital,
  FaMedkit,
  FaRegTimesCircle,
  FaRegCheckCircle,
} from "react-icons/fa";

import {
  ClockCircleOutlined,
  HomeOutlined,
  TeamOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  MedicineBoxOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import HospitalAdmin from "@/components/Pages/HospitalAdmin/HospitalAdmin";
import Patient from "@/components/Pages/Patient/Patient";
import MainAdmin from "@/components/Pages/MainAdmin/MainAdmin";

const iconComponents = {
  departments: FaUsers,
  patients: TeamOutlined,
  doctors: FaUserMd,
  appointments: CalendarOutlined,
  invoices: FileOutlined,
  medicines: MedicineBoxOutlined,
  logout: LogoutOutlined,
  dashboard: HomeOutlined,
  treatment: MedicineBoxOutlined,
  settings: SettingOutlined,
  hospital: FaRegHospital,
};

export const adminOptions = [
  { value: 1, label: "Dashboard", Icon: iconComponents.dashboard },
  { value: 2, label: "Hospitals", Icon: iconComponents.hospital },
  { value: 3, label: "Admins", Icon: FaUsers },
  { value: 4, label: "Settings", Icon: iconComponents.settings },
  { value: 5, label: "Logout", Icon: iconComponents.logout },
];
export const doctorOptions = [
  { value: 1, label: "Dashboard", Icon: iconComponents.dashboard },
  { value: 2, label: "Patients", Icon: iconComponents.patients },
  { value: 3, label: "Appointments", Icon: iconComponents.appointments },
  { value: 4, label: "Prescriptions", Icon: iconComponents.invoices },
  { value: 5, label: "Treatments", Icon: iconComponents.treatment },
  { value: 6, label: "Settings", Icon: iconComponents.settings },
  { value: 7, label: "Logout", Icon: iconComponents.logout },
];
export const hospitalAdminOptions = [
  { value: 1, label: "Dashboard", Icon: iconComponents.dashboard },
  { value: 2, label: "Departments", Icon: iconComponents.hospital },
  { value: 3, label: "Doctors", Icon: iconComponents.doctors },
  { value: 4, label: "Assign Doctors", Icon: iconComponents.doctors },
  { value: 5, label: "Patients", Icon: iconComponents.patients },
  { value: 6, label: "Medicines", Icon: iconComponents.medicines },
  { value: 7, label: "Treatments", Icon: iconComponents.treatment },
  { value: 8, label: "Appointments", Icon: iconComponents.appointments },
  { value: 9, label: "Invoices", Icon: iconComponents.invoices },
  { value: 10, label: "Settings", Icon: iconComponents.settings },
  { value: 11, label: "Logout", Icon: iconComponents.logout },
];

export const patientOptions = [
  { value: 1, label: "Dashboard", Icon: iconComponents.dashboard },
  { value: 2, label: "Appointments", Icon: iconComponents.patients },
  { value: 3, label: "Prescriptions", Icon: iconComponents.invoices },
  { value: 4, label: "Doctors", Icon: iconComponents.doctors },
  { value: 5, label: "Invoices", Icon: iconComponents.invoices },
  { value: 6, label: "Settings", Icon: iconComponents.settings },
  { value: 7, label: "Logout", Icon: iconComponents.logout },
];
export const userOptions = {
  mainadmin: adminOptions,
  hospitaladmin: hospitalAdminOptions,
  patient: patientOptions,
  doctor: doctorOptions,
};
export const users = [
  { value: 1, name: "Main Admin" },
  { value: 2, name: "Hospital Admin" },
  { value: 3, name: "Doctor" },
  { value: 4, name: "Patient" },
];
export const userComponents = {
  mainadmin: MainAdmin,
  hospitaladmin: HospitalAdmin,
  doctor: Doctor,
  patient: Patient,
};

export const doctorInputs = (options) => {
  return[
    {
      value: 1,
      label: "Qualification",
      name: "Qualification",
      type: "select",
      validationfn: "",
      require: true,
      options: [
        { label: "MBBS", value: "MBBS" },
        { label: "MD", value: "MD" },
        { label: "DO", value: "DO" },
        { label: "BDS", value: "BDS" },
      ],
    },
    {
      value: 2,
      label: "Specialization",
      name: "Specialization",
      type: "select",
      validationfn: "",
      require: true,
    },
    {
      value: 3,
      label: "Experience",
      name: "Experience",
      type: "text",
      validationfn: validateExperience,
      require: true,
    },
    {
      value: 4,
      label: "Checkupstatus",
      name: "Checkupstatus",
      type: "radio",
      validationfn: "",
      require: true,
    },
    {
      value: 5,
      label: "ConsultationFee",
      name: "ConsultationFee",
      type: "number",
      validationfn: "",
      require: true,
    },
    {
      value: 6,
      label: "Hospital Name",
      name: "HospitalID",
      type: "select",
      validationfn: "",
      require: true,
      options:options
    },
  ];
};

export const qualificationSpecializations = [
  {
    qualification: "MBBS",
    specializations: ["General Medicine", "General Surgery", "Pediatrics"],
  },
  {
    qualification: "MD",
    specializations: ["Cardiology", "Oncology", "Neurology"],
  },
  {
    qualification: "DO",
    specializations: [
      "Family Medicine",
      "Osteopathic Manipulative Medicine",
      "Internal Medicine",
    ],
  },
  {
    qualification: "BDS",
    specializations: [
      "General Dentistry",
      "Orthodontics",
      "Pediatric Dentistry",
      "Oral and Maxillofacial Radiology",
      "Oral Pathology",
      "Public Health Dentistry",
    ],
  },
  // More qualifications and their corresponding specializations will be added if needed
];

export const stepperOptions = [
  "User Information",
  "Personal Information",
  "Field Information",
];

export const personalInfoInputs = [
  {
    value: 1,
    label: "FirstName",
    name: "FirstName",
    type: "text",
    validationfn: validateName,
    required: true,
  },
  {
    value: 2,
    label: "LastName",
    name: "LastName",
    type: "text",
    validationfn: validateName,
    required: true,
  },

  {
    value: 3,
    label: "Email",
    name: "Email",
    type: "email",
    validationfn: validateEmail,
    required: true,
  },
  {
    value: 4,
    label: "Gender",
    name: "Gender",
    type: "radio",
    validationfn: "",
    items: [
      { key: "1", value: "5", label: "Male" },
      { key: "2", value: "6", label: "Female" },
    ],
    required: true,
  },
  {
    value: 5,
    label: "DateofBirth",
    name: "DateofBirth",
    type: "date",
    validationfn: "",
    required: true,
  },

  {
    value: 6,
    label: "Address",
    name: "Address",
    type: "text",
    validationfn: "",
    required: false,
  },
  {
    value: 7,
    label: "Contact",
    name: "Contact",
    type: "text",
    validationfn: validatePhoneNumber,
    required: false,
  },
  {
    value: 8,
    label: "CNIC",
    name: "CNIC",
    type: "text",
    validationfn: "",
    required: false,
  },
  {
    value: 8,
    label: "ZipCode",
    name: "ZipCode",
    type: "number",
    validationfn: "",
    required: false,
  },
  {
    value: 9,
    label: "City",
    name: "City",
    type: "text",
    validationfn: "",
    required: false,
  },
  {
    value: 10,
    label: "State",
    name: "State",
    type: "text",
    validationfn: "",
    required: false,
  },
  {
    value: 11,
    label: "Country",
    name: "Country",
    type: "text",
    validationfn: "",
    required: false,
  },
];

export const userInfoInputs = [
  {
    value: 1,
    label: "Username",
    name: "Username",
    type: "text",
    validationfn: usernameValidation,
    require: true,
  },
  {
    value: 2,
    label: "Password",
    name: "Password",
    type: "password",
    validationfn: validatePassword,
    require: true,
  },
  {
    value: 3,
    label: "ConfirmPassword",
    name: "ConfirmPassword",
    type: "password",
    validationfn: validatecPassword,
    require: true,
  },
];
export const petientInfoInputs = (options) => {
  return [
    {
      value: 1,
      label: "Description",
      name: "Description",
      type: "textarea",
      validationfn: "",
      require: true,
    },
    {
      value: 2,
      label: "AliveStatus",
      name: "AliveStatus",
      type: "radio",
      validationfn: "",
      items: [
        { key: 1, value: "9", label: "Alive" },
        { key: 2, value: "10", label: "Dead" },
      ],
      require: true,
    },
    {
      value: 3,
      label: "MedicalHistory",
      name: "MedicalHistory",
      type: "textarea",
      validationfn: "",
      require: true,
    },
    {
      value: 4,
      label: "Weight",
      name: "Weight",
      type: "text",
      validationfn: "",
      placeholder: "Enter Weight in KGs",
      require: false,
    },
    {
      value: 5,
      label: "BloodPressure",
      name: "BloodPressure",
      type: "text",
      validationfn: "",
      placeholder: "Enter Blood Pressure in 100/90",
      require: false,
    },
    {
      value: 6,
      label: "Height",
      name: "Height",
      type: "text",
      validationfn: "",
      placeholder: "Enter Height in CM",
      require: false,
    },
    {
      value: 7,
      label: "Allergies",
      name: "Allergies",
      type: "text",
      validationfn: "",
      placeholder: "Enter Allergies",
      require: false,
    },

    {
      value: 8,
      label: "BloodType",
      name: "BloodType",
      type: "text",
      validationfn: "",
      placeholder: "Enter Blood Type e.g AB+",
      require: false,
    },

    {
      value: 9,
      label: "Hospital Name",
      name: "HospitalID",
      type: "select",
      validationfn: "",
      require: true,
      options: options,
    },
  ];
};

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  // Add more columns as needed
];

export const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  // Add more data rows as needed
];

export const patientCards = [
  { value: 1, label: "Today Patients", Icon: ClockCircleOutlined },
  { value: 2, label: "Monthly Patients", Icon: CalendarOutlined },
  { value: 3, label: "Yearly Patients", Icon: FileOutlined },
];

export const treatmentCards = [
  {
    value: 1,
    label: "Available Treatments",
    subtitle: " treatments are available",
    Icon: MedicineBoxOutlined,
  },
  {
    value: 2,
    label: "Total Cost",
    subtitle: "Total cost of available treatment ",
    Icon: FaMoneyBill,
  },
  {
    value: 3,
    label: "Average Duration",
    subtitle: " is the average duration for a treatment",
    Icon: FaRegTimesCircle,
  },
];

export const hospitalInputs = (adminOptions) => {
  return [
    {
      value: 1,
      label: "Admin Name",
      name: "AdminID",
      type: "select",
      validationfn: "",
      require: true,
      options: adminOptions,
    },
    {
      value: 2,
      label: "Name",
      name: "Name",
      type: "text",
      validationfn: "",
      require: true,
    },
    {
      value: 3,
      label: "Email",
      name: "Email",
      type: "email",
      validationfn: validateEmail,
      require: true,
    },
    {
      value: 4,
      label: "Website",
      name: "Website",
      type: "text",
      validationfn: "",
      require: true,
    },
    {
      value: 5,
      label: "City",
      name: "City",
      type: "text",
      validationfn: "",
      require: true,
    },
    {
      value: 6,
      label: "State",
      name: "State",
      type: "text",
      validationfn: "",
      require: false,
    },
    {
      value: 7,
      label: "Location",
      name: "Location",
      type: "text",
      validationfn: "",
      require: true,
    },
    {
      value: 8,
      label: "ZipCode",
      name: "ZipCode",
      type: "number",
      validationfn: "",
      require: false,
    },
    {
      value: 9,
      label: "Contact",
      name: "Contact",
      type: "text",
      validationfn: validatePhoneNumber,
      require: true,
    },
  ];
};
export const departmentInputs = [
  {
    value: 1,
    label: "Name",
    type: "text",
    name: "Name",
    require: true,
    validationfn: "",
  },
  {
    value: 2,
    label: "Location",
    type: "text",
    name: "Location",
    require: false,
    validationfn: "",
  },
  {
    value: 3,
    label: "Contact",
    type: "text",
    name: "Contact",
    require: true,
    validationfn: validatePhoneNumber,
  },
];

export const medicinesAttributes = [
  {
    value: 1,
    label: "Name",
    type: "text",
    name: "Name",
    require: true,
    validationfn: "",
  },
  {
    value: 2,
    label: "Description",
    type: "textarea",
    name: "Description",
    require: false,
    validationfn: "",
  },
  {
    value: 3,
    label: "Manufacturer",
    type: "text",
    name: "Manufacturer",
    require: false,
    validationfn: "",
  },
  {
    value: 4,
    label: "Price",
    type: "number",
    name: "Price",
    require: true,
    validationfn: "",
  },
  {
    value: 5,
    label: "Dosage",
    type: "number",
    name: "Dosage",
    require: true,
    validationfn: "",
  },
  {
    value: 6,
    label: "Quantity",
    type: "number",
    name: "Quantity",
    require: true,
    validationfn: "",
  },
];

export const prescriptionAttributes = (treatmentOptions, symptomOptions) => {
  return [
    {
      value: 2,
      label: "Treatment Name",
      type: "select",
      name: "TreatmentID",
      require: false,
      validationfn: "",
      options: treatmentOptions,
    },
    {
      value: 3,
      label: "Symptom Name",
      type: "select",
      name: "SymptomID",
      require: false,
      validationfn: "",
      options: symptomOptions,
    },
    {
      value: 5,
      label: "Diagnosis",
      type: "text",
      name: "Diagnosis",
      require: false,
      validationfn: "",
    },
    {
      value: 6,
      label: "CaseType",
      type: "radio",
      name: "CaseType",
      require: true,
      validationfn: "",
    },
    {
      value: 7,
      label: "DateStarted",
      type: "date",
      name: "DateStarted",
      require: true,
      validationfn: "",
    },
    {
      value: 8,
      label: "Advice",
      type: "text",
      name: "Advice",
      require: false,
      validationfn: "",
    },
  ];
};
export const patientMedicineAttributes = [
  {
    value: 1,
    label: "DosageTime",
    type: "text",
    name: "DosageTime",
    require: false,
    validationfn: validateTime,
  },
  {
    value: 2,
    label: "DosageQuantity",
    type: "number",
    name: "DosageQuantity",
    require: true,
    validationfn: validateNumber,
  },
  {
    value: 3,
    label: "DosageDuration",
    type: "date",
    name: "DosageDuration",
    require: false,
  },
];

export const treatmentAttributes = (options) => {
  return [
    {
      value: 1,
      label: "Name",
      type: "text",
      name: "Name",
      require: true,
      validationfn: "",
    },
    {
      value: 2,
      label: "Description",
      type: "text",
      name: "Description",
      require: true,
      validationfn: "",
    },
    {
      value: 3,
      label: "Department Name",
      type: "select",
      name: "DepartmentID",
      require: true,
      validationfn: "",
      options: options,
    },
    {
      value: 4,
      label: "Cost",
      type: "number",
      name: "Cost",
      require: true,
      validationfn: "",
    },
    {
      value: 5,
      label: "Duration",
      type: "number",
      name: "Duration",
      require: true,
      validationfn: "",
    },
  ];
};
export const invoiceAttributes = [
  {
    value: 1,
    label: "PrescriptionID",
    type: "number",
    name: "PrescriptionID",
    require: true,
    validationfn: "",
  },
  {
    value: 2,
    label: "TotalAmount",
    type: "number",
    name: "TotalAmount",
    require: true,
    validationfn: "",
  },
  {
    value: 3,
    label: "PaymentStatus",
    type: "number",
    name: "PaymentStatus",
    require: true,
    validationfn: "",
  },
  {
    value: 4,
    label: "DateIssued",
    type: "datetime",
    name: "DateIssued",
    require: true,
    validationfn: "",
  },
];
export const appointmentAttributes = [
  {
    value: 4,
    label: "AppointmentDate",
    type: "date",
    name: "AppointmentDate",
    require: true,
    validationfn: "",
  },
];

export const assignDoctor = (options) => {
  return {
    value: 1,
    label: "Department Name",
    type: "select",
    name: "DepartmentID",
    require: true,
    validationfn: "",
    options: options,
  };
};
export const medicineCards = [
  {
    value: 1,
    label: "Total Medicines",
    Icon: FaMedkit,
  },
  {
    value: 2,
    label: "Medicines Stock",
    Icon: FaCapsules,
  },
  {
    value: 3,
    label: "Total Expenditure",
    Icon: FaMoneyBill,
  },
];
// export const treatmentCards = [
//   {
//     value: 1,
//     label: "Total Medicines",
//     Icon: FaMedkit,
//   },
//   {
//     value: 2,
//     label: "Medicines Stock",
//     Icon: FaCapsules,
//   },
//   {
//     value: 3,
//     label: "Total Expenditure",
//     Icon: FaMoneyBill,
//   },
// ];

export const departmentChartCards = (params) => {
  [
    {
      Icon: iconComponents.patients,
      title: "Total Patients",
      data: params.data || [],
      labels: params.labels || [],
      label: params.label || "",
    },
    {
      Icon: iconComponents.appointments,
      title: "Appointments",
      data: params.data || [],
      labels: params.labels || [],
      label: params.label || "",
    },
    {
      Icon: iconComponents.invoices,
      title: "Perscriptions",
      data: params.data || [],
      labels: params.labels || [],
      label: params.label || "",
    },
    {
      Icon: iconComponents.medicines,
      title: "Total Earnings",
      data: params.data || [],
      labels: params.labels || [],
      label: params.label || "",
    },
  ];
};

export const hospitalAdminChartCards = (params) => {
  [
    {
      Icon: iconComponents.patients,
      title: "Total Patients",
      data: params.patientData || [],
      labels: params.patientLabels || [],
      label: "Patient",
    },
    {
      Icon: iconComponents.doctors,
      title: "Total Doctors",
      data: params.doctorsData || [],
      labels: params.doctorLabels || [],
      label: "Doctor",
    },
    {
      Icon: iconComponents.invoices,
      title: "Perscriptions",
      data: params.prescriptionsData || [],
      labels: params.prescriptionLabels || [],
      label: "Prescription" || "",
    },
    {
      Icon: FaMoneyBill,
      title: "Total Earnings",
      data: params.earningsData || [],
      labels: params.earningLabels || [],
      label: "Earnings",
    },
  ];
};

export const departmentCards = [
  {
    label: "Total Departments",
    Icon: iconComponents.departments,
    subtitle: "Hospital has ",
  },
  {
    label: "Available Doctors",
    Icon: iconComponents.doctors,
    subtitle: "Number of available doctors are",
  },
  {
    label: "Total Earnings",
    Icon: FaMoneyBill,
    subtitle: " are the earnings of all the departments ",
  },
];
export const hospitalCards = [
  {
    label: "Total Hospitals",
    Icon: iconComponents.hospital,
    subtitle: "System has ",
  },
  {
    label: "Available Doctors",
    Icon: iconComponents.doctors,
    subtitle: "Number of available doctors are",
  },
  {
    label: "Total Earnings",
    Icon: FaMoneyBill,
    subtitle: " are the earnings of all the hospitals ",
  },
];

export const doctorCards = [
  {
    label: "Total Doctors",
    Icon: iconComponents.departments,
    subtitle: "Hospital has ",
  },
  {
    label: "Available Doctors",
    Icon: iconComponents.doctors,
    subtitle: "Number of available doctors are",
  },
  {
    label: "Average Earnings",
    Icon: iconComponents.patients,
    subtitle: " are average earnings",
  },
];

export const appointmentCards = [
  {
    label: "Total Appointments",
    Icon: iconComponents.appointments,
    subtitle: "Total appointments are  ",
  },
  {
    label: "Pending Appointments",
    Icon: FaRegTimesCircle,
    subtitle: " appointments are pending",
  },
  {
    label: "Done Appointments",
    Icon: FaRegCheckCircle,
    subtitle: " appointments completed",
  },
];

export const invoiceCards = [
  {
    label: "Total Invoices",
    Icon: iconComponents.invoices,
    subtitle: "Total Invoices are  ",
  },
  {
    label: "Unpaid Invoices",
    Icon: FaRegTimesCircle,
    subtitle: " invoices are unpaid",
  },
  {
    label: "Paid Invoices",
    Icon: FaRegCheckCircle,
    subtitle: " invoices paid",
  },
];
// Function to get specializations based on qualification

// ? found.specializations : [];
// Example usage
// console.log(getSpecializations("MBBS")); // Output: ["General Medicine", "General Surgery", "Pediatrics"]
// console.log(getSpecializations("MD")); // Output: ["Cardiology", "Oncology", "Neurology"]
// console.log(getSpecializations("DO")); // Output: ["Family Medicine", "Osteopathic Manipulative Medicine", "Internal Medicine"]
// console.log(getSpecializations("BDS")); // Output: ["General Dentistry", "Orthodontics", "Pediatric Dentistry", "Oral and Maxillofacial Radiology", "Oral Pathology", "Public Health Dentistry"]
// console.log(getSpecializations("PhD"));

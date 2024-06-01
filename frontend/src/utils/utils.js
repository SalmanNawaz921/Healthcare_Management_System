import { qualificationSpecializations } from "@/constants/constants";

// Validation Functions

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Invalid Email");
  return true;
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (!passwordRegex.test(password))
    throw new Error(
      `Password must contain at least 8 characters\n` +
        `One uppercase letter\n` +
        `One lowercase letter\n` +
        `One number\n` +
        `One special character`
    );
  return true;
};

export const validatecPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) throw new Error("Passwords do not match");
  return true;
};
export const validateExperience = (str) => {
  const regex = /^\d+ years$/;
  if (!regex.test(str))
    throw new Error("Experience should be in `x years` format");
  return true;
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\d{3}-)?\d{4}-\d{4}$/;
  if (!phoneRegex.test(phoneNumber))
    throw new Error(
      "Phone Number must be in the format XXXX-XXXX-XXXX or XXX-XXXX-XXXX"
    );
  return true;
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]*$/;
  if (!nameRegex.test(name))
    throw new Error("Name should only contain alphabets");
  return true;
};

export const usernameValidation = (username) => {
  const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;'"?><,.\/|\\~-]*$/;
  if (!usernameRegex.test(username))
    throw new Error("Username should only contain alphabets and numbers");
  return true;
};

export const validateDuration = (duration) => {
  const durationRegex = /^\d+ Weeks$/;
  if (!durationRegex.test(duration))
    throw new Error("Duration should be in `x Weeks` format");
  return true;
};

export const validateTime = (time) => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] (am|pm)$/i;
  if (!timeRegex.test(time))
    throw new Error("Time should be in `hh:mm am/pm` format");
  return true;
};
export const validateNumber = (number) => {
  const numberRegex = /^\d+$/;
  if (!numberRegex.test(number)) throw new Error("Number should be in digits");
  return true;
};

export const getSpecializations = (qualification) => {
  const found = qualificationSpecializations.find(
    (qual) => qual.qualification === qualification
  );
  return found;
};

export const formatTimeToAmPm = (dateString) => {
  const date = new Date(dateString);
  const localHours = date.getUTCHours();
  const localMinutes = date.getUTCMinutes();
  const hours = localHours % 12 || 12; // Convert hours to 12-hour format
  const ampm = localHours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours}:${
    localMinutes < 10 ? "0" : ""
  }${localMinutes} ${ampm}`;
  return formattedTime;
};

export const getDateDiff = (dateString) => {
  const date = new Date(dateString);
  const todayDate = new Date();
  const todayHours = todayDate.getHours();
  const localHours = date.getUTCHours();
  return localHours - todayHours;
};

export const isEqualToToday = (dateString) => {
  const date = new Date(dateString).getUTCDay();
  const todayDate = new Date().getDay();
  return date === todayDate;
};

export const sortAscending = (data, sortingKey) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a[sortingKey]) - new Date(b[sortingKey])
  );
  return sortedData;
};

export const sortDescending = (data, sortingKey) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(b[sortingKey]) - new Date(a[sortingKey])
  );
  return sortedData;
};

export const sortData = (data, sortingKey, val) => {
  const sortedData = data?.filter((newData) => {
    return newData?.[sortingKey].toLowerCase() === val;
  });
  return sortedData;
};

export const getComponents = (role) => {
  switch (role) {
    case 1:
      return "MainAdminInfo";
    case 2:
      return "HospitalAdminInfo";
    case 3:
      return "DoctorInfo";
    case 4:
      return "PatientInfo";
  }
};

export const months = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};

export const allMonths = Array.from({ length: 12 }, (_, index) => {
  const date = new Date();
  date.setMonth(index);
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
});

export const searchByKey = (data, keyToSearch, val) => {
  const filteredData = data.filter((data) => {
    if (typeof data[keyToSearch] === "number")
      return data[keyToSearch].toString().includes(val);
    return data[keyToSearch].toLowerCase().includes(val.toLowerCase());
  });
  return filteredData;
};

export const convertDateToMonth = (date) => {
  // Extract the month from the date string
  const month = new Date(date).getMonth();
  // Convert month number to month name
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(0, month)); // Create a date object with year 0 to get the month name
  return monthName;
};

export const calculateEarningsByMonth = (data, date, earnings) => {
  let earningsByMonth = earnings ? months : {};
  data?.forEach((entry) => {
    const monthName = convertDateToMonth(entry?.[date]);
    if (earnings) {
      earningsByMonth[monthName] += entry?.[earnings];
    } else {
      if (earningsByMonth[monthName]) earningsByMonth[monthName]++;
      else earningsByMonth[monthName] = 1;
    }
  });
  return earningsByMonth;
};

// more validation functions will be added if needed

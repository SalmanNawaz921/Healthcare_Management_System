import {
  doctorInputs,
  personalInfoInputs,
  petientInfoInputs,
} from "@/constants/constants";
const DetailsComponent = ({
  data,
  type,
  isSuccess,
  id,
  details,
  Component,
}) => {
  const divComponent = () => {
    return (
      <div className="">
        <h1 className="text-center text-3xl mb-10 font-poppins">{type}</h1>
        {!Component && (
          <div className="grid  grid-cols-2 gap-4 py-6  pl-32">
            {type === "Personal Information" &&
              personalInfoInputs.map(
                (input, i) =>
                  details?.[input.label] && (
                    <div key={i} className="text-lg font-poppins mb-5">
                      <span className="font-semibold">{input.label}</span> :{" "}
                      {input.label === "Gender"
                        ? details?.[input.label] === 5
                          ? "Male"
                          : "Female"
                        : details?.[input.label]}
                    </div>
                  )
              )}
            {type === "Patient Information" &&
              petientInfoInputs(null)?.map(
                (input, i) =>
                  details?.[input.label] && (
                    <div key={i} className="text-lg font-poppins mb-5">
                      <span className="font-semibold">{input.label}</span> :{" "}
                      {input.label === "Description" ||
                      input.label === "MedicalHistory"
                        ? details?.[input.label].slice(0, 20)
                        : details?.[input.label]}
                    </div>
                  )
              )}
            {type === "Doctor Information" &&
              doctorInputs(null)?.map(
                (input, i) =>
                  details?.[input.label] && (
                    <div key={i} className="text-lg font-poppins mb-5">
                      <span className="font-semibold">{input.label}</span> :{" "}
                      {input.label === "Description" ||
                      input.label === "MedicalHistory"
                        ? details?.[input.label].slice(0, 20)
                        : details?.[input.label]}
                    </div>
                  )
              )}
          </div>
        )}
        {Component}
      </div>
    );
  };

  return (
    <div>
      <div className="">{divComponent()}</div>
    </div>
  );
};

export default DetailsComponent;

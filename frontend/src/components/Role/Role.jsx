// import { users } from "@/constants/constants";
// import roleContext from "@/context/RoleContext/roleContext";
// import React, { useContext, useState } from "react";
// import { useEffect } from "react";
// const Role = () => {
//   const [toggle, setToggle] = useState("Main Admin");
//   const [role, setRole] = useState(1);
//   const { saveRole } = useContext(roleContext);
//   useEffect(() => {
//     if (toggle == "Main Admin") {
//       setRole(1);
//     } else if (toggle == "Hospital Admin") {
//       setRole(2);
//     } else if (toggle == "Doctor") {
//       setRole(3);
//     } else if (toggle == "Patient") {
//       setRole(4);
//     }
//     saveRole(role);
//   });
//   return (
//     <>
//       <div className="flex flex-wrap bg-bgsecondary w-fit justify-between rounded overflow-y-hidden">
//         {users.map(({ value, name }) => (
//           <button
//             onClick={() => {
//               setToggle(name);
//             }}
//             key={value}
//             className={toggle === name ? "toggle" : "notToggle"}
//           >
//             {name}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Role;

import { users } from "@/constants/constants";
import roleContext from "@/context/RoleContext/roleContext";
import React, { useContext, useEffect, useState } from "react";

const Role = () => {
  const [toggle, setToggle] = useState("Main Admin");
  const [role, setRole] = useState(() => {
    // Retrieve the last selected role from cookies
    const savedRole = localStorage.getItem("selectedRole");
    // Return the role value if found, otherwise default to 1
    return savedRole ? parseInt(savedRole) : 1;
  });
  const { saveRole } = useContext(roleContext);

  useEffect(() => {
    const roleMapping = {
      "Main Admin": 1,
      "Hospital Admin": 2,
      Doctor: 3,
      Patient: 4,
    };

    setRole(roleMapping[toggle]);
    // Save the selected role to cookies
    localStorage.setItem("selectedRole", roleMapping[toggle]);

    saveRole(role);
  }, [toggle, role, saveRole]);

  return (
    <>
      <div className="flex flex-wrap bg-bgsecondary w-fit justify-between rounded overflow-y-hidden">
        {users.map(({ value, name }) => (
          <button
            onClick={() => setToggle(name)}
            key={value}
            className={toggle === name ? "toggle" : "notToggle"}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Role;

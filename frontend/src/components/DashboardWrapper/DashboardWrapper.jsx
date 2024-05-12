import React from "react";

const DashboardWrapper = ({
  TopComponents,
  MiddleComponent,
  BottomComponent,
  SideComponent,
}) => {
  return (
    <div className="xs:px-8 px-2">
      {TopComponents}
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-6 w-full">
          <div className={`bg-white rounded-xl border-[1px] border-border ${BottomComponent?"":"p-8"} shadow-2xl`}>
            {MiddleComponent}
          </div>
          {BottomComponent && (
            <div className="mt-6 bg-white py-4 shadow-2xl rounded-xl">
              {BottomComponent}
            </div>
          )}
        </div>
        <div
          data-aos=""
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6 aos-init "
        >
          {SideComponent}
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;

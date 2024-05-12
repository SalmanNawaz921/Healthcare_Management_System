const DetailsWrapper = ({ LeftComponent, RightComponent, handleClick }) => {
  return (
    <div className=" grid grid-cols-12 gap-6 my-8 items-start">
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28 aos-init aos-animate shadow-xl "
      >
        {LeftComponent && <LeftComponent />}
      </div>
      <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6 aos-init aos-animate shadow-2xl">
        <div className="">{RightComponent && <RightComponent />}</div>
      </div>
    </div>
  );
};

export default DetailsWrapper;

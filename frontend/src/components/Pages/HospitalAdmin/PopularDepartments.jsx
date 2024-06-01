import SideCard from "@/components/SideCard/SideCard";
import { Card } from "antd";

const PopularDepartments = ({data}) => {
  return (
    <Card className="bg-white rounded-xl border-[1px] border-border shadow-2xl">
      <h2 className="font-poppins mb-4">Popular Departments</h2>
      {data?.slice().sort((a,b)=>b?.Earnings-a?.Earnings)?.slice(0, 5)?.map((dep, i) => (
        <SideCard
          key={i}
          name={dep?.["Name"]}
          contact={dep?.["Contact"]}
          time={dep?.["Hospital Name"]}
        />
      ))}
    </Card>
  );
};

export default PopularDepartments;

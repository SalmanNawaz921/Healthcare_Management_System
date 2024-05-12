import React from "react";
import StyledCard from "./Card";
import {
  useGetDoctorsEarningsQuery,
  useGetDoctorsQuery,
  useGetInvoicesQuery,
} from "@/redux/services/api/hospitalAdminApi";
import {
  appointmentCards,
  doctorCards,
  invoiceCards,
} from "@/constants/constants";
import { useAppointmentCrud } from "@/hooks/useAppointmentCrud";

const InvoiceCards = ({data,authToken}) => {


  const arr = [
    data?.length,
    data?.filter((d) => d.Status === "Unpaid").length,
    data?.filter((d) => d.Status === "Paid").length,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {invoiceCards?.map((invoice, i) => (
        <StyledCard
          key={i}
          Icon={invoice.Icon}
          count={arr[i]}
          subtitle={
            i === 0
              ? `${invoice?.subtitle} ${arr[i]}`
              : i === 1
              ? `${arr[i]} ${invoice?.subtitle} `
              : `${arr[i]} ${invoice?.subtitle}`
          }
          title={invoice?.label}
        />
      ))}
    </div>
  );
};

export default InvoiceCards;

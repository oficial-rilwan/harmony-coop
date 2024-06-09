"use client";

import Layout from "@/components/layout";
import RepaymentRepository, { RepaymentProps } from "@/repository/repaymentRepository";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "";
  const dateTo = searchParams.get("dateTo") || "";
  const dateFrom = searchParams.get("dateFrom") || "";

  const [repayments, setRepayments] = React.useState<RepaymentProps[]>([]);
  const [refetch, setRefetch] = React.useState(false);

  React.useEffect(() => {
    const _repayments = RepaymentRepository.getRepayments();
    setRepayments(_repayments);
  }, [refetch]);

  return (
    <Layout title="Repayments">
      <div className="p-4">
        <div className="p-4 bg-light mb-4">
          <div className="row">
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">Loan Type:</label>
              <select
                required
                className="form-select"
                value={type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option disabled value="">
                  Loan Type
                </option>
                {loanTypes().map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>{" "}
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">From:</label>

              <input
                className="form-control"
                type="date"
                value={dateFrom}
                onChange={(e) => handleChange("dateFrom", e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3 mb-3">
              <label className="form-label">To:</label>

              <input
                type="date"
                className="form-control"
                value={dateTo}
                onChange={(e) => handleChange("dateTo", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="border p-3 mb-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="fw-semibold">
                  # Loan ID
                </th>
                <th scope="col" className="fw-semibold">
                  Loan Type
                </th>
                <th scope="col" className="fw-semibold">
                  Repayment Date
                </th>
                <th scope="col" className="fw-semibold">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {repayments.map((item) => (
                <tr key={item.id} className="cursor-pointer">
                  <th scope="row" className="fw-semibold">
                    {item.id}
                  </th>
                  <td>{item?.loan?.loanType}</td>
                  <td className="text-nowrap">{moment(item.createdAt).format("Do MMMM, YYYY")}</td>
                  <td>{currencyFormat(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {repayments.length ? null : (
            <React.Fragment>
              <div className="text-center text-secondary p-5">No Data</div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Layout>
  );

  function handleChange(name: string, value: any) {
    if (name.includes("date")) value = moment(value).format("YYYY-MM-DD");

    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    params.toString();
    router.replace(window.location.pathname + "?" + params);
  }

  function loanTypes() {
    return ["Personal Loan", "Auto Loan", "Student Loan", "Mortgage Loan"];
  }

  function currencyFormat(amount: number) {
    if (!amount) amount = 0;
    return Number(amount).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
};

export default Page;

"use client";

import Layout from "@/components/layout";
import LoanRepository, { LoanProps } from "@/repository/loanRepository";
import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import Link from "next/link";
import { calculateLoanDetails, currencyFormat, interestRates, loanTypes } from "@/utils";
import UserRepository from "@/repository/userRepository";
import { usePathname, useRouter } from "next/navigation";
import EmptyState from "@/components/empty-state";

Chart.register(CategoryScale);

type LoanType = "Personal Loan" | "Auto Loan" | "Student Loan" | "Mortgage Loan";

const initialValues = {
  loanType: "Personal Loan" as LoanType,
  amount: "",
  interestRate: "",
  term: "3",
  status: "",
  downPayment: "0",
};
const user = UserRepository.user;

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const loansSectionRef: any = React.useRef();
  const [values, setValues] = React.useState(initialValues);
  const [loans, setLoans] = React.useState<LoanProps[]>([]);
  const [refetch, setRefetch] = React.useState(false);
  const result = calculateLoanDetails(values);

  React.useEffect(() => {
    const _loans = LoanRepository.getLoans();
    setLoans(_loans);
  }, [refetch]);

  if (!user) return router.push("/account/signin");

  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        label: "",
        data: [result.principal, result.totalInterest],
        backgroundColor: ["#2b7ddb", "#8bbc21"],
      },
    ],
  };
  return (
    <Layout title={"Loan Application"}>
      <div className="p-4">
        <div className="text-secondary">{moment().format("Do MMMM, YYYY")}</div>
        <div className="fw-semibold fs-4 mb-4">Loan Overview</div>
        <div className="">
          <div className="border mb-5">
            <div className="row">
              <div className="col-12 col-md-5">
                <form className="p-3" onSubmit={save}>
                  <div className="mb-3">
                    <div className="form-label">
                      Loan Type <span className="text-danger">*</span>
                    </div>
                    <select
                      required
                      className="form-select"
                      value={values.loanType}
                      onChange={(e) => handleChange("loanType", e.target.value)}
                    >
                      <option disabled value="">
                        Loan Type
                      </option>
                      {loanTypes().map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <div className="form-label">
                      Loan Amount <span className="text-danger">*</span>
                    </div>
                    <input
                      required
                      value={values.amount}
                      onChange={(e) => handleChange("amount", e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <div className="form-label">
                      Down Payment <span className="text-danger">*</span>
                    </div>

                    <div className="input-group">
                      <span className="input-group-text">{result.downPaymentPercent}%</span>
                      <input
                        type="number"
                        className="form-control"
                        value={values.downPayment}
                        min={0}
                        max={Number(values.amount)}
                        onChange={(e) => handleChange("downPayment", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-label">
                      Interest Rate <span className="text-danger">*</span>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">%</span>
                      <input
                        disabled
                        required
                        type="number"
                        className="form-control bg-light"
                        value={interestRates()[values.loanType]}
                        onChange={(e) => handleChange("", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="form-label">
                      Loan term in months <span className="text-danger">*</span>
                    </div>
                    <input
                      type="number"
                      min={1}
                      pattern="[0-9]"
                      className="form-control"
                      value={values.term}
                      onChange={(e) => handleChange("term", e.target.value)}
                    />
                  </div>
                  <button className="btn_primary w-100">Submit</button>
                </form>
              </div>
              <div className="col-12 col-md-7 bg-light">
                <div className="p-3">
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="text-secondary fw-medium">Payment Every Month</div>
                      <div className="fw-semibold fs-3">{currencyFormat(result.estimatedMonthlyPayment)}</div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-secondary fw-medium">Total of {result.loanTerm || 0} Payments</div>
                      <div className="fw-semibold fs-3">{currencyFormat(result.totalLoanAmount)}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="text-secondary fw-medium">Total Interest</div>
                      <div className="fw-semibold fs-3">{currencyFormat(result.totalInterest)}</div>
                    </div>
                    <div className="col-6 mb-3"></div>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                  </div>
                  <div className="text-secondary">
                    You can extend your loan or close it early at any time. Amount per month include borrowed plus
                    interest
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fw-semibold fs-3 mb-2" id="loans">
          Loans
        </div>
        <a href="#loans" ref={loansSectionRef} className="d-none" />
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
                  Origination Date
                </th>
                <th scope="col" className="fw-semibold">
                  Amount
                </th>

                <th scope="col" className="fw-semibold">
                  Interest Rate(%)
                </th>
                <th scope="col" className="fw-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {loans.map((item) => (
                <tr key={item.id} className="cursor-pointer">
                  <th scope="row" className="fw-semibold">
                    {item.id}
                  </th>
                  <td>{item.loanType}</td>
                  <td className="text-nowrap">{moment(item.createdAt).format("Do MMMM, YYYY")}</td>
                  <td>{currencyFormat(item.amount)}</td>

                  <td>{item.interestRate}%</td>
                  <td>
                    <Link href={pathname + "/" + item.id} className="fw-semibold text-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <EmptyState show={!loans.length} />
        </div>
      </div>
    </Layout>
  );

  function save(e: React.FormEvent) {
    e.preventDefault();
    const data = { ...values } as any;
    data.interestRate = interestRates()[data.loanType as LoanType];
    data.breakdown = result;

    const loan = LoanRepository.create(data);
    if (!loan) return;
    setRefetch((prev) => !prev);
    toast.success("Loan request saved successfully.");
    setValues(initialValues);
    loansSectionRef.current?.click();
  }

  function handleChange(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }
};

export default Page;

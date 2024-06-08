"use client";

import Layout from "@/components/layout";
import LoanRepository, { LoanProps } from "@/repository/loanRepository";
import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

type LoanType = "Personal Loan" | "Auto Loan" | "Student Loan" | "Mortgage Loan";
interface Values {
  amount: string;
  loanType: LoanType;
}

const initialValues = {
  loanType: "Personal Loan" as LoanType,
  amount: "",
  interestRate: "",
  term: "3",
  status: "",
  downPayment: "0",
};
const Page = () => {
  const [values, setValues] = React.useState(initialValues);
  const [loans, setLoans] = React.useState<LoanProps[]>([]);
  const [refetch, setRefetch] = React.useState(false);
  const result = calculateLoanDetails();
  console.log(result);
  React.useEffect(() => {
    const _loans = LoanRepository.getLoans();
    setLoans(_loans);
  }, [refetch]);

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
    <Layout>
      <div className="p-4">
        <div className="text-secondary">{moment().format("Do MMMM, YYYY")}</div>
        <div className="fw-semibold fs-4 mb-4">Loan Overview</div>
        <div className="">
          <div className="border __shadow mb-5">
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
                    <Pie data={chartData} />
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
        <div className="fw-semibold fs-3 mb-2">Loans</div>
        <div className="border __shadow p-3 mb-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Loan Type</th>
                <th scope="col">Date Created</th>
                <th scope="col">Amount</th>
                <th scope="col">Down Payment</th>
                <th scope="col">Interest Rate(%)</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.loanType}</td>
                  <td className="text-nowrap">{moment(item.createdAt).format("Do MMMM, YYYY")}</td>
                  <td>{currencyFormat(item.amount)}</td>
                  <td>{currencyFormat(item.downPayment)}</td>
                  <td>{item.interestRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {loans.length ? null : (
            <React.Fragment>
              <div className="text-center text-secondary p-5">No Data</div>
            </React.Fragment>
          )}
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
  }

  function handleChange(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function loanTypes() {
    return ["Personal Loan", "Auto Loan", "Student Loan", "Mortgage Loan"];
  }
  function interestRates(): Record<LoanType, number> {
    return {
      "Personal Loan": 10,
      "Auto Loan": 10.75,
      "Student Loan": 8.3,
      "Mortgage Loan": 8.9,
    };
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

  function calculateLoanDetails() {
    const loanTerm = Number(values.term);
    const amount = Number(values.amount || 0);
    const downPayment = Number(values.downPayment);
    const interestRate = interestRates()[values.loanType];

    const principal = amount - downPayment;
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;

    const estimatedMonthlyPayment =
      (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));
    const totalLoanAmount = estimatedMonthlyPayment * loanTerm;
    const totalInterest = totalLoanAmount - principal;

    const downPaymentPercent = !downPayment ? 0 : (downPayment / amount) * 100;
    return {
      loanTerm,
      principal: principal,
      downPaymentAmount: downPayment,
      annualInterest: annualInterestRate * principal,
      monthlyInterest: monthlyInterestRate * principal,
      totalInterest: totalInterest,
      totalLoanAmount: totalLoanAmount,
      estimatedMonthlyPayment: estimatedMonthlyPayment,
      downPaymentPercent: downPaymentPercent.toFixed(2),
    };
  }
};

export default Page;

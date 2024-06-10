"use client";

import Layout from "@/components/layout";
import LoanRepository, { LoanProps } from "@/repository/loanRepository";
import { calculateMaturityDate, currencyFormat } from "@/utils";
import moment from "moment";
import React from "react";
import RecordPayment from "./components/record-payment";
import RepaymentRepository, { RepaymentProps } from "@/repository/repaymentRepository";
import EmptyState from "@/components/empty-state";
import UserRepository from "@/repository/userRepository";
import { useRouter } from "next/navigation";

const user = UserRepository.user;

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [refetch, setRefetch] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loan, setLoan] = React.useState<LoanProps | null>(null);
  const [repayments, setRepayments] = React.useState<RepaymentProps[]>([]);

  React.useEffect(() => {
    if (!user) return router.push("/account/signin");
    //eslint-disable-next-line
  }, [user]);

  React.useEffect(() => {
    const _loan = LoanRepository.findById(params.id);
    setLoan(_loan as LoanProps);
    const _repayments = RepaymentRepository.getRepayments({ loanId: params.id } as any);
    setRepayments(_repayments);
  }, [refetch, params.id]);
  return (
    <Layout title={"Loan Application"}>
      <div className="p-4">
        <div className="d-flex justify-content-between gap-4 align-items-start">
          <div>
            <div className="text-secondary">{moment().format("Do MMMM, YYYY")}</div>
            <div className="fw-semibold fs-4 mb-4">Loan ID: {params.id}</div>
          </div>
          <button className="btn_primary" onClick={() => setIsOpen(true)}>
            Record Payment
          </button>
        </div>

        <div className="">
          <div className="border mb-5 bg-light p-4">
            <div className="mb-3 fs-sm text-secondary">Loan Amount</div>
            <div className="mb-3 fw-semibold fs-3">{currencyFormat(loan?.amount as number)}</div>
            <div className="row mb-4">
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Monthly Interest</div>
                  <div className="fw-semibold">{currencyFormat(loan?.breakdown.monthlyInterest as number)}</div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Loan Term</div>
                  <div className="fw-semibold">{loan?.term} month(s)</div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Total Repayment</div>
                  <div className="fw-semibold">{currencyFormat(loan?.breakdown.totalLoanAmount as number)}</div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Origination Date</div>
                  <div className="fw-semibold">{moment(loan?.createdAt).format("Do MMMM, YYYY")}</div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Total Interest</div>
                  <div className="fw-semibold">{currencyFormat(loan?.breakdown.totalInterest as number)}</div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Rate</div>
                  <div className="fw-semibold">{loan?.interestRate}%</div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Maturity Date</div>
                  <div className="fw-semibold">
                    {calculateMaturityDate(loan?.createdAt as Date, loan?.term as number)}
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-3">
                <div>
                  <div className="text-secondary fs-sm">Balance</div>
                  <div className="fw-semibold">{currencyFormat(loan?.breakdown?.balance as number)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fw-semibold fs-3 mb-2" id="loans">
          Repayments
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
          <EmptyState show={!repayments.length} />
        </div>
      </div>
      <RecordPayment
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        refetch={() => setRefetch((prev) => !prev)}
        loan={loan as LoanProps}
      />
    </Layout>
  );
};

export default Page;

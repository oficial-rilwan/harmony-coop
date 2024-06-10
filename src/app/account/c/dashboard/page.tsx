"use client";
import EmptyState from "@/components/empty-state";
import Layout from "@/components/layout";
import LoanRepository, { LoanProps } from "@/repository/loanRepository";
import RepaymentRepository, { RepaymentProps } from "@/repository/repaymentRepository";
import UserRepository from "@/repository/userRepository";
import { currencyFormat } from "@/utils";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { FaMoneyBill } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

Chart.register(CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend);

const barChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  barPercentage: 0.3,
};

interface MonthlyStatProps {
  month: string;
  amount: number;
  count: number;
}
const user = UserRepository.user;
const Page = () => {
  const router = useRouter();
  const [loans, setLoans] = React.useState<LoanProps[]>([]);
  const [monthlyStats, setMonthlyStats] = React.useState<MonthlyStatProps[]>([]);
  const [repaymentMonthlyStats, setRepaymentMonthlyStats] = React.useState<MonthlyStatProps[]>([]);
  const [repayments, setRepayments] = React.useState<RepaymentProps[]>([]);
  const [stats, setStats] = React.useState({
    loans: 0,
    repayments: 0,
    loanApplications: 0,
    balance: 0,
  });

  React.useEffect(() => {
    const _stats = LoanRepository.stats();
    const _monthlyStats = LoanRepository.monthlyStats();
    const _repaymentMonthlyStats = RepaymentRepository.monthlyStats();
    const _repayments = RepaymentRepository.getRepayments();
    const _loans = LoanRepository.getLoans();
    setLoans(_loans);
    setStats(_stats);
    setRepayments(_repayments);
    setMonthlyStats(_monthlyStats);
    setRepaymentMonthlyStats(_repaymentMonthlyStats);
  }, []);

  if (!user) return router.push("/account/signin");

  const chartData = {
    labels: repaymentMonthlyStats.map((item) => item.month),
    datasets: [
      {
        label: "Repayments",
        data: repaymentMonthlyStats.map((item) => item.amount),
        backgroundColor: "#007bff",
      },
    ],
  };

  const loansChartData = {
    labels: ["Loans", "Repayments"],
    datasets: [
      {
        label: "",
        data: [stats.loans, stats.repayments],
        backgroundColor: ["#2b7ddb", "#8bbc21"],
      },
    ],
  };
  return (
    <Layout title="Dashboard">
      <div className="p-4">
        <div className="text-secondary">{moment().format("Do MMMM, YYYY")}</div>
        <div className="fw-semibold fs-4 mb-3">Welcome back, {user?.firstName} 👋</div>
        <div className="row mb-4 flex-nowrap" style={{ overflowX: "auto" }}>
          <div className="col">
            <div className="border p-3 rounded">
              <div className="d-flex justify-content-between gap-4 mb-3">
                <div className="text-nowrap">Loan Applications</div>
                <div>
                  <GiReceiveMoney size={30} />
                </div>
              </div>
              <div className="fw-semibold fs-4">{stats.loanApplications}</div>
            </div>
          </div>
          <div className="col">
            <div className="border p-3 rounded">
              <div className="d-flex justify-content-between gap-4 mb-3">
                <div className="text-nowrap">Repayments</div>
                <div>
                  <GiPayMoney size={30} />
                </div>
              </div>
              <div className="fw-semibold fs-4">{currencyFormat(stats.repayments)}</div>
            </div>
          </div>
          <div className="col">
            <div className="border p-3 rounded">
              <div className="d-flex justify-content-between gap-4 mb-3">
                <div className="text-nowrap">Balance</div>
                <div>
                  <FaMoneyBill size={30} />
                </div>
              </div>
              <div className="fw-semibold fs-4">{currencyFormat(stats.balance)}</div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 col-md-7">
            <div className="border rounded p-3 h-100">
              <div className="fw-medium text-secondary mb-3">Repayments</div>
              <div className="overflow-auto">
                <Bar data={chartData} width={600} height={300} options={barChartOptions} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="border rounded overflow-hidden h-100">
              <EmptyState show={!repayments.length} />
              <div className="h-100">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div className="">
                    <div className="fw-medium text-secondary mb-3 p-3 pb-0">Repayments</div>
                    {repayments.slice(0, 5).map((item) => (
                      <div className="d-flex gap-4 border-bottom p-3" key={item.id}>
                        <div className="flex-grow-1">
                          <div className="fs-sm">{item.loan?.loanType}</div>
                          <div className="fs-sm text-secondary">{moment(item.createdAt).format("Do MMMM, YYYY")}</div>
                        </div>
                        <div className="fw-semibold fs-sm">{currencyFormat(item.amount)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-light p-3 text-end">
                    <Link href="/acccount/c/repayments">See all</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 col-md-5">
            <div className="border rounded overflow-hidden h-100">
              <EmptyState show={!loans.length} />
              <div className="h-100">
                <div className="d-flex flex-column justify-content-between h-100">
                  <div className="">
                    <div className="fw-medium text-secondary mb-3 p-3 pb-0">Loans</div>
                    {loans.slice(0, 5).map((item) => (
                      <div className="d-flex gap-4 border-bottom p-3" key={item.id}>
                        <div className="flex-grow-1">
                          <div className=" fs-sm">{item?.loanType}</div>
                          <div className="fs-sm text-secondary">{moment(item.createdAt).format("Do MMMM, YYYY")}</div>
                        </div>
                        <div className="fw-semibold fs-sm">{currencyFormat(item.amount)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-light p-3 text-end">
                    <Link href="/acccount/c/loans">See all</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="border rounded p-3 h-100">
              <div className="fw-medium text-secondary mb-3">Loans</div>
              <div className="overflow-auto">
                <Pie data={loansChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

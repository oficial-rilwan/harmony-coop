import { toast } from "react-toastify";
import _ from "lodash";
import UserRepository from "./userRepository";
import RepaymentRepository, { RepaymentProps } from "./repaymentRepository";
import moment from "moment";

type LoanType = "Personal Loan" | "Auto Loan" | "Student Loan" | "Mortgage Loan";

export interface LoanProps {
  id: string;
  userId: string;
  loanType: LoanType;
  amount: number;
  interestRate: number;
  term: number;
  status: "";
  downPayment: number;
  createdAt: Date;
  repayments: RepaymentProps[];
  breakdown: {
    [key: string]: number;
  };
}

class LoanRepository {
  static loans = LoanRepository.getLoans();
  static collection = LoanRepository.getDataFromStorage();

  static create(data: LoanProps) {
    data.id = LoanRepository.generateID();
    data.userId = UserRepository.user?.id as string;
    data.amount = Number(data.amount);
    data.interestRate = Number(data.interestRate);
    data.term = Number(data.term);
    data.downPayment = Number(data.downPayment);
    data.createdAt = new Date();
    data.breakdown["balance"] = data.breakdown?.totalLoanAmount;
    LoanRepository.collection.unshift(data);
    LoanRepository.saveDataToStorage();

    return data;
  }

  static update(data: LoanProps, loanId: string) {
    let loan = LoanRepository.findById(loanId);
    if (!loan) {
      toast.error("Request could not be completed. Invalid loan ID");
      return;
    }

    LoanRepository.collection = LoanRepository.collection.map((item) => {
      if (item.id === loan.id) return data;
      return item;
    });
    LoanRepository.saveDataToStorage();
  }

  static findById(id: string) {
    return LoanRepository.collection.find((item) => item.id === id);
  }

  static findOne(query: LoanProps) {
    const loan = LoanRepository.collection.find((item) => {
      return item.id === query.id;
    });

    if (loan) loan.repayments = RepaymentRepository.getRepayments({ loanId: loan.id } as any);
    return loan;
  }

  static find(query: LoanProps) {
    return LoanRepository.collection.filter((item) => {
      return item.id === query.id;
    });
  }

  static getLoans() {
    const loans = LoanRepository.collection?.filter((item) => {
      return item.userId === UserRepository.user?.id;
    });
    return loans;
  }
  static monthlyStats() {
    const loans = [] as { month: string; amount: number; count: number }[];
    const result = _.groupBy(LoanRepository.collection, (item) => {
      return new Date(item.createdAt).getMonth() + 1;
    });

    for (let key in result) {
      const data = {} as { month: string; amount: number; count: number };
      data.count = result[key].length;
      data.month = moment(key, "M").format("MMMM");
      data.amount = result[key].reduce((a, c) => a + c.amount, 0);
      loans.push(data);
    }
    return loans;
  }

  static stats() {
    let loans = 0;
    let repayments = 0;
    let loanApplications = 0;
    let balance = 0;

    loans = LoanRepository.getLoans().reduce((a, c) => a + c.breakdown?.totalLoanAmount, 0);
    loanApplications = LoanRepository.getLoans().length;
    repayments = RepaymentRepository.getRepayments().reduce((a, c) => a + c.amount, 0);
    return {
      loans,
      repayments,
      loanApplications,
      balance: repayments - loans,
    };
  }

  static getDataFromStorage() {
    let loans = [] as LoanProps[];
    let result = window?.localStorage?.getItem("loans");
    if (result) loans = JSON.parse(result);
    return loans;
  }

  static saveDataToStorage() {
    const loans = JSON.stringify(LoanRepository.collection);
    const data = JSON.stringify(localStorage.setItem("loans", loans));
    return data;
  }

  static generateID() {
    const id = new Date().getTime();
    return String(id);
  }
}

export default LoanRepository;

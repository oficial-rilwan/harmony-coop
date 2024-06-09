import UserRepository from "./userRepository";
import LoanRepository, { LoanProps } from "./loanRepository";
import moment from "moment";
type LoanType = "Personal Loan" | "Auto Loan" | "Student Loan" | "Mortgage Loan";

export interface RepaymentProps {
  id: string;
  userId: string;
  loanId: string;
  loan: LoanProps;
  amount: number;
  createdAt: Date;
}

interface QueryProps extends RepaymentProps {
  dateFrom: string;
  dateTo: string;
  status: string;
  type: LoanType;
}

class RepaymentRepository {
  static repayments = RepaymentRepository.getRepayments();
  static collection = RepaymentRepository.getDataFromStorage();

  static create(data: RepaymentProps) {
    data.id = RepaymentRepository.generateID();
    data.userId = UserRepository.user?.id as string;
    data.amount = Number(data.amount);

    const loan = LoanRepository.findById(data.loanId);
    if (!loan) return;

    data.createdAt = new Date();
    loan.breakdown["balance"] = loan.breakdown.totalLoanAmount - data.amount;

    LoanRepository.update(loan, data.loanId);
    RepaymentRepository.collection.unshift(data);
    RepaymentRepository.saveDataToStorage();

    return data;
  }

  static findById(id: string) {
    return RepaymentRepository.collection.find((item) => {
      return item.id === id;
    });
  }

  static findOne(query: RepaymentProps) {
    return RepaymentRepository.collection.find((item) => {
      if (query.id) return item.id === query.id;
    });
  }

  static find(query: RepaymentProps) {
    return RepaymentRepository.collection.filter((item) => {
      const loan = LoanRepository.findById(item.loanId) as LoanProps;
      if (loan) item.loan = loan;
      return item.id === query.id;
    });
  }

  static getRepayments(query?: QueryProps) {
    const dF = "YYYY-MM-DD";
    let repayments = RepaymentRepository.collection?.map((item) => {
      const loan = LoanRepository.findById(item.loanId) as LoanProps;
      if (loan) item.loan = loan;
      return item;
    });
    repayments = repayments?.filter((item) => {
      return item.userId === UserRepository.user?.id;
    });
    if (query?.loanId) {
      repayments = repayments?.filter((item) => {
        return item.loanId === query.loanId;
      });
    }
    if (query?.dateFrom) {
      repayments = repayments?.filter((item) => {
        return moment(item.createdAt).format(dF) >= moment(query.dateFrom).format(dF);
      });
    }
    if (query?.dateTo) {
      repayments = repayments?.filter((item) => {
        return moment(item.createdAt).format(dF) <= moment(query.dateTo).format(dF);
      });
    }
    if (query?.type) {
      repayments = repayments?.filter((item) => {
        return item.loan.loanType === query.type;
      });
    }
    return repayments;
  }

  static getDataFromStorage() {
    let repayments = [] as RepaymentProps[];
    let result = window?.localStorage?.getItem("repayments");
    if (result) repayments = JSON.parse(result);
    return repayments;
  }

  static saveDataToStorage() {
    const repayments = JSON.stringify(RepaymentRepository.collection);
    const data = JSON.stringify(localStorage.setItem("repayments", repayments));
    return data;
  }

  static generateID() {
    const id = new Date().getTime();
    return String(id);
  }
}

export default RepaymentRepository;

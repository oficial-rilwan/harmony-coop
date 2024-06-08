import { toast } from "react-toastify";
import UserRepository from "./userRepository";

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
    data.term = Number(String(data.term).replace(/\D/g, ""));
    data.downPayment = Number(data.downPayment);
    data.createdAt = new Date();
    LoanRepository.collection.push(data);
    LoanRepository.saveDateToStorage();

    return data;
  }

  static update(data: LoanProps, loanId: string) {
    let loan = LoanRepository.findById(loanId);
    if (!loan) {
      toast.error("Request could not be completed. Invalid loan ID");
      return;
    }

    LoanRepository.collection = LoanRepository.collection.map((item) => {
      if (item.id === loanId) return { ...item, ...data };
      return item;
    });
    LoanRepository.saveDateToStorage();
  }

  static findById(id: string) {
    return LoanRepository.collection.find((item) => item.id === id);
  }

  static findOne(query: LoanProps) {
    return LoanRepository.collection.find((item) => {
      if (query.id) return item.id === query.id;
    });
  }

  static find(query: LoanProps) {
    return LoanRepository.collection.filter((item) => {
      if (query.id) return item.id === query.id;
    });
  }

  static getLoans() {
    const loans = LoanRepository.collection?.filter((item) => {
      return item.userId === UserRepository.user?.id;
    });
    return loans;
  }

  static getDataFromStorage() {
    let loans = [] as LoanProps[];
    let result = window?.localStorage?.getItem("loans");
    if (result) loans = JSON.parse(result);
    return loans;
  }

  static saveDateToStorage() {
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

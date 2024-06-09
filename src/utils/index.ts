import moment from "moment";

type LoanType = "Personal Loan" | "Auto Loan" | "Student Loan" | "Mortgage Loan";

interface LoanProps {
  loanType: LoanType;
  amount: string;
  interestRate: string;
  term: string;
  status: string;
  downPayment: string;
}

export function calculateMaturityDate(startDate: string | Date, loanTermMonths: number | string) {
  let start = new Date(startDate);
  loanTermMonths = Number(loanTermMonths);
  let maturityDate = new Date(start.setMonth(start.getMonth() + loanTermMonths));

  return moment(maturityDate).format("Do MMMM, YYYY");
}

export function currencyFormat(amount: number) {
  if (!amount) amount = 0;
  return Number(amount).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function loanTypes() {
  return ["Personal Loan", "Auto Loan", "Student Loan", "Mortgage Loan"];
}
export function interestRates(): Record<LoanType, number> {
  return {
    "Personal Loan": 10,
    "Auto Loan": 10.75,
    "Student Loan": 8.3,
    "Mortgage Loan": 8.9,
  };
}

export function calculateLoanDetails(values: LoanProps) {
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
    interestRate,
    principal: principal,
    downPaymentAmount: downPayment,
    annualInterest: annualInterestRate * principal,
    monthlyInterest: monthlyInterestRate * principal,
    totalInterest: +totalInterest.toFixed(2),
    totalLoanAmount: +totalLoanAmount.toFixed(2),
    estimatedMonthlyPayment: +estimatedMonthlyPayment.toFixed(2),
    downPaymentPercent: +downPaymentPercent.toFixed(2),
  };
}

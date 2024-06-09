import { LoanProps } from "@/repository/loanRepository";
import RepaymentRepository, { RepaymentProps } from "@/repository/repaymentRepository";
import { currencyFormat, loanTypes } from "@/utils";
import React from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  loan: LoanProps;
}

const initialValues = {
  amount: 0,
} as RepaymentProps;
const RecordPayment = (props: PaymentProps) => {
  const [values, setValues] = React.useState(initialValues);
  if (!props.isOpen) return null;

  const balance = currencyFormat(Number(props.loan.breakdown?.balance || 0) - Number(values.amount));
  return (
    <Modal show={props.isOpen} onHide={props.onClose} centered>
      <form onSubmit={save}>
        <Modal.Header closeButton>
          <Modal.Title>Record Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <div className="form-label">
              Loan Type <span className="text-danger">*</span>
            </div>
            <select
              disabled
              className="form-select"
              value={props.loan.loanType}
              onChange={(e) => handleChange("", e.target.value)}
            >
              {loanTypes().map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <div className="form-label">
              Amount <span className="text-danger">*</span>
            </div>
            <input
              required
              type="text"
              min={1}
              max={balance}
              value={values.amount}
              className="form-control"
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </div>
          <div className="mb-3 ">
            <div className="form-label">
              Balance <span className="text-danger">*</span>
            </div>
            <input
              disabled
              required
              value={props.loan?.breakdown?.balance}
              onChange={(e) => handleChange("", e.target.value)}
              type="text"
              className="form-control"
            />
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
                type="text"
                className="form-control"
                value={props.loan.interestRate}
                onChange={(e) => handleChange("", e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="form-label">
              Loan term in months <span className="text-danger">*</span>
            </div>
            <input
              disabled
              type="text"
              className="form-control"
              value={`${props.loan.term} month(s)`}
              onChange={(e) => handleChange("", e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-secondary rounded-pill" type="button" onClick={props.onClose}>
            Close
          </button>
          <button className="btn_primary py-2" type="submit">
            Save Changes
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (props.loan.breakdown?.balance < Number(values.amount)) {
      toast.info("Request could not be completed as there is no pending payment");
      return;
    }
    const data = { ...values };
    data.loanId = props.loan.id;

    const payment = RepaymentRepository.create(data);
    if (!payment) return;
    props.refetch();
    toast.success("Loan request saved successfully.");
    setValues(initialValues);
    props.onClose();
  }
  function handleChange(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }
};

export default RecordPayment;

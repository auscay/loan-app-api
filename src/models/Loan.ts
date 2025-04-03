export interface Applicant {
  name: string;
  email: string;
  telephone: string;
  totalLoan: string;
}

export interface Loan {
  id: string;
  amount: string; 
  maturityDate: string;
  status: "pending" | "active" | "rejected" | "paid";
  applicant: Applicant;
  createdAt: string;
}
  
  // Load loans data from JSON file
  export const loansData: Loan[] = require("../data/loans.json");
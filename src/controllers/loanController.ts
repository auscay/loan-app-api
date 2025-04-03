import { Request, Response } from "express";
import { loansData } from "../models/Loan";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";


export const getAllLoans = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status } = req.query;
    let loans: any[] = [...loansData];

    // Filter by status if provided
    if (status) {
      loans = loans.filter((loan) => loan.status === status);
    }

    // Hide totalLoan for non-admin/superadmin users
    if (req.staff?.role === "staff") {
      loans = loans.map(loan => {
        // Create a new applicant object without totalLoan
        const { totalLoan, ...applicant } = loan.applicant;
        return {
          ...loan,
          applicant // Use the applicant object without totalLoan
        };
      });
    }

    res.json({ loans });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserLoans = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userEmail } = req.params;
    
    let loans: any[] = loansData.filter((loan) => loan.applicant.email === userEmail);

    // Hide totalLoan for non-admin/superadmin users
    if (req.staff?.role === "staff") {
      loans = loans.map(loan => {
        const { totalLoan, ...applicant } = loan.applicant;
        return {
          ...loan,
          applicant
        };
      });
    }

    res.json({ loans: loans.length ? loans : [] });
  } catch (error) {
    console.error("Error fetching user loans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpiredLoans = (req: AuthenticatedRequest, res: Response) => {
  try {
    const currentDate = new Date();
    let loans: any[] = loansData.filter(
      (loan) => new Date(loan.maturityDate) < currentDate
    );

    // Hide totalLoan for non-admin/superadmin users
    if (req.staff?.role === "staff") {
      loans = loans.map(loan => {
        const { totalLoan, ...applicant } = loan.applicant;
        return {
          ...loan,
          applicant  // This will include all applicant data except totalLoan
        };
      });
    }

    res.json({ loans });
  } catch (error) {
    console.error("Error fetching expired loans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLoan = (req: Request, res: Response): void => {
  try {
    const { loanId } = req.params;
    const loanIndex = loansData.findIndex((loan) => loan.id === loanId);

    if (loanIndex === -1) {
       res.status(404).json({ message: "Loan not found" });
    }

    const deletedLoan = loansData[loanIndex];
    loansData.splice(loanIndex, 1); 

    res.json({ message: "Loan deleted successfully", loan: deletedLoan });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
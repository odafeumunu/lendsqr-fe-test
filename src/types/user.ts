export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface Guarantor {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface User {
  id: number;
  organization: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: UserStatus;
  hasLoan: boolean;
  hasSavings: boolean;
  bvn: string;
  tier: 1 | 2 | 3;
  accountBalance: number;
  bankName: string;
  accountNumber: string;
  avatarUrl?: string;
  gender: "Male" | "Female";
  maritalStatus: "Single" | "Married";
  children: number | "None";
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: "Employed" | "Unemployed" | "Self-employed";
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: [number, number];
  loanRepayment: number;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantors: Guarantor[];
}

export interface Staff {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "superAdmin" | "staff"
}

export const staffData: Staff[] = require("../data/staffs.json")
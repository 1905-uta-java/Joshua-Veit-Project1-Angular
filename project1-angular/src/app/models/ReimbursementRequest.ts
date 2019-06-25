export interface ReimbursementRequest {
    requestID: number,
    employeeID: number,
    amount: number,
    dateRequested: Date,
    managerID: number,
    wasApproved: boolean
}
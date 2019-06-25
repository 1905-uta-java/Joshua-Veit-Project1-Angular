export interface Employee {
    employeeID: number,
    firstName: string,
    lastName: string,
	title: string,
	managerID: number,
	email: string,
	phone: string,
	passwordHash,
	passwordSalt,
	hireDate: Date,
	address: string,
	city: string,
	state: string,
	country: string,
	postalCode: string
}
export interface IEstablishments {
  _id: string,
  owner: string,
  name: string,
  description: string,
  address: string,
  phoneNumber: string,
  emailAddress: string,
  employees: [
    string
  ],
  schedules: [any]
}
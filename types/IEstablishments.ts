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
  clients: string[];
  schedules: [any]
}

export interface IEstablishmentsNewEmployee {
  lastname: string;
  firstname: string;
  avatarUrl?: string;
  role?: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  birthDate: string;
  stripeId?: string;
}

export interface IEstablishmentsSelect {
  _id: string;
  name: string;
}
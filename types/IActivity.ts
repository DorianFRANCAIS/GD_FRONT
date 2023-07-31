export interface IActivity {
  color: string;
  description: string;
  duration: number;
  employees: string[];
  establishment: string;
  imageUrl: string;
  price: number;
  title: string;
  _id: string;
}

export interface IPostActivity {
  establishment: string;
  title: string;
  description: string;
  imageUrl: string;
  color: string;
  duration: number;
  price: number;
}
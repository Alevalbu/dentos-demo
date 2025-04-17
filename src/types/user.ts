export interface User {
    _id?: string;
    name: string;
    dob: string;
    address: {
      street: string;
      town: string;
      postcode?: string;
    };
    telephone: string;
    pets: string[];
    score: number;
    email: string;
    url: string;
    description: string;
    verified: boolean;
    salary: number;
  }
  
  export interface TableProps {
    data: User[];
    pageSize?: number;
    isLoading: boolean;
  }
  
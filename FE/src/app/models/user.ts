
export interface Mess {
  message: string;
}
export interface User {
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: string;
  gender: string;
  address: string;
}

export interface Login {
  email: string;
  password: string;

}
export interface Customer {
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: string;
  gender: string;
  address: string;
  authGoogleID: string;
  authFacebookID: string;
  authType: string;
  role: number;
}

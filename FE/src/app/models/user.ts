
export interface Mess {
  message: string;
}
export interface User {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: Date;
  gender: string;
  address: string;
  image: File;
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
export interface LoginReturn {
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: Date;
  gender: string;
  address: string;
  authGoogleID: string;
  authFacebookID: string;
  authType: string;
  role: number;
  imageUrl: string;
  imageId: string;
  notification: boolean;
}
export interface LoginAdmin {
  email: string;
  phone: number;
  name: string;
  birthday: Date;
  address: string;
  role: number;
}
export interface Profile {
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: Date;
  gender: string;
  address: string;
  authGoogleID: string;
  authFacebookID: string;
  authType: string;
  role: number;
  imageUrl: string;
  imageId: string;
}

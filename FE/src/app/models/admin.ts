export interface AccountStatus {
  status: string;
}

export interface UpdateRoleAdmin {
  role: number;
}
export interface StatAllCustomer {
  email: string;
  fullname: string;
  imageUrl: string;
  imageId: string;
  phone: number;
  totalPrice: number;
}
export interface StatAllProduct {
  bookId: string;
  title: string;
  imageUrl: string;
  imageId: string;
  pubPublisher: string;
  Author: string;
  Quantity: number;
  Revenue: number;
  Profit: number;
}
export interface StatDay {
  totalRevenue: number;
  totalProfit: number;
  totalBill: number;
  totalOrderDetail: StatOrderDetail[];
}
export interface StatOrderDetail {
  orderId: string;
  email: string;
  name: string;
  phone: string;
  status: string;
  isPaid: boolean;
  completedDay: string;
  Revenue: number;
  Profit: number;
  OriginalPrice:number;
}
export interface StatMonthHaveStatDay {
  totalRevenue: number;
  totalProfit: number;
  totalBill: number;
  totalOrderDetail: StatDayChild[];
}
export interface StatDayChild {
  Bill: number;
  completedDay: string;
  Revenue: number;
  Profit: number;
  OriginalPrice:number;
}

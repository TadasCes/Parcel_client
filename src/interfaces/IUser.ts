export default interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registeredDate: string;
  rating: number;
  countTrips: number;
  countDelivered: number;
  countSent: number;
  phone: string;
  posts: [];
  isAdmin: boolean;
}

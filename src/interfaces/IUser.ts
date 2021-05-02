export default interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registeredDate: string;
  rating: number;
  tripCount: number;
  sentCount: number;
  phone: string;
  posts: [];
  review: [{
    comment?: string;
    rating: number
  }];
  isAdmin: boolean;
}

export default interface IPost {
  cityStart: string;
  cityFinish: string;
  timeStart: Date;
  timeEnd: Date;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
    countDelivered: number;
  };
}

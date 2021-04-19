// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface IPost {
  _id?: string;
  cityStart: string;
  cityEnd: string;
  day: string;
  timeStart: string;
  timeEnd: string;
  size?: number;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
    phone: string;
    countDelivered: number;
  };
}

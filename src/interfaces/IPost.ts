// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface IPost {
  _id?: string;
  type: number;
  cityStart: string;
  cityEnd: string;
  day: string;
  timeStart: string;
  timeEnd: string;
  comment: string;
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

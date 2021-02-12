// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface IPost {
  _id: string;
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

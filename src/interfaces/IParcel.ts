export default interface IParcel {
  cityStart: string;
  cityFinish: string;
  timeStart?: Date;
  timeEnd: Date;
  size?: number;
  authorId: string;
  comment?: string;
  urget?: boolean;
  fragile?: boolean;
  animal?: boolean;
}

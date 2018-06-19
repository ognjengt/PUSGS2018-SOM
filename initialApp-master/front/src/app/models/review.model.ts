export class ReviewModel {
  Id: number;
  User: string;
  Date: Date;
  Comment: string;
  Stars: number;
  ServiceId: number;

  constructor(user:string, date:Date, comment:string, stars:number, serviceId: number) {
      this.User = user;
      this.Date = date;
      this.Comment = comment;
      this.Stars = stars;
      this.ServiceId = serviceId;
  }
}
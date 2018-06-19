export class BranchOfficeModel {
  Id: number;
  ServiceId: number;
  Name: string;
  Logo: string;
  Latitude: string;
  Longitude: string;
  Address: string;

  constructor(serviceId:number, name:string, lat:string, lng:string, address:string) {
      this.ServiceId = serviceId;
      this.Name = name;
      //this.Logo = logo; dodati logo
      this.Latitude = lat;
      this.Longitude = lng;
      this.Address = address;
  }
}
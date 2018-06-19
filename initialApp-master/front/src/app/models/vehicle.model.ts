import { TypeModule } from "./type.model";

export class VehicleModule {
    Id: string;
    Model: string;
    Manufactor: string;
    Year: string;
    Description: string;
    Type: TypeModule;
    PricePerHour: string;
  
    constructor(model:string, manufactor: string, year: string, description: string, vehicleType: TypeModule, pricePerHour: string) {
        this.Model = model;
        this.Manufactor = manufactor;
        this.Year = year;
        this.Description = description;
        this.Type = vehicleType;
        this.PricePerHour = pricePerHour;
    }
  }
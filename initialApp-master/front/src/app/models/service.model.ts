export class ServiceModule {
    Id: string;
    Email: string;
    Name: string;
    Logo: string;
    Description: string;
  
    constructor(email:string, name: string, description: string, logo: string) {
        this.Email = email;
        this.Name = name;
        this.Description = description;
        this.Logo = logo;
    }
  }
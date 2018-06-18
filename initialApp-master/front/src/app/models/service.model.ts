export class ServiceModule {
    Id: string;
    Email: string;
    Name: string;
    //Logo: Image;
    Description: string;
  
    constructor(email:string, name: string, description: string) {
        this.Email = email;
        this.Name = name;
        this.Description = description;
        //this.Logo = logo;
    }
  }
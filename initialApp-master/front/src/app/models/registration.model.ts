export class AuthenticationModule {
  Email: string;
  FullName: string;
  Date: Date;
  Password: string;
  ConfirmPassword: string;

  constructor(email:string, fullName: string, date: Date, password: string, confirmPassword: string) {
      this.Email = email;
      this.FullName = fullName;
      this.Date = date;
      this.Password = password;
      this.ConfirmPassword = confirmPassword;
  }
}
export class AuthenticationModule {
  Email: string;
  FullName: string;
  Password: string;
  ConfirmPassword: string;

  constructor(email:string, fullName: string, password: string, confirmPassword: string) {
      this.Email = email;
      this.FullName = fullName;
      this.Password = password;
      this.ConfirmPassword = confirmPassword;
  }
}
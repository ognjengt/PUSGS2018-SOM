export class AuthenticationModule {
  Email: string;
  Password: string;
  ConfirmPassword: string;

  constructor(email:string, password: string, confirmPassword: string) {
      this.Email = email;
      this.Password = password;
      this.ConfirmPassword = confirmPassword;
  }
}
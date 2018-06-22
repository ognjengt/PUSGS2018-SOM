export class RegistrationValidations {
    emailOk: boolean = true;
    fullNameOk: boolean = true;
    dateOk: boolean = true;
    passwordOk: boolean = true;
    password2Ok: boolean = true;

    validate(registrationData) {
      let wrong = false;
      if (registrationData.Email == null || registrationData.Email == "") {
        this.emailOk = false;
        wrong = true;
      }
      else this.emailOk = true;
  
      if (registrationData.FullName == null || registrationData.FullName == "") {
        this.fullNameOk = false;
        wrong = true;
      }
      else this.fullNameOk = true;
  
      if (registrationData.Password == null || registrationData.Password == "") {
        this.passwordOk = false;
        wrong = true;
      }
      else this.passwordOk = true;
  
      if (registrationData.ConfirmPassword == null || registrationData.ConfirmPassword == "") {
        this.password2Ok = false;
        wrong = true;
      }
      else this.password2Ok = true;
  
      return wrong;
    }
}

export class SignInValidations{
    emailOk: boolean = true;
    passwordOk: boolean = true;

    validate(loginData) {
      let wrong = false;
      if (loginData.Email == null || loginData.Email == "") {
        this.emailOk = false;
        wrong = true;
      }
      else this.emailOk = true;
  
      if (loginData.Password == null || loginData.Password == "") {
        this.passwordOk = false;
        wrong = true;
      }
      else this.passwordOk = true;

      return wrong;
    }
}

export class ServiceValidations{
  nameOk: boolean = true;
  emailOk: boolean = true;

  validate(serviceData) {
    let wrong = false;
    if (serviceData.Name == null || serviceData.Name == "") {
      this.nameOk = false;
      wrong = true;
    }
    else this.nameOk = true;

    if (serviceData.Email == null || serviceData.Email == "") {
      this.emailOk = false;
      wrong = true;
    }
    else this.emailOk = true;

    return wrong;
  }
}

export class BranchValidations{
  serviceSelected: boolean = true;
  nameOk: boolean = true;
  latOk: boolean = true;
  lngOk: boolean = true;
  addressOk: boolean = true;


  validate(branchData) {
    let wrong = false;
    if(branchData.ServiceId == null || branchData.ServiceId == "") {
      this.serviceSelected = false;
      wrong = true;
    }
    else this.serviceSelected = true;

    if (branchData.Name == null || branchData.Name == "") {
      this.nameOk = false;
      wrong = true;
    }
    else this.nameOk = true;

    if (branchData.Latitude == null || branchData.Latitude == "") {
      this.latOk = false;
      wrong = true;
    }
    else this.latOk = true;

    if (branchData.Longitude == null || branchData.Longitude == "") {
      this.lngOk = false;
      wrong = true;
    }
    else this.lngOk = true;

    if (branchData.Address == null || branchData.Address == "") {
      this.addressOk = false;
      wrong = true;
    }
    else this.addressOk = true;

    return wrong;
  }

  validateEdit(branchData) {
    let wrong = false;

    if (branchData.Name == null || branchData.Name == "") {
      this.nameOk = false;
      wrong = true;
    }
    else this.nameOk = true;

    if (branchData.Latitude == null || branchData.Latitude == "") {
      this.latOk = false;
      wrong = true;
    }
    else this.latOk = true;

    if (branchData.Longitude == null || branchData.Longitude == "") {
      this.lngOk = false;
      wrong = true;
    }
    else this.lngOk = true;

    if (branchData.Address == null || branchData.Address == "") {
      this.addressOk = false;
      wrong = true;
    }
    else this.addressOk = true;

    return wrong;
  }
}

export class VehicleValidations{
  serviceSelected: boolean = true;
  modelOk: boolean = true;
  manufactorOk: boolean = true;
  pricePerHourOk: boolean = true;
  typeSelected: boolean = true;
  yearOk: boolean = true;
  descriptionOk: boolean = true;

  validate(vehicleData) {
    let wrong = false;
    if (vehicleData.ServiceId == null || vehicleData.ServiceId == "") {
      this.serviceSelected = false;
      wrong = true;
    }
    else this.serviceSelected = true;

    if (vehicleData.Model == null || vehicleData.Model == "") {
      this.modelOk = false;
      wrong = true;
    }
    else this.modelOk = true;

    if (vehicleData.Manufactor == null || vehicleData.Manufactor == "") {
      this.manufactorOk = false;
      wrong = true;
    }
    else this.manufactorOk = true;

    if (vehicleData.Year == null || vehicleData.Year == "") {
      this.yearOk = false;
      wrong = true;
    }
    else this.yearOk = true;

    if (vehicleData.Description == null || vehicleData.Description == "") {
      this.descriptionOk = false;
      wrong = true;
    }
    else this.descriptionOk = true;

    if (vehicleData.PricePerHour == null) {
      this.pricePerHourOk = false;
      wrong = true;
    }
    else this.pricePerHourOk = true;

    if (vehicleData.Type == null || vehicleData.Type == "") {
      this.typeSelected = false;
      wrong = true;
    }
    else this.typeSelected = true;

    console.log(vehicleData);

    return wrong;
  }

  validateEdit(vehicleData) {
    let wrong = false;

    if (vehicleData.Model == null || vehicleData.Model == "") {
      this.modelOk = false;
      wrong = true;
    }
    else this.modelOk = true;

    if (vehicleData.Manufactor == null || vehicleData.Manufactor == "") {
      this.manufactorOk = false;
      wrong = true;
    }
    else this.manufactorOk = true;

    if (vehicleData.Year == null || vehicleData.Year == "") {
      this.yearOk = false;
      wrong = true;
    }
    else this.yearOk = true;

    if (vehicleData.Description == null || vehicleData.Description == "") {
      this.descriptionOk = false;
      wrong = true;
    }
    else this.descriptionOk = true;

    if (vehicleData.PricePerHour == null) {
      this.pricePerHourOk = false;
      wrong = true;
    }
    else this.pricePerHourOk = true;

    if (vehicleData.Type == null || vehicleData.Type == "") {
      this.typeSelected = false;
      wrong = true;
    }
    else this.typeSelected = true;

    console.log(vehicleData);

    return wrong;
  }
}

export class ReviewValidations{
  starsEmpty: boolean = true;
  starsInRange: boolean = true;
  commentOk: boolean = true;

  validate(reviewData) {
    let wrong = false;
    if (reviewData.Stars == null || reviewData.Stars == "") {
      this.starsEmpty = false;
      wrong = true;
    }
    else this.starsEmpty = true;

    if (reviewData.Comment == null || reviewData.Comment == "") {
      this.commentOk = false;
      wrong = true;
    }
    else this.commentOk = true;

    return wrong;
  }

  validateStars(stars) {
    if(stars < 1 || stars > 5) {
      this.starsInRange = false;
      return false;
    } else {
      this.starsInRange = true;
      return true;
    }
  }
}
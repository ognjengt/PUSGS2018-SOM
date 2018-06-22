import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

// Bootstrap Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routes and Http
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

// Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/interceptor';

// Guard
import {CanActivateViaAuthGuard} from './guard/auth.guard'; // Admin guard
import { UserSignedInGuard } from './guard/userSignedIn.guard'; // Signed in guard

// Our Components
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { BranchOfficesComponent } from './components/branch-offices/branch-offices.component';
import { RentsComponent } from './components/rents/rents.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddServiceComponent } from './components/services/add-service/add-service.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { EditServiceComponent } from './components/services/edit-service/edit-service.component';
import { ServiceDetailComponent } from './components/services/service-detail/service-detail.component';
import { AddBranchComponent } from './components/branch-offices/add-branch/add-branch.component';
import { EditBranchComponent } from './components/branch-offices/edit-branch/edit-branch.component';
import { BranchOfficeDetailComponent } from './components/branch-offices/branch-office-detail/branch-office-detail.component';
import { AddRentComponent } from './components/rents/add-rent/add-rent.component';
import { EditRentComponent } from './components/rents/edit-rent/edit-rent.component';
import { MapBoxComponent } from './components/map/map-box/map-box.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { RentsDetailsComponent } from './components/rents/rents-details/rents-details.component';
import { RentACarComponent } from './components/rentACar/rent-a-car/rent-a-car.component';
import { GOOGLE_API_KEY } from 'keys';
import { SearchComponent } from './components/search/search.component';
import { NgxPayPalModule } from 'ngx-paypal';

import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { ManagerGuard } from './guard/manager.guard';

const Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "signin",
    component: SignInComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "services",
    component: ServicesComponent
  },
  {
    path: "services/:Id",
    component: ServiceDetailComponent
  },
  {
    path: "branchoffices",
    component: BranchOfficesComponent
  },
  {
    path: "branchOffice/:Id",
    component: BranchOfficeDetailComponent
  },
  {
    path: "rents",
    component: RentsComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [UserSignedInGuard]
  },
  {
    path: "adminpanel",
    component: AdminpanelComponent,
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: "addService",
    component: AddServiceComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: "editService/:Id",
    component: EditServiceComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: "editBranchOffice/:Id",
    component: EditBranchComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: "addVehicle",
    component: AddRentComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: "editVehicle/:Id",
    component: EditRentComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: "vehicleDetails/:Id",
    component: RentsDetailsComponent
  },
  {
    path: "rentACar/:Id",
    component: RentACarComponent,
    canActivate: [UserSignedInGuard]
  },
  {
    path: "search",
    component: SearchComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    RegisterComponent,
    SignInComponent,
    HomeComponent,
    ServicesComponent,
    BranchOfficesComponent,
    RentsComponent,
    ProfileComponent,
    AddServiceComponent,
    AdminpanelComponent,
    EditServiceComponent,
    ServiceDetailComponent,
    AddBranchComponent,
    EditBranchComponent,
    BranchOfficeDetailComponent,
    AddRentComponent,
    EditRentComponent,
    MapBoxComponent,
    FileUploaderComponent,
    RentsDetailsComponent,
    RentACarComponent,
    SearchComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(Routes),
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY
    }),
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation,
    }),
    NgxPayPalModule,
  ],  
  providers: [
    CanActivateViaAuthGuard,
    UserSignedInGuard,
    ManagerGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'CanAlwaysActivateGuard',
      useValue: () => {
        return true;
      } 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

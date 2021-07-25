import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { Error404Component } from "./components/error404/error404.component";
import { AuthService } from "./services/auth.service";
import { MaterialModule } from "./modules/material.module";
import { BaseService } from "./services/base.service";
import { AppglobalService } from "./services/appglobal.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { DeleteDialogComponent } from "./dialog/delete-dialog/delete-dialog.component";
import { StdComponent } from "./components/std/std.component";
import { StdDialogComponent } from "./dialog/std-dialog/std-dialog.component";
import { StdService } from "./services/std.service";
import { MediumService } from "./services/medium.service";
import { GenderComponent } from "./components/gender/gender.component";
import { GenderDialogComponent } from "./dialog/gender-dialog/gender-dialog.component";
import { BranchService } from "./services/branch.service";
import { GenderService } from "./services/gender.service";
import { StateService } from "./services/state.service";
import { AjaxService } from "./ajax.service";
import { InterceptorService } from "./interceptor.service";
import { ReferenceService } from "./services/reference.service";
import { DistrictService } from "./services/district.service";
import { CountryService } from "./services/country.service";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader.service";
import { DashboardHomeComponent } from "./components/dashboard-home/dashboard-home.component";
import { EnquiryFormComponent } from './dialog/enquiry-form/enquiry-form.component';
import { PromptDialogComponent } from "./dialog/prompt-dialog/prompt-dialog.component";
import { LoginGuard } from "./guards/login.guard";
import { ChangePassComponent } from "./components/change-pass/change-pass.component";
import { AppSidebarModule } from "./modules/app-sidebar.module";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    DashboardComponent,
    DeleteDialogComponent,
    StdComponent,
    StdDialogComponent,
    GenderComponent,
    GenderDialogComponent,
    LoaderComponent,
    DashboardHomeComponent,
    EnquiryFormComponent,
    PromptDialogComponent,
    ChangePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppSidebarModule,
  ],
  providers: [
    AuthService,
    BaseService,
    AppglobalService,
    AuthGuard,
    LoginGuard,
    StdService,
    MediumService,
    BranchService,
    GenderService,
    StateService,
    DistrictService,
    ReferenceService,
    CountryService,
    AjaxService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent,
    StdDialogComponent,
    GenderDialogComponent,
    EnquiryFormComponent,
    PromptDialogComponent,
  ],
})
export class AppModule {}

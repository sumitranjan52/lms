import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { Error404Component } from "./components/error404/error404.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardHomeComponent } from "./components/dashboard-home/dashboard-home.component";
import { LoginGuard } from "./guards/login.guard";
import { ChangePassComponent } from "./components/change-pass/change-pass.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "change-password",
    component: ChangePassComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: DashboardHomeComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "nios",
    loadChildren: "./modules/nios/nios.module#NiosModule",
    canActivate: [AuthGuard],
  },
  {
    path: "setup",
    loadChildren: "./modules/setup/setup.module#SetupModule",
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BranchComponent } from "src/app/components/branch/branch.component";
import { DistrictComponent } from "src/app/components/district/district.component";
import { MediumComponent } from "src/app/components/medium/medium.component";
import { ReferenceComponent } from "src/app/components/reference/reference.component";
import { StateComponent } from "src/app/components/state/state.component";
import { SetupHomeComponent } from "./setup-home.component";
import { SetupComponent } from "./setup.component";

const routes: Routes = [
  {
    path: "",
    component: SetupComponent,
    children: [
      {
        path: "",
        component: SetupHomeComponent,
      },
      {
        path: "medium",
        component: MediumComponent,
      },
      {
        path: "branch",
        component: BranchComponent,
      },
      {
        path: "state",
        component: StateComponent,
      },
      {
        path: "reference",
        component: ReferenceComponent,
      },
      {
        path: "district",
        component: DistrictComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}

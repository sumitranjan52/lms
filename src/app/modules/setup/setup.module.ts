import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SetupRoutingModule } from "./setup-routing.module";
import { BranchComponent } from "src/app/components/branch/branch.component";
import { DistrictComponent } from "src/app/components/district/district.component";
import { MediumComponent } from "src/app/components/medium/medium.component";
import { ReferenceComponent } from "src/app/components/reference/reference.component";
import { StateComponent } from "src/app/components/state/state.component";
import { BranchDialogComponent } from "src/app/dialog/branch-dialog/branch-dialog.component";
import { DistrictDialogComponent } from "src/app/dialog/district-dialog/district-dialog.component";
import { MediumDialogComponent } from "src/app/dialog/medium-dialog/medium-dialog.component";
import { ReferenceDialogComponent } from "src/app/dialog/reference-dialog/reference-dialog.component";
import { StateDialogComponent } from "src/app/dialog/state-dialog/state-dialog.component";
import { SetupComponent } from "./setup.component";
import { SetupHomeComponent } from "./setup-home.component";
import { AppSidebarModule } from "../app-sidebar.module";

@NgModule({
  declarations: [
    SetupComponent,
    SetupHomeComponent,
    MediumComponent,
    MediumDialogComponent,
    BranchComponent,
    BranchDialogComponent,
    StateComponent,
    StateDialogComponent,
    ReferenceComponent,
    ReferenceDialogComponent,
    DistrictDialogComponent,
    DistrictComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SetupRoutingModule,
    AppSidebarModule,
  ],
  providers: [],
  entryComponents: [
    MediumDialogComponent,
    StateDialogComponent,
    BranchDialogComponent,
    DistrictDialogComponent,
    ReferenceDialogComponent,
  ],
})
export class SetupModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NiosRoutingModule } from "./nios-routing.module";
import { NiosHomeComponent } from "./nios-home.component";
import { AdmissionComponent } from "src/app/components/admission/admission.component";
import { FormTypeComponent } from "src/app/components/form-type/form-type.component";
import { NiosGroupComponent } from "src/app/components/nios-group/nios-group.component";
import { SubjectFeeComponent } from "src/app/components/subject-fee/subject-fee.component";
import { AdmissionDialogComponent } from "src/app/dialog/admission-dialog/admission-dialog.component";
import { ClassComponent } from "src/app/dialog/class/class.component";
import { FormTypeDialogComponent } from "src/app/dialog/form-type-dialog/form-type-dialog.component";
import { SubjectAddDialogComponent } from "src/app/dialog/subject-add-dialog/subject-add-dialog.component";
import { AdmissionService } from "src/app/services/admission.service";
import { FormTypeService } from "src/app/services/form-type.service";
import { MaterialModule } from "../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NiosComponent } from "./nios.component";
import { ExamFeeComponent } from "src/app/dialog/exam-fee/exam-fee.component";
import { ExamFeeAddService } from "src/app/services/exam-fee-add.service";
import { ViewStudentDialogComponent } from "../../dialog/view-student-dialog/view-student-dialog.component";
import { NgxPrintModule } from "ngx-print";
import { AppSidebarModule } from "../app-sidebar.module";
import { LeftStudentComponent } from "src/app/components/left-student/left-student.component";
import { SubjectFeeDialogComponent } from "src/app/dialog/subject-fee-dialog/subject-fee-dialog.component";
import { EnquireListComponent } from "src/app/components/enquire-list/enquire-list.component";
import { LedgerComponent } from "src/app/dialog/ledger/ledger.component";
import { ResultDialogComponent } from "../../dialog/result-dialog/result-dialog.component";

@NgModule({
  declarations: [
    NiosHomeComponent,
    AdmissionComponent,
    FormTypeComponent,
    NiosGroupComponent,
    SubjectFeeComponent,
    FormTypeDialogComponent,
    ClassComponent,
    SubjectAddDialogComponent,
    AdmissionDialogComponent,
    NiosComponent,
    ExamFeeComponent,
    ViewStudentDialogComponent,
    LeftStudentComponent,
    SubjectFeeDialogComponent,
    EnquireListComponent,
    LedgerComponent,
    ResultDialogComponent,
  ],
  imports: [
    CommonModule,
    NiosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    AppSidebarModule,
  ],
  providers: [FormTypeService, AdmissionService, ExamFeeAddService],
  entryComponents: [
    FormTypeDialogComponent,
    ClassComponent,
    SubjectAddDialogComponent,
    AdmissionDialogComponent,
    ExamFeeComponent,
    ViewStudentDialogComponent,
    SubjectFeeDialogComponent,
    LedgerComponent,
    ResultDialogComponent,
  ],
})
export class NiosModule {}

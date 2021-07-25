import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdmissionComponent } from "src/app/components/admission/admission.component";
import { EnquireListComponent } from "src/app/components/enquire-list/enquire-list.component";
import { FormTypeComponent } from "src/app/components/form-type/form-type.component";
import { LeftStudentComponent } from "src/app/components/left-student/left-student.component";
import { NiosGroupComponent } from "src/app/components/nios-group/nios-group.component";
import { SubjectFeeComponent } from "src/app/components/subject-fee/subject-fee.component";
import { NiosHomeComponent } from "./nios-home.component";
import { NiosComponent } from "./nios.component";

const routes: Routes = [
  {
    path: "",
    component: NiosComponent,
    children: [
      {
        path: "",
        component: NiosHomeComponent,
      },
      {
        path: "formtype",
        component: FormTypeComponent,
      },
      {
        path: "niosGroup",
        component: NiosGroupComponent,
      },
      {
        path: "subjectFee",
        component: SubjectFeeComponent,
      },
      {
        path: "enquireList",
        component: EnquireListComponent,
      },
      {
        path: "admission",
        component: AdmissionComponent,
      },
      {
        path: "readmission",
        component: LeftStudentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NiosRoutingModule {}

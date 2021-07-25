import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "src/app/components/sidebar/sidebar.component";
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [SidebarComponent],
})
export class AppSidebarModule {}

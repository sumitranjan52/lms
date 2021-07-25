import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-prompt-dialog",
  templateUrl: "./prompt-dialog.component.html",
  styleUrls: ["./prompt-dialog.component.css"],
})
export class PromptDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}

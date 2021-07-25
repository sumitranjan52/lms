import { Component, Inject, OnInit, ViewChild} from '@angular/core';

import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ExamFeeAddService } from 'src/app/services/exam-fee-add.service';
import { SubjectFeepaymentService } from '../../services/subject-feepayment.service';
@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSourceSubFee = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginatorSubFee: MatPaginator;
  @ViewChild(MatSort) sortSubFee: MatSort;
  studentdetail = {
    studentId: null,
    name: null,
    fatherName: null,
    contactNumber: null,
    coachingCenter: null,
    branchName: null,
    formType: null,
    fee: null,
    class: null,
    sessionYear: null
  };
  courseFee;
  subjectFee;
  displayedColumns = ["date", "mode", "penalty", "fee" ];
  displayedColumns2 = ["date", "Subjects", "amount"];
  dueAmount: number;
  profit: number;
  
  constructor(public dialogRef: MatDialogRef<LedgerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private examFeeService: ExamFeeAddService,
    private subfeeService: SubjectFeepaymentService) { 
    }
    // subjectfee payment get id means getting subject related things

    // exam fee payment 
  ngOnInit() {
    if (this.data != null && this.data != undefined) {
      console.log(this.data);
      this.studentdetail.name = this.data.studentName;
      this.studentdetail.fatherName = this.data.fatherName;
      this.studentdetail.contactNumber = this.data.mobile;
      this.studentdetail.coachingCenter = this.data.aiCentre;
      this.studentdetail.branchName = this.data.branchName.branch;
      this.studentdetail.formType = this.data.formType.form_type;
      this.studentdetail.fee = this.data.courseFee;
      this.studentdetail.studentId = this.data.id; 
      this.studentdetail.class = this.data.std;
      this.studentdetail.sessionYear = +this.data.sessionYear;
      this.examFeeService.doGetExamFee(this.data.id).subscribe((resp: any) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
          //this.gbl.openDialog("error", err.error.lmsmsg);
        }
      });
      this.subfeeService.doGet(this.data.id).subscribe((resp: any) => {
        this.dataSourceSubFee = new MatTableDataSource(resp);
        this.dataSourceSubFee.paginator = this.paginatorSubFee;
        this.dataSourceSubFee.sort = this.sortSubFee;
      },
      (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 400 || err.status === 500) {
          console.log(err.error.lmsmsg);
          //this.gbl.openDialog("error", err.error.lmsmsg);
        }
      });
    }
    setTimeout(()=>{
      this.dueAmount = (+this.studentdetail.fee) - (+this.courseFee);
      this.profit = (+this.courseFee) - (+this.subjectFee);
      console.log(this.dueAmount + "," + this.profit);
    }, 500);
    
  }

  getTotalFeeDeposited(){
    //console.log(this.dataSource.filteredData); 
    let total = 0;
    this.dataSource.filteredData.forEach(e => {
        total += e.fee_deposited;
    })
    this.courseFee = total;
    return total;
  }

  getTotalPaidAmount(){
    let total = 0;
    this.dataSourceSubFee.filteredData.forEach(e => {
        total += e.paidAmount;
    })
    this.subjectFee = total;
    return total;
  }

  getsubjectNames(subjectlist){
    let subject = "";
    const length = subjectlist.length;
    subjectlist.forEach((element, index) => {
      if(index != length-1){
        subject += element.subject_name + " ," ;  
      }else{
        subject += element.subject_name ;
      }
    });

    return subject;
  }

}

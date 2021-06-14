import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.scss']
})


export class ExportCsvComponent implements OnInit {


  @ViewChild('fileButton', null) fileButton;

  @Input('rowData') rowData: any;
  @Input('buttonText') buttonText: any;
  @Input('columns') columns: Array<any>;
  @Input('delimiter') delimiter: any;
  @Input('fileName') fileName: any;



  @Output() beforeCallbackFunction: EventEmitter<any> = new EventEmitter();

  @Output() afterCallbackFunction: EventEmitter<any> = new EventEmitter();


  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {

  }

  exportCsv() {
    this.beforeCallbackFunction.emit(null);
    let delimiter = this.delimiter!=null && this.delimiter.trim()!=''?this.delimiter:','
    let header = Object.keys(this.rowData[0]);
    let body = []
    this.rowData.forEach((element) => {
      let line = [];
      for (let cont = 0; cont < header.length; cont++) {
        line.push(element[header[cont]])
      }
      body.push(line)
    })
    let file = "";
    this.replaceColumns(header);
    file = header.join(delimiter) + '\n'
    body.forEach((line) => {
      file += line.join(delimiter) + '\n'
    })
    this.createFile(file);
  }

  createFile(file:any){
    let fileName = this.fileName!=null && this.fileName.trim()!=''?this.fileName:'CSV_FILE'
    const blob = new Blob([file], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    let dwldLink = document.createElement("a");
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", this.fileName.concat(".csv"));
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  replaceColumns(header:any){
    if(this.columns){
      this.columns.forEach((column)=>{
        let index = header.indexOf(column.columnName)
        if(index!=-1){
          header[index]=column.newColumnName
        }
      })
    }
  }

}

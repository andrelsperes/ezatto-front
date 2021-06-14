import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ExportCsvService {
  


  constructor(
   

  ) { }

  exportCsv(rowData:Array<any>, columns?:Array<any>, delimiter?:string, fileName?:string) {
    delimiter!=null && delimiter.trim()!=''?delimiter:','
    let header = Object.keys(rowData[0]);
    let body = []
    rowData.forEach((element) => {
      let line = [];
      for (let cont = 0; cont < header.length; cont++) {
        line.push(element[header[cont]])
      }
      body.push(line)
    })
    let file = "";
    this.replaceColumns(header,columns);
    file = header.join(delimiter) + '\n'
    body.forEach((line) => {
      file += line.join(delimiter) + '\n'
    })
    this.createFile(file, fileName);
  }

  createFile(file:any, fileName?:string){
    fileName = fileName!=null && fileName.trim()!=''?fileName:'CSV_FILE'
    const blob = new Blob([file], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    let dwldLink = document.createElement("a");
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", fileName.concat(".csv"));
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  replaceColumns(header:any, columns?:Array<any>){
    if(columns){
      columns.forEach((column)=>{
        let index = header.indexOf(column.columnName)
        if(index!=-1){
          header[index]=column.newColumnName
        }
      })
    }
  }

}

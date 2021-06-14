import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImportCsvService {

  csvTojson(fileList: FileList, delimiter: string, functionHandle?: Function): Observable<any> {
    const fileInfo: any = fileList[0];
    const reader: FileReader = new FileReader();

    reader.readAsText(fileInfo);
    const response: Observable<any> = new Observable(observer => {

      reader.onload = (data) => {
        const matriz: any = [];

        const csvData: any = reader.result;
        const csvRecordsArray: any = String(csvData).split(/\r\n|\n/);

        const header: any = csvRecordsArray[0].split(delimiter);
        for (let cont = 1; cont < csvRecordsArray.length; cont++) {
          const line: any = csvRecordsArray[cont]
                          .split(delimiter)
                          .filter((record) => record != null && record.trim().length > 0)
                          .map((record) => record.trim());

        if (line.length > 0) {
            const jsonObj: any = {};
            for (let index = 0; index < line.length; index++) {
              jsonObj[header[index]] = line[index];
            }
            matriz.push(jsonObj);
          }
        }

        const csvInfo: any = {
          data: matriz,
          fileName: fileInfo.name,
        };
        observer.next(csvInfo);
      }
    });

    return response;
  }

}

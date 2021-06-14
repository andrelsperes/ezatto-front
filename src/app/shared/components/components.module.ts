import { NgModule } from '@angular/core';
import { ExportCsvComponent } from './export-csv/export-csv.component';
//import { ImportCsvComponent } from './import-csv/import-csv.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NgxDatatableModule,
 ],
  exports: [
    ExportCsvComponent,
   //ImportCsvComponent,
  ],
  declarations: [
    ExportCsvComponent,
   // ImportCsvComponent,
  ],
  entryComponents: [
  ]
})
export class ComponentstModule { }

import { Injectable } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  private datatables: Array<DatatableComponent> = new Array<DatatableComponent>();

  constructor(
  ) { }


  subscribeTable(datatable: DatatableComponent) {
    this.datatables.push(datatable)
  }

  unsubscribeTable(datatable: DatatableComponent) {
    let subscribeList:Array<DatatableComponent> = null;
    subscribeList = this.datatables.filter(element=>{
      return element != datatable
    })
    this.datatables = subscribeList;
    
  }

  resize(name: string) {
    if (this.datatables != null && this.datatables != undefined && this.datatables.length > 0) {
      let datatable: DatatableComponent = null;
      this.datatables.forEach(element => {
        if (element.element.getAttribute('name') === name) {
          datatable = element;
        }
      });
      if (datatable != null) {
        setTimeout(() => {
          datatable.rowDetail.toggleExpandRow(datatable.rows);
          datatable.recalculate()
        }, 0);
      }
    }

  }

  resizeAllTables() {
    this.datatables.forEach(datatable => {
      setTimeout(() => {
        datatable.rowDetail.toggleExpandRow(datatable.rows);
        datatable.recalculate()
      }, 0);
    });

  }

}

import { Injectable } from '@angular/core';
import { SpringDatatablePagination } from './spring-datatable-pagination';


@Injectable()
export class SpringDatatablePaginationService {

    private datatablePagination: SpringDatatablePagination;

    constructor() {
    }

    setDatatablePagination(datatablePagination: SpringDatatablePagination) {
        this.datatablePagination = datatablePagination;
    }


    setInfo(data: any) {        
       
        if (data.content != null) {
            this.datatablePagination.rowData = data.content;
            this.datatablePagination.currentPage = data.number
            this.datatablePagination.totalPages = data.totalPages
            this.datatablePagination.totalElements = data.totalElements
            this.datatablePagination.tableLimit = data.size

        } else {            
            this.datatablePagination.rowData = data.list;
            this.datatablePagination.tableLimit = data.recordsByPage;
            this.datatablePagination.totalElements = data.count           
        }


    }




}
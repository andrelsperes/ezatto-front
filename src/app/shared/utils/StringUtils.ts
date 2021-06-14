import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class StringUtils{
    public static addZerosOnLeft(qtd: number, value:string): string{
        let newValue:string= null;
        if(value==null) {
            newValue = "";
        }else {
            newValue = value;
        }
        for(let cont = 0; cont<qtd; cont++) {
            newValue = "0" + newValue
        }
        return newValue;
    }
}
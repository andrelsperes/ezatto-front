import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngx-dual-list',
  templateUrl: './dual-list.component.html',
  styleUrls: ['./dual-list.component.scss']
,
})
export class DualListComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    this.sortLists();
  }

  public innerWidth: any;

  @Input("listLeft")listLeft: any = [];
  @Input("listRight")listRight: any = [];

  constructor() { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.sortLists();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.innerWidth = event.target.innerWidth;
    this.sortLists();
  }

  add(){
    let selected = null;
    for(let item of this.listLeft){
      if(item.active){
        let cacheItem = item;
        cacheItem.active = false;
        let index = this.listLeft.indexOf(item);
        this.listLeft.splice(index, 1);
        this.listRight.push(cacheItem);
      }
    }
    this.sortLists();
  }

  addAll(){
    for(let item of this.listLeft){
        this.listRight.push(item);
    }
    this.sortLists();
  }

  remove(){
    let selected = null;
    for(let item of this.listRight){
      if(item.active){
        let cacheItem = item;
        cacheItem.active = false;
        let index = this.listRight.indexOf(item);
        this.listRight.splice(index, 1);
        this.listLeft.push(cacheItem);
      }
    }
    this.sortLists();
  }

  removeAll(){
    for(let item of this.listRight){
      this.listLeft.push(item);
    }
    this.sortLists();
  }

  selectedlistLeft(itemSelected){
    for(let item of this.listLeft){
      if(item.active){
        item.active = false;
      }
    }
    itemSelected.active = true;
  }

  selectedlistRight(itemSelected){
    for(let item of this.listRight){
      if(item.active){
        item.active = false;
      }
    }
    itemSelected.active = true;
  }

  sortLists(){
    this.listLeft = this.listLeft.sort((word1, word2) => {
      if (word1.descricao > word2.descricao) {
        return 1;
      }
      if (word1.descricao < word2.descricao) {
        return -1;
      }
      return 0;
    })

    this.listRight = this.listRight.sort((word1, word2) => {
      if (word1.descricao > word2.descricao) {
        return 1;
      }
      if (word1.descricao < word2.descricao) {
        return -1;
      }
      return 0;
    })

  }
}

import { Directive, HostListener,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() dropped  = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<Boolean>();

  constructor() { }

  @HostListener('drop',['$event'])
  OnDrop($event){
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover',['$event'])
  OnDragOver($event){
    $event.preventDefault();
    this.hovered.emit(false);
  }

  @HostListener('dragleave',['$event'])
  OnDragLeave($event){
    $event.preventDefault();
    this.hovered.emit(false);
  }

  


}

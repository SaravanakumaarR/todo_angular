import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { modalPopupModel } from 'src/app/model/modal.popup.model';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent {
  @ViewChild('closeModal') closeModal!: ElementRef;

@Input('modalData') modalData! : modalPopupModel;
@Output() actionEvent = new EventEmitter<boolean>();

action() {
  this.actionEvent.emit(true);
  this.closeModal?.nativeElement.click();
}
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupComponent } from './modal-popup.component';
import { EventEmitter } from '@angular/core';

describe('ModalPopupComponent', () => {
  let component: ModalPopupComponent;
  let fixture: ComponentFixture<ModalPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPopupComponent]
    });
    fixture = TestBed.createComponent(ModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('event should be emitted', ()=> {
    fixture.detectChanges();
    component.actionEvent.subscribe(data => {
      expect(data).toBeTruthy();
    })
    component.action();

  })
});

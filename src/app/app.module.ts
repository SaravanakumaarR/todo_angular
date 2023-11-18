import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ModalPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

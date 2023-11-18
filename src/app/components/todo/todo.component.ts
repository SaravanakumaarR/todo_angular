import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modalPopupModel } from 'src/app/model/modal.popup.model';
import { TodoModel, TodoStatus } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoForm!: FormGroup;
  toDoData!: TodoModel;
  toDoList: TodoModel[] = [];
  isTodoSelectedForEdit: boolean = false;
  modalData: modalPopupModel = {
    actionText: 'Delete',
    modalContent: 'Are you sure to delete ?',
    modalTitle: 'Warning'
  }
  constructor(private fb: FormBuilder, private toDoSvc: TodoService) { }
  ngOnInit(): void {
    this.initialiseForm();
    this.fetchAllTodo();
  }

  fetchAllTodo() {
    this.toDoSvc.fetchAllTodo().subscribe({
      next: (resData) => {
        this.toDoList = resData;
      },
      error: (err) => {
        // handle 
      }
    })
  }
  initialiseForm(): void {
    this.isTodoSelectedForEdit = false;
    this.toDoForm = this.fb.group({
      description: ['', Validators.required],
      id: [],
      status: [TodoStatus.OPEN]
    })
  }

  saveTodo(): void {
    if (this.toDoForm.valid) {
      this.toDoData = { ...this.toDoForm.value };
      if (this.isTodoSelectedForEdit)
        this.updateTodo();
      else
        this.toDoSvc.saveToDo(this.toDoData);
      this.intitialiseAndFetchAllTodo();
    }
  }

  updateTodo(): void {

    this.toDoSvc.updateTodo(this.toDoData);

  }

  onEditClick(todo: TodoModel): void {
    this.isTodoSelectedForEdit = true;
    this.toDoForm.patchValue({
      description: todo.description,
      id: todo.id
    })
    console.log(this.toDoForm.value)
  }

  onDeleteClick(todo: TodoModel): void {
    this.toDoData = todo;
  }

  deleteTodo(): void {
    this.toDoSvc.deleteTodo(this.toDoData.id);
    this.intitialiseAndFetchAllTodo();

  }

  intitialiseAndFetchAllTodo() {
    
    this.initialiseForm();
    this.fetchAllTodo();
  }

  markAsDone(todo: TodoModel) {
    todo.status = TodoStatus.CLOSED
    this.toDoSvc.updateTodo(todo);
    this.intitialiseAndFetchAllTodo();
  }

  get descControl(): AbstractControl {
    return this.toDoForm.get('description') as AbstractControl;
  }
}

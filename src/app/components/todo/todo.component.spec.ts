import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { of, throwError } from 'rxjs';
import { TodoModel, TodoStatus } from 'src/app/model/todo.model';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockTodoSvc: TodoService;
  let testData: TodoModel;
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [TodoComponent,ModalPopupComponent],
      imports: [ReactiveFormsModule],
      providers: [TodoService]
    });
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

     mockTodoSvc = TestBed.inject(TodoService);
    spyOn(mockTodoSvc, 'fetchAllTodo').and.returnValues(of([{
      description: 'Activity 1',
      id: 1,
      status: TodoStatus.OPEN
    }]), throwError(() => {}));
    testData= {id:1, description: 'act 1', status: TodoStatus.OPEN};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toList be populated', ()=> {
    
    component.ngOnInit();
    expect(component.toDoList[0].id).toBe(1); 
    component.toDoList = [];
    component.ngOnInit();
    expect(component.toDoList.length).toBe(0); 
  })

  it('should todo obj to be populated', ()=> {
    component.toDoForm.patchValue({'description': 'act1'});
    spyOn(mockTodoSvc, 'saveToDo');
    spyOn(component, 'intitialiseAndFetchAllTodo');
    component.saveTodo();
    expect(component.toDoData.description).toBe('act1');
    component.isTodoSelectedForEdit = true;
    spyOn(mockTodoSvc, 'updateTodo');
    component.saveTodo();
    expect(mockTodoSvc.updateTodo).toHaveBeenCalled();

  })

  it('should todoForm to be updated with new value', ()=> {
    component.onEditClick(testData);
    expect(component.toDoForm.get('description')?.value).toBe('act 1');
  })

  it('test delete ' , ()=> {
    component.onDeleteClick(testData);
    expect(component.toDoData.description).toBe(testData.description);
    spyOn(mockTodoSvc, 'deleteTodo');
    spyOn(component, 'intitialiseAndFetchAllTodo');
    component.deleteTodo();    
    expect(component.intitialiseAndFetchAllTodo).toHaveBeenCalled();
  })

  it('test mark as done' , ()=> {
    component.markAsDone(testData);
    expect(testData.status).toBe(TodoStatus.CLOSED);
  })

});
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TodoModel, TodoStatus } from '../model/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let testData:TodoModel;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    testData= {id:1, description: 'act 1', status: TodoStatus.OPEN};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add data / update / delte to localStorage', ()=> {
    //save
    localStorage.clear();
    service.saveToDo(testData);
    testData = {...testData};
    testData.description='act 2'
    service.saveToDo(testData);
    const {data, idx} = service.getDataAndIndex(2);
    console.log(data)
    expect(data[idx].description).toBe('act 2');

    // delete
    localStorage.clear();
    service.saveToDo(testData);
    expect(service.getData().length).toBe(1);
    service.deleteTodo(1);
    expect(service.getData().length).toBe(0);

    //update

    localStorage.clear();
    service.saveToDo(testData);
    expect(service.getData()[0].description).toBe('act 2');
    testData.description='act 1';
    service.updateTodo(testData);
    expect(service.getData()[0].description).toBe('act 1');
  })

});

import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private TODO_LIST_KEY = 'TODO_LIST';
  private ID_GEN_KEY = 'ID_GEN';

  constructor() { }

  fetchAllTodo(): Observable<TodoModel[]> {
    return of(this.getData());
  }

  saveToDo(todo: TodoModel): void {
    todo.id = this.generateId();
    localStorage.setItem(this.ID_GEN_KEY, todo.id.toString());
    const data = this.getData();
    data.push(todo);
    this.updateDatainStorage(data);
  }

  updateTodo(todo : TodoModel): void {
    const {data, idx} = this.getDataAndIndex(todo.id);
    if(idx >-1) data[idx] = todo;
    this.updateDatainStorage(data);
  }

  deleteTodo(id: number): void {
    const {data, idx} = this.getDataAndIndex(id);
    if(idx >-1) data.splice(idx,1);
    this.updateDatainStorage(data);
  }
  
  getDataAndIndex(id: number) {
    const data = this.getData();
    const idx = data.findIndex(x => x.id === id);
    return {data, idx};
  }

  getData(): TodoModel[] {
    const data = localStorage.getItem(this.TODO_LIST_KEY);
    return data ? JSON.parse(data) : [];
  }

  generateId(): number {
    let strId = localStorage.getItem(this.ID_GEN_KEY);
    return strId ? (Number(strId) + 1) : 1;
  }

  updateDatainStorage(data: TodoModel[]): void {
    localStorage.setItem(this.TODO_LIST_KEY, JSON.stringify(data));
  }

}

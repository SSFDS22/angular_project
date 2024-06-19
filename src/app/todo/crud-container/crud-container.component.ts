import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Todo, TodoUtils} from '../model/todo.model';
import { CrudContainerService } from './crud-container.service';

@Component({
  selector: 'app-crud',
  template: `
    <refresh-count name="CRUD"></refresh-count>
    <app-create (createTodo)="onCreateTodo($event)"></app-create>
    <app-list [todos]="todos"
              (removeTodo)="onRemoveTodo($event)"
              (updateTodo)="onUpdateTodo($event)"
              (toggleAllTodos)="onToggleAllTodos($event)"
    ></app-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudContainerComponent  implements OnInit {

  constructor(private crudService : CrudContainerService){}
  ngOnInit(): void {
     this.crudService.initTodo();
     this.todos = this.crudService.todos;
  }
  todos: Todo[] = [];

  onCreateTodo = (todo: Todo): void => {
    this.crudService.onCreateTodo(todo);
  };

  onRemoveTodo = (todo: Todo): void => {
    this.crudService.onRemoveTodo(todo);
  };

  onUpdateTodo = (todo: Todo): void => {
    this.crudService.onUpdateTodo(todo);
  };

  onToggleAllTodos = (completed: boolean): void => {
    this.crudService.onToggleAllTodos(completed);
  };
}

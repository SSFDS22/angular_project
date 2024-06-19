import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Plog} from '@gpeel/plog';
import {Todo, TodoUtils} from '../../model/todo.model';

@Component({
  selector: 'app-create',
  template: `
    <refresh-count name="CREATE"></refresh-count>
    <div class="card custom-card">
      <div class="card-body p-4">
        <form (ngSubmit)="onAddTodo()" class="todo-form-input">
          <div class="form-outline flex-fill">
            <input [formControl]="inputFormControl" autocomplete="off"
                   s
                   class="form-control"
                   data-test="input-todo" placeholder="Type a new task ...">
          </div>
          <button class="custom-button" data-test="add-button" type="submit">Add</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  @Output() createTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  inputFormControl = new FormControl();

  constructor() {
    Plog.createComponent('CreateComponent');
  }

  onAddTodo(): void {
    Plog.action('in onAddTodo');
    if (this.inputFormControl.value?.trim()) {
      const todo = TodoUtils.createTodo(this.inputFormControl.value.trim());
      // this.todos.push(todo);
      this.createTodo.emit(todo);
      this.inputFormControl.setValue('');
    }
  }

}

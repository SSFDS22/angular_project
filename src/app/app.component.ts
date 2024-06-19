import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {faCoffee, faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';
import {Todo, TODO_FILTER_ENUM, TodoUtils} from './todo.model';

/**
 * Note-4 : also I could have used a modal instead of a simple input to edit the label.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // uneTodo : Todo | undefined;
  uneTodo!: Todo;

  // uneTodo : Todo = {id:2, label: 'tt', completed: false };
  faCoffee = faCoffee;
  faEdit = faEdit;
  faRemove = faRemove;
  // newTodoLabel: string = '';
  inputFormControl = new FormControl();
  // Toggle all todos
  inputToggleAllFormControl = new FormControl();
  // Add a new todo
  // Edit a todo
  @ViewChild('inputEdit', {static: false}) inputEditRef!: ElementRef<HTMLInputElement>;
  todoLabelFormControl: FormControl | undefined;
  editingTodo: Todo | undefined; // only one Todo.label could be edited at a time
  // Filter todos
  filterChoice: TODO_FILTER_ENUM = TODO_FILTER_ENUM.ALL;
  TODO_FILTER_ENUM = TODO_FILTER_ENUM;
  // Todos
  todos: Todo[] = [
    {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
    TodoUtils.createTodo('Sleep', true),
    TodoUtils.createTodo('Play sports'),
    TodoUtils.createTodo('Go to Mars'),
  ];
  protected readonly console = console;

  constructor() {
    this.uneTodo = {id: 2, label: 'tt', completed: false};
  }

  ngOnInit(): void {
    // this.uneTodo = {id:2, label: 'tt', completed: false };
  }

  onRemoveTodo(todo: Todo): void {
    console.log('REMOVE in APP', todo);
    this.todos.splice(this.todos.indexOf(todo), 1);
    // Now also check if all todos are completed to toggle the toggleAll checbkox
    this.todos.every(t => t.completed) ? this.inputToggleAllFormControl.setValue(true) : this.inputToggleAllFormControl.setValue(false);
  }

  onAddTodo(): void {
    console.log('in ADD TODO');
    if (this.inputFormControl.value?.trim()) {
      const todo = TodoUtils.createTodo(this.inputFormControl.value.trim());
      this.todos.push(todo);
      this.inputFormControl.setValue('');
      // impact on toggleAll
      this.inputToggleAllFormControl.setValue(false);
    }
  }

  onEditTodo(todo: Todo): void {
    if (todo.completed) {
      console.log('EDIT switch to edit mode ONLY if todo is NOT COMPLETED', todo);
      return;
    }
    console.log('EDIT switch', todo);
    if (this.todoLabelFormControl !== null) {
      console.log('already editing another todo => switching to the new one', todo);
    }
    this.todoLabelFormControl = new FormControl(todo.label);
    this.editingTodo = todo;

    setTimeout(() => {
      console.log('REF', this.inputEditRef.nativeElement);
      this.inputEditRef.nativeElement.focus();
    });
  }

  onValidEditExit() {
    if (this.todoLabelFormControl && this.editingTodo) {
      const label = this.todoLabelFormControl?.value;
      console.log('onExitEdit for label', label);
      if (label.trim() !== '') {
        // because we don't want empty labels
        this.editingTodo.label = this.todoLabelFormControl.value;
      }
      this.todoLabelFormControl = undefined;
      this.editingTodo = undefined;
    }
  }

  onCancelEditExit() {
    this.todoLabelFormControl = undefined;
    this.editingTodo = undefined;
  }

  onToggleAll(valueChecked: boolean): void {
    this.todos.forEach(todo => todo.completed = valueChecked);
  }

  onToggleOne(todo: Todo) {
    todo.completed = !todo.completed;
    console.log('TOGGLE completed new value', todo);
    if (!todo.completed) {
      console.log('one todo is not completed');
      this.inputToggleAllFormControl.setValue(false);
    } else {
      /**
       * after a change of completed flag in the array todos, we can now have uncompleted tasks
       * => So we must check.
       * If is the case => uncheck the toggleAll checkbox
       */
      // if all todos are completed, then check the toggleAll checkbox
      this.todos.every(t => t.completed) && this.inputToggleAllFormControl.setValue(true);
    }
  }

  setTasksFilterStatus(filter: TODO_FILTER_ENUM) {
    this.filterChoice = filter;
  }

  isFilterStatus(filter: TODO_FILTER_ENUM) {
    return this.filterChoice === filter;
  }
}

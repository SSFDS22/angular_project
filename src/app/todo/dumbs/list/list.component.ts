import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {faEdit, faRemove} from '@fortawesome/free-solid-svg-icons';
import {Plog} from '@gpeel/plog';
import {Todo, TODO_FILTER_ENUM} from '../../model/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnChanges {
  @Input() todos: Todo[] = [];
  @Output() removeTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() toggleAllTodos: EventEmitter<boolean> = new EventEmitter<boolean>();
  faEdit = faEdit;
  faRemove = faRemove;
  // Toggle all
  inputToggleAllFormControl: FormControl = new FormControl();
  // Editing
  @ViewChild('inputEdit', {static: false}) inputEditRef!: ElementRef<HTMLInputElement>;
  todoLabelFormControl: FormControl | undefined;
  editingTodo: Todo | undefined; // only one Todo.label could be edited at a time
  // Filtering
  filterChoice: TODO_FILTER_ENUM = TODO_FILTER_ENUM.ALL;
  TODO_FILTER_ENUM = TODO_FILTER_ENUM;

  constructor() {
    Plog.action('ListComponent');
  }

  /**
   * With the immutable approach, we are sure that when todos changes => its array reference changes too.
   * And that ngOnChanges will be called. With mutable approach, ngOnChanges is not called.
   */
  ngOnChanges(changes: SimpleChanges): void {
    Plog.ngOnChanges('ngOnChanges', changes);
    if (changes['todos']) {
      // Now also check if all todos are completed to toggle the toggleAll checbkox
      this.todos.every(t => t.completed) ? this.inputToggleAllFormControl.setValue(true) :
        this.inputToggleAllFormControl.setValue(false);
    }
  }

  onRemoveTodo(todo: Todo): void {
    Plog.action('REMOVE in APP', todo);
    // this.todos.splice(this.todos.indexOf(todo), 1);
    this.removeTodo.emit(todo);
  }

  /**
   * method called when the user click on the edit icon and enter the edit-mode
   */
  onEditTodo(todo: Todo): void {
    if (todo.completed) {
      Plog.debug('EDIT switch to edit mode ONLY if todo is NOT COMPLETED', todo);
      return;
    }
    Plog.action('EDIT switch', todo);
    if (this.todoLabelFormControl !== null) {
      Plog.debug('already editing another todo => switching to the new one', todo);
    }
    this.todoLabelFormControl = new FormControl(todo.label);
    this.editingTodo = todo;

    setTimeout(() => {
      Plog.debug('REF', this.inputEditRef.nativeElement);
      this.inputEditRef.nativeElement.focus();
    });
  }

  onValidEditExit() {
    if (this.todoLabelFormControl && this.editingTodo) {
      const label = this.todoLabelFormControl?.value;
      Plog.action('onExitEdit for label', label);
      if (label.trim() !== '') {
        // because we don't want empty labels
        this.updateTodo.emit({...this.editingTodo, label: this.todoLabelFormControl.value});
      }
      this.todoLabelFormControl = undefined;
      this.editingTodo = undefined;
    }
  }

  onCancelEditExit() {
    Plog.action('handleEscapeKeyboardEvent KEYDOWN escape',);
    this.todoLabelFormControl = undefined;
    this.editingTodo = undefined;
  }

  onToggleAll(valueChecked: boolean): void {
    // this.todos.forEach(todo => todo.completed = valueChecked);
    this.toggleAllTodos.emit(valueChecked);
  }

  onToggleOne(todo: Todo) {
    // todo.completed = !todo.completed;
    Plog.action('TOGGLE completed new value', todo);
    this.updateTodo.emit({...todo, completed: !todo.completed});
  }

  setTasksFilterStatus(filter: TODO_FILTER_ENUM) {
    Plog.action('setTasksFilterStatus', filter);
    this.filterChoice = filter;
  }

  isFilterStatus(filter: TODO_FILTER_ENUM) {
    return this.filterChoice === filter;
  }

}

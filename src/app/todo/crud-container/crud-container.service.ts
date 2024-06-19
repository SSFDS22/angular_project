import { Inject } from "@angular/core";
import { Todo, TodoUtils } from "../model/todo.model";
import { Plog } from "@gpeel/plog";

@Inject({
providedIn: 'root'
})

export class CrudContainerService{
    todos: Todo[] = [];

    initTodo=()=>{
        this.todos=[
            {id: 0, label: 'Go drink beers', completed: false}, // duck typing works fine!, but beware of id
            TodoUtils.createTodo('Sleep', true),
            TodoUtils.createTodo('Play sports'),
            TodoUtils.createTodo('Go to Mars'),
          ];
    }
    onCreateTodo = (todo: Todo): void => {
        // mutable way
        // this.todos.push(todo);
        // immutable way
        this.todos = [...this.todos, todo];
        Plog.state('todos', this.todos);
      };
    
      onRemoveTodo = (todo: Todo): void => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        Plog.state('todos', this.todos);
      };
    
      onUpdateTodo = (todo: Todo): void => {
        this.todos = this.todos.map(t => t.id === todo.id ? todo : t);
        Plog.state('todos', this.todos);
      };
    
      onToggleAllTodos = (completed: boolean): void => {
        // immutable way
        // simplified version where we always create a new array event if no todo has been updated
        // in the case they were all already completed
        // this.todos = this.todos.map(t => { return {...t, completed}; });
        this.todos = this.todos.map(t => ({...t, completed}));
        Plog.state('todos', this.todos);
      };
}
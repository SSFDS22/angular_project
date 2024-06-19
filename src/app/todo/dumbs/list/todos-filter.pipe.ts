import {Pipe, PipeTransform} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Todo, TODO_FILTER_ENUM} from '../../model/todo.model';

@Pipe({
  name: 'todosFilterPipe',
  pure: true
  // pure: false
})
export class TodosFilterPipePipe implements PipeTransform {
  counter = 0;

  transform(todos: Todo[], status: TODO_FILTER_ENUM): Todo[] {
    Plog.pipe('pipe computation:' + this.counter++);
    let res!: Todo[];

    if (status === TODO_FILTER_ENUM.ALL) {
      res = todos;
    } else if (status === TODO_FILTER_ENUM.COMPLETED) {
      res = todos.filter(tc => tc.completed);
    } else if (status === TODO_FILTER_ENUM.ACTIVE) {
      res = todos.filter(tc => !tc.completed);
    }
    return res;
  }

}










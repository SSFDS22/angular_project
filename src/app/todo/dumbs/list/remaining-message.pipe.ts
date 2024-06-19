import {Pipe, PipeTransform} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Todo} from '../../model/todo.model';

/**
 * This Pipe does ALL the work,
 * not only computing number of remaining Todo(s) but returning the right message.
 * Usage :
 *       <span class="todo-count"><strong>{{ todos |remainingTasks }}</strong></span>
 */
@Pipe({
  name: 'remainingMessage',
  // pure: false
  pure: true
})
export class RemainingMessagePipe implements PipeTransform {
  counter = 0;

  transform(todos: Todo[]): string {
    Plog.pipe('RemainingTasks Pipe computates:' + this.counter++);
    const num = todos.filter(t => !t.completed).length;
    switch (num) {
      case 0:
        return 'No remaining todos';
      case 1:
        return '1 remaining todo';
      default:
        return `${num} remaining todos`;
    }
  }

}










import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(todos: Todo[], searchTerm: string) {
    if(!todos) return [];
    if(!searchTerm) return todos;
    return todos.filter(text => {
      return text.name.includes(searchTerm) ||
             text.description.includes(searchTerm);
    });
  }

}

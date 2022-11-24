import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo.model';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(todos: Todo[], searchTerm: string) {
    if(!todos) return [];
    if(!searchTerm) return todos;
    console.log('searchterm filter')
    console.log(searchTerm);
    console.log('todos')
    console.log(todos);

    // searchTerm = searchTerm.toLowerCase();
    return todos.filter(text => {
      return text.name.includes(searchTerm) ||
             text.description.includes(searchTerm);
    });
    // return todos.filter(text => text.name.indexOf(searchTerm[0]) !== -1);
  }

}

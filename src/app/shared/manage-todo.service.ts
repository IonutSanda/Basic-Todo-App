import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject, Subject
} from 'rxjs';
import {
  Todo
} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class ManageTodoService {

  todos: Todo[] = [];
  todoSub = new Subject < Todo[] > ;
  currentTodo = new Subject < Todo > ();
  isEditMode = new BehaviorSubject < boolean > (false);
  editTodo!: Todo;

  constructor() {}

  addTodo(todo: Todo) {
    const newTodo = new Todo(todo.name, todo.description, todo.status = 'open')
    this.todos.push(newTodo);
    this.todoSub.next(this.todos);
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodoByName(todo: Todo) {
    const index = this.todos.indexOf(todo);
    return this.todos[index];
  }

  getTodosByStatus(status: string){
    let newArray = this.todos.filter((sts) => {
      return sts.status === status
    })
    this.todoSub.next(newArray);
    return newArray;
  }

  getCurrentTodo() {
    this.currentTodo.subscribe((todo) => this.editTodo = todo);
    return this.editTodo;
  }

  updateTodo(todo: Todo, newTodo: Todo) {
    const index = this.todos.findIndex(obj => obj.name === todo.name);
   
    this.todos[index] = newTodo;
    this.todoSub.next(this.todos.slice());
  }

  deleteTodo(todo: Todo) {
    todo.status = 'deleted';
    this.todoSub.next(this.todos.slice());
  }
}

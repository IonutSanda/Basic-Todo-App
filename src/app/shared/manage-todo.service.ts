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
  private todoSub = new Subject < Todo[] > ;
  todoObs = this.todoSub.asObservable();
  private searchTermSub = new Subject<string>();
  searchTermObs = this.searchTermSub.asObservable();
  private isEditMode = new BehaviorSubject < boolean > (false);
  isEditModeObs = this.isEditMode.asObservable();
  private currentTodo = new Subject < Todo > ();
  currentTodoObs = this.currentTodo.asObservable();
  editTodo!: Todo;
  

  constructor() {}

  addTodo(todo: Todo) {
    const newTodo = new Todo(todo.name, todo.description, todo.status = 'open')
    this.todos.push(newTodo);
    this.todoSub.next(this.todos);
  }

  getTodos() {
    return [...this.todos];
  }

  getTodoByName(todo: Todo) {
    const index = this.todos.indexOf(todo);
    return this.todos[index];
  }

  getTodosByStatus(status: string){
    let newArray = this.todos.filter((sts) => {
      return sts.status === status
    })
    return newArray;
  }

  getCurrentTodo() {
    this.currentTodo.subscribe((todo) => this.editTodo = todo);
    return this.editTodo;
  }

  updateTodo(todo: Todo, newTodo: Todo) {
    const index = this.todos.findIndex(obj => obj.name === todo.name);

    let newStatus;
    if(!this.isEditMode){
      newStatus = todo.status;
    } else {
      newStatus = newTodo.status;
    }
    this.todos[index] = {...newTodo, status: newStatus};
    this.todoSub.next([...this.todos]);
  }

  deleteTodo(todo: Todo) {
    todo.status = 'deleted';
    this.todoSub.next([...this.todos]);
  }

  searchTerm(searchTerm: string){
    this.searchTermSub.next(searchTerm);
  }

  setIsEditMode(isEditMode: boolean){
    this.isEditMode.next(isEditMode);
  }

  setCurrentTodo(currentTodo: Todo){
    this.currentTodo.next(currentTodo);
  }

}

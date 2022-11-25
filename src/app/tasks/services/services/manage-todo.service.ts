import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject, Subject
} from 'rxjs';
import {
  Todo
} from '../models/todo.model';
import{ HttpClient } from '@angular/common/http'

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
  
  private url = 'https://todoproject-a5d86-default-rtdb.firebaseio.com/todos.json';
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo) {
    const newTodo = new Todo(todo.name, todo.description, todo.status = 'open')
    this.todos.push(newTodo);
    this.http.post<Todo>(this.url, newTodo).subscribe();
    this.todoSub.next(this.todos);
  }

  getTodos() {
    // return [...this.todos];
    return this.http.get(this.url);
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

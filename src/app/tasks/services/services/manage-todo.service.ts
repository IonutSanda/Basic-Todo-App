import { HttpClient } from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject, map, Observable, Subject
} from 'rxjs';
import {
  Todo
} from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ManageTodoService {

  todos: Todo[] = [];

  private todoSub = new Subject < Todo[] > ;
  private searchTermSub = new Subject<string>();
  private isEditMode = new BehaviorSubject < boolean > (false);
  private currentTodo = new Subject < Todo > ();

  todoObs = this.todoSub.asObservable();
  searchTermObs = this.searchTermSub.asObservable();
  isEditModeObs = this.isEditMode.asObservable();
  currentTodoObs = this.currentTodo.asObservable();
  
  editTodo!: Todo;
  
  private url = 'https://todoproject-a5d86-default-rtdb.firebaseio.com/todos.json';
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo):void {
    const newTodo = new Todo(todo.name, todo.description, todo.status = 'open');
    // this.todos.push(newTodo);
    this.http.post<Todo>(this.url, newTodo).subscribe();
    this.todoSub.next(this.todos);
  }

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      map((todos)=>{
        const todosArray: Todo[] = [];
        for(const key in todos){
          if(todos.hasOwnProperty(key)){
            todosArray.push(todos[key]);
          }
        };
        this.todos = todosArray;
        return todosArray;
      })
    );
  }

  getTodoByName(todo: Todo):Todo {
    const index = this.todos.indexOf(todo);
    return this.todos[index];
  }

  getTodosByStatus(status: string):Todo[]{
    let newArray = this.todos.filter((sts) => {
      return sts.status === status;
    })
    return newArray;
  }

  getCurrentTodo():Todo {
    this.currentTodo.subscribe((todo) => this.editTodo = todo);
    return this.editTodo;
  }

  updateTodo(todo: Todo, newTodo: Todo):void {
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

  deleteTodo(todo: Todo):void {
    todo.status = 'deleted';
    this.todoSub.next([...this.todos]);
  }

  searchTerm(searchTerm: string):void{
    this.searchTermSub.next(searchTerm);
  }

  setIsEditMode(isEditMode: boolean):void{
    this.isEditMode.next(isEditMode);
  }

  setCurrentTodo(currentTodo: Todo):void{
    this.currentTodo.next(currentTodo);
  }

}

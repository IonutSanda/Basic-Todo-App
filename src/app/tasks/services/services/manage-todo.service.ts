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

  private searchTermSub = new Subject<string>();
  private isEditMode = new BehaviorSubject < boolean > (false);
  private currentTodo = new Subject < Todo > ();

  searchTermObs = this.searchTermSub.asObservable();
  isEditModeObs = this.isEditMode.asObservable();
  currentTodoObs = this.currentTodo.asObservable();
  
  editTodo!: Todo;
  private baseUrl = 'https://todoproject-a5d86-default-rtdb.firebaseio.com/todos'
  private url = 'https://todoproject-a5d86-default-rtdb.firebaseio.com/todos.json';
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo):void {
    const newTodo = new Todo(todo.name, todo.description, todo.status = 'open');
    this.http.post<Todo>(this.url, newTodo).subscribe();
  }

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      map((todos)=>{
        const todosArray: Todo[] = [];
        for(const key in todos){
          if(todos.hasOwnProperty(key)){
            todosArray.push({...todos[key], id: key});
          }
        };
        this.todos = todosArray;
        return this.todos;
      })
      )
  }

  getTodosByStatus(status: string):Todo[]{
    this.todos = [...this.todos].filter((sts) => {
      return sts.status === status;
    })
    return this.todos;
  }

  getCurrentTodo():Todo {
    this.currentTodoObs.subscribe((todo) => {
      this.editTodo = todo;
    })
    return this.editTodo;
  }

  updateTodo(todo: Todo, newTodo: Todo):void {
    let newStatus;
    if(!this.isEditMode){
      newStatus = todo.status;
    } else {
      newStatus = newTodo.status;
    }

    const updatedTodoUrl = `${this.baseUrl}/${todo.id}.json`
    this.http.patch(updatedTodoUrl, {...newTodo, status: newStatus}).subscribe();
  }

  deleteTodo(todo: Todo):Observable<Todo> {
    todo.status = 'deleted';
    const patchUrl = `${this.baseUrl}/${todo.id}.json`
    return this.http.patch<Todo>(patchUrl, {"status": todo.status});
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

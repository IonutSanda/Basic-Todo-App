import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from '../services/models/todo.model';
import { ManageTodoService } from '../services/services/manage-todo.service';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  todos: Todo[] = [];
  searchTerm!: string;
  todoSubscription = new Subscription(); 
  searchTermSubscription = new Subscription()
  constructor(private todoService: ManageTodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoSubscription = this.todoService.todoObs.subscribe(() => {
      this.filterTodos();
    });
    this.filterTodos();

    this.searchTermSubscription = this.todoService.searchTermObs.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
    });
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
    this.searchTermSubscription.unsubscribe();
  }

  private filterTodos():void{
    //has to be improved using query params!
    const filter = this.route.snapshot.url[0].path;
    if(filter === 'todos'){
      this.todoService.getTodos().subscribe();
    } else {
      this.todos = this.todoService.getTodosByStatus(filter);
    }
  }

}

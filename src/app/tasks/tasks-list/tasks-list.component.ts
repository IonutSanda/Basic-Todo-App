import { ActivatedRoute, Router } from '@angular/router';
import { ManageTodoService } from '../services/services/manage-todo.service';
import { Todo } from '../services/models/todo.model';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { compileInjectable } from '@angular/compiler';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  todos: Todo[] = [];
  searchTerm!: string;
  todoSubscription = new Subscription(); 
  constructor(private todoService: ManageTodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoService.todoObs.subscribe(() => {
      this.filterTodos()
    })
    this.filterTodos();
    this.onTestSearch();
    }

    ngOnDestroy(): void {
      // this.todoSubscription.unsubscribe();
    }

  private filterTodos(){
    //has to be improved using query params!
    const filter = this.route.snapshot.url[0].path;
    if(filter === 'todos'){
      this.todoService.getTodos().subscribe();
    } else {
      this.todos = this.todoService.getTodosByStatus(filter);
    }
  }

  onTestSearch(){
    this.todoService.searchTermObs.subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
    })
  }

}

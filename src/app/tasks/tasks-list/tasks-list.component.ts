import { ActivatedRoute, Router } from '@angular/router';
import { ManageTodoService } from './../../shared/manage-todo.service';
import { Todo } from './../../shared/todo.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { compileInjectable } from '@angular/compiler';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: ManageTodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.todoService.todoSub.subscribe((todos) => {
        this.todos = todos;
      })
      this.todos = this.todoService.getTodos();
      this.filterTodos()
    }

  private filterTodos(){
    //has to be improved using query params!
    const filter = this.route.snapshot.url[0].path;
    if(filter === 'todos'){
      this.todos = this.todoService.getTodos();
      this.todoService.todoSub.next(this.todos);
    } else {
      this.todos = this.todoService.getTodosByStatus(filter);
      this.todoService.todoSub.next(this.todos);
    }
  }

}

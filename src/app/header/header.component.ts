import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManageTodoService } from '../shared/manage-todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private todoService: ManageTodoService) { }

  searchTerm: FormGroup = new FormGroup({searchTermInput: new FormControl()});

  ngOnInit(): void {
  }

  onSearchTerm(){
    const searchTerm = this.searchTerm.get('searchTermInput')?.value
    this.todoService.searchTerm(searchTerm);
  }

}

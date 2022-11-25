import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManageTodoService } from '../../tasks/services/services/manage-todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private todoService: ManageTodoService) { }

  searchTerm: FormGroup = new FormGroup({searchTermInput: new FormControl()});

  onSearchTerm(): void{
    const searchTerm = this.searchTerm.get('searchTermInput')?.value
    this.todoService.searchTerm(searchTerm);
  }

}

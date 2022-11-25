import { TestBed } from '@angular/core/testing';

import { ManageTodoService } from './manage-todo.service';

describe('ManageTodoService', () => {
  let service: ManageTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

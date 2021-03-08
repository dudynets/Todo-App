import { logging } from 'protractor';
import { TodosService } from './shared/todos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = `Todo's:`;
  loading = true;

  constructor(public todosService: TodosService) {
  }

  ngOnInit() {
    this.todosService.initDatabase();

    this.todosService.fetchTodos().then(() =>{
      this.loading = false;
    })
  }
}

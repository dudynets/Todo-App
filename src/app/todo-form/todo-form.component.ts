import { TodosService } from './../shared/todos.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todos.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  public title: string = '';

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
  }

  addTodo() {
    if (this.title.trim()) {
      const todo: Todo = {
        title: this.title,
        id: Date.now(),
        completed: false,
        date: new Date(),
      }

      this.todosService.addTodo(todo);
    }
    
    this.title = '';
  }
}

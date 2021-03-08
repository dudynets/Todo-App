import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import "firebase/database";

export interface Todo {
    id: number,
    title: string,
    completed: boolean,
    date?: any,
}

@Injectable({providedIn: 'root'})
export class TodosService {
    public todos: Todo[] = [];
    private database: firebase.database.Database;

    initDatabase() {
      const firebaseConfig = {
        apiKey: "AIzaSyBasaoBrGjO0fWedT-EekBRsJ7OPXLqSTo",
        authDomain: "angular-todo-ed6c6.firebaseapp.com",
        databaseURL: "https://angular-todo-ed6c6-default-rtdb.firebaseio.com",
        projectId: "angular-todo-ed6c6",
        storageBucket: "angular-todo-ed6c6.appspot.com",
        messagingSenderId: "338440115126",
        appId: "1:338440115126:web:2e291a2a24b596f56de717"
      };
  
      firebase.initializeApp(firebaseConfig);
      this.database = firebase.database();
    }

    async fetchTodos() {
      let response: firebase.database.DataSnapshot = await this.database.ref('todos/').get();
      let result: Todo = response.val();
      let loadedTodo: Todo[] = [];

      if (result) {
        for (let todoId of Object.keys(result)) {
          let formattedTodoObject: Todo = result[todoId];
          if (result[todoId].date) formattedTodoObject.date = Date.parse(result[todoId].date);
          loadedTodo.push(formattedTodoObject);
          this.todos = loadedTodo;
        }
      }
      
      return response;
    }

    async onToggle(id: number) {
        const idx: number = this.todos.findIndex(t => t.id === id);
        this.todos[idx].completed = !this.todos[idx].completed;

        let response: firebase.database.DataSnapshot = await this.database.ref('todos/' + id).get();
        let todo: Todo = response.val();

        todo.completed = !todo.completed;

        this.database.ref('todos/' + id).set(todo);
    }

    addTodo(todo: Todo) {
      this.todos.push(todo);

      let formattedTodo: Todo = todo;
      if (todo.date) formattedTodo.date = todo.date.toISOString();
      this.database.ref('todos/' + todo.id).set(formattedTodo);
    }

    removeTodo(id: number) {
      this.todos = this.todos.filter(t => t.id != id);
      this.database.ref('todos/' + id).set(null);
    }
}
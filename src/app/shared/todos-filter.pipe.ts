import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from './todos.service'

@Pipe({
    name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {
    transform(todos: Todo[], search: string = ''): Todo[] {
        if (!search.trim()) {
            return todos;
        }

        return todos.filter(todo => {
            return todo.title.toLowerCase().trim().indexOf(search.toLowerCase().trim()) !== -1;
        })
    }
}
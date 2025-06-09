import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from '../../shared/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private todoService: TodoService) {}

  deleteTodo(): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você quer mesmo apagar a tarefa "${this.todo.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(this.todo.id);
        Swal.fire('Apagada!', 'Sua tarefa foi removida.', 'success');
      }
    });
  }

  onTaskChecked(): void {
    this.todoService.updateTodo(this.todo);
  }
  editTodo(): void {
    this.todoService.startEdit(this.todo);
  }
}

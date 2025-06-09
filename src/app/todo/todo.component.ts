import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

clearAll() {
    if (this.todos.length > 0) {
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Esta ação apagará TODAS as tarefas e não pode ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, apagar tudo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.todoService.clearAll();
          this.loadTodos();
          Swal.fire('Apagadas!', 'Todas as tarefas foram apagadas.', 'success');
        }
      });
    }
  }

  
  clearCompletedTasks() {
    
    const completedCount = this.todos.filter(t => t.completed).length;
    if (completedCount > 0) {
      Swal.fire({
        title: 'Você tem certeza?',
        text: `Isso apagará ${completedCount} tarefa(s) concluída(s).`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, apagar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.todoService.clearCompletedTasks();
          this.loadTodos();
        }
      });
    }
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
  }

  sortAlphabetically(): void {
    this.todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  get filteredTodos() {
    if(this.showCompletedTasks) {
      return this.todos;
    }
    return this.todos.filter(todo => !todo.completed);
  }

  get labelClearAll(){
    return 'Limpar Tudo'
  }
}

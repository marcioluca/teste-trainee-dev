import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos!: Todo[];

  private editingTodo = new BehaviorSubject<Todo | null>(null);
  public editingTodo$ = this.editingTodo.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  // NOVO: Método para iniciar a edição
  startEdit(todo: Todo): void {
    this.editingTodo.next(todo);
  }

  // NOVO: Método para limpar/finalizar a edição
  clearEdit(): void {
    this.editingTodo.next(null);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const todosJson = localStorage.getItem('todos');
    this.todos = todosJson ? JSON.parse(todosJson) : [
      { id: 1, title: 'make an awesome angular todo-list', completed: true },
      { id: 2, title: 'deploy my awesome angular todo-list project on github.io', completed: true },
      { id: 3, title: 'think about tasks I can example on my to do list project', completed: false },
      { id: 4, title: 'give up about the exemples (you already have them)', completed: false },
      { id: 5, title: "what can I do next? Let's do a new project! :)", completed: false }
    ];
    this.sortTodos();
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  private updateLocalStorageAndSave(): void {
    this.saveToLocalStorage();
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo);
    this.sortTodos();
    this.updateLocalStorageAndSave();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.sortTodos();
      this.updateLocalStorageAndSave();
    }
  }

  getTodoNewId(): number {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }

  sortTodos() {
    this.todos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  clearAll() {
    this.todos = [];
    this.updateLocalStorageAndSave();
  }

  clearCompletedTasks() {
    this.todos = this.todos.filter(todo => todo.completed === false);
    this.updateLocalStorageAndSave();
  }
}

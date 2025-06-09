import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Subscription } from 'rxjs';
import { Filter } from 'bad-words';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnDestroy {
  newTaskTitle: string = '';
  isEditMode = false;
  private currentEditingTodo: Todo | null = null;
  private editSubscription!: Subscription;

  filter = new Filter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    
    this.editSubscription = this.todoService.editingTodo$.subscribe(todo => {
      if (todo) {
        this.newTaskTitle = todo.title; 
        this.isEditMode = true;
        this.currentEditingTodo = todo;
      } else {
        this.newTaskTitle = ''; 
        this.isEditMode = false;
        this.currentEditingTodo = null;
      }
    });
  }

  addTask() {
    if (!this.newTaskTitle || !this.newTaskTitle.trim()) {
      return;
    }

    if (this.filter.isProfane(this.newTaskTitle)) {
      Swal.fire({
        icon: 'error',
        title: 'Conteúdo impróprio',
        text: 'Não é permitido cadastrar tarefas com palavras obscenas.',
      });
      return; // FUNÇÃO INTERROMPIDA 
    }
    if (this.isEditMode && this.currentEditingTodo) {
      // MODO DE ATUALIZAÇÃO
      const updatedTodo = { ...this.currentEditingTodo, title: this.newTaskTitle.trim() };
      this.todoService.updateTodo(updatedTodo);
      this.todoService.clearEdit();
    } else {
      // MODO DE CRIAÇÃO
      if(this.newTaskTitle.includes('|')) {
        const titles = this.newTaskTitle.split('|');
        titles.forEach(title => {
          const trimmedTitle = title.trim();
          if(trimmedTitle) {
            const newTodo: Todo = {
              id: this.todoService.getTodoNewId(),
              title: trimmedTitle,
              completed: false
            };
            this.todoService.addTodo(newTodo);
          }
        });
      } else {
       const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle.trim(),
        completed: false
       }
       this.todoService.addTodo(newTodo);
      }
    }

    this.newTaskTitle = ''; 
  }

  get buttonLabel(): string {
    return this.isEditMode ? 'Atualizar' : 'Salvar';
  }
  
  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  onEnter(event: Event): void {
    event.preventDefault();
    this.addTask();
  }
}
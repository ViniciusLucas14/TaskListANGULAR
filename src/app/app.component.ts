import { Todo } from './../models/todo.models';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  title = 'toDo';
  public toDos: Todo[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    })

    this.load();
  }

  add(){
    const todo = this.form.controls['title'].value;
    const id = this.toDos.length + 1
    this.toDos.push(new Todo(id, todo, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.toDos.indexOf(todo)

    if(index != -1){
      this.toDos.splice(index, 1)
    }
    this.save();
  }

  markAsDone(todo: Todo){
      todo.done = true
      this.save();
  }

  markAsUndone(todo: Todo){
      todo.done = false
      this.save();
  }

  save() {
    const data = JSON.stringify(this.toDos); 
    localStorage.setItem('toDos', data)//CONVERTE JSON PARA STRING
    this.mode='list'
  }

  load(){
    const data = localStorage.getItem('toDos'); 
    if(data){
      this.toDos = JSON.parse(data) //CONVERTE STRING PARA JSON
    }else{
      this.toDos = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}

import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos [] = ['todos', 'pendientes' , 'completados']
  filtroActual: fromFiltro.filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('filtro').subscribe(filtro =>{
      this.filtroActual = filtro;
    })
    this.store.select('todos').subscribe(todos=> {
      this.contarPendientes(todos)

      })
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos){
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro)
    this.store.dispatch(accion)
  }

  contarPendientes(todos: Todo[]){
    this.pendientes = todos.filter(todo=> !todo.completado).length;
  }

}

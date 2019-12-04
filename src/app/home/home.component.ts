import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { State } from '../store/reducers';
import { loadTodos, addTodos, deleteTodo } from '../store/actions';
import { Todo } from '../models';
import { Observable } from 'rxjs';
import { getAllTodos } from '../store/selectors';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  pageEvent: any;

  todos$: Observable<any>;

  constructor(private store: Store<State>, private _snackBar: MatSnackBar) {
    this.todos$ = this.store.pipe(select(getAllTodos({ name: 'joseph' })));
  }

  ngOnInit() {}

  loadTodos() {
    this.store.dispatch({ type: '[Todo] Load Todos' });
  }

  add() {
    const todo: Todo = {
      title: 'New todo',
      description: 'description ',
      isActive: false
    };
    const todos = [todo];
    this.store.dispatch(addTodos({ todos }));
  }

  delete(id: string) {
    this.store.dispatch(deleteTodo({ id }));
  }

  openSnackBar() {
    this._snackBar.open('This is working', 'OK', {
      duration: 2000
    });
  }
}

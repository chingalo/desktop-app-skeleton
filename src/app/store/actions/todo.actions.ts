import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models';

export const addTodos = createAction(
  '[Todo] add todo',
  props<{ todos: Todo[] }>()
);
export const loadTodos = createAction(
  '[Todo] load todo',
  props<{ payload: Todo[] }>()
);
export const deleteTodo = createAction(
  '[Todo] delete todo',
  props<{ id: string }>()
);

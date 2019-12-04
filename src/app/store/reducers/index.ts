import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TodoState, todoReducer } from './todo.reducers';

export interface State {
  todos: TodoState;
}

export const reducers: ActionReducerMap<State> = {
  todos: todoReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

// expose state app
export const getRootState = (state: State) => state;

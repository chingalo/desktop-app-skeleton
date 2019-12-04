import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { TodoState, todoAdapter } from '../reducers/todo.reducers';
import * as _ from 'lodash';

// get selector from entity of todo adpator
// get selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = todoAdapter.getSelectors();

// get state of todo
const getTodoState = createSelector(
  getRootState,
  (state: State) => {
    return state.todos;
  }
);

export const getAllTodos = (data: any) =>
  createSelector(
    getTodoState,
    (todoState: TodoState) => {
      const todos = selectAll(todoState);
      const todoIds = selectIds(todoState);
      const todoTotals = selectTotal(todoState);
      const todoEntities = selectEntities(todoState);
      console.log({ todos, todoIds, todoEntities, todoTotals });
      return _.orderBy(todos, 'id');
    }
  );

export const getLoadingStatus = createSelector(
  getTodoState,
  (todoState: TodoState) => {
    return todoState.isLoading;
  }
);

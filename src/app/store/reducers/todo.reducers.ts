import { Action, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../../models';
import { loadTodos, addTodos, deleteTodo } from '../actions';

// state of todo
export interface TodoState extends EntityState<Todo> {
  isLoaded: boolean;
  isLoading: boolean;
  error: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

// initate initial state of todo
const initialState: TodoState = todoAdapter.getInitialState({
  isLoaded: true,
  isLoading: false,
  error: null
});

const getUniqueId = () => {
  const uniqueId =
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);
  return uniqueId;
};

// handling of states

const todoReducerFuction = createReducer(
  initialState,
  on(loadTodos, (state, { payload }) => {
    // change state
    return todoAdapter.addMany(payload, state);
  }),
  on(addTodos, (state, { todos }) => {
    const dateTime = new Date();
    const id = getUniqueId();
    todos = todos.map((todo: Todo) => {
      return {
        ...todo,
        id: `${id}`,
        title: `${todo.title} at ${dateTime}`,
        description: `${todo.description} at ${dateTime}`
      };
    });
    return todoAdapter.addMany(todos, state);
  }),
  on(deleteTodo, (state, { id }) => {
    return todoAdapter.removeOne(id, state);
  })
);

export function todoReducer(state: TodoState | undefined, action: Action) {
  return todoReducerFuction(state, action);
}

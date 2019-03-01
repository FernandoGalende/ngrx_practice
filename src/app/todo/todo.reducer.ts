import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('todo primero');
const todo2 = new Todo('todo segundo');
const todo3 = new Todo('todo tercero');
const estadoInicial: Todo[] = [ todo1, todo2, todo3 ];

todo1.completado = true;

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
	switch (action.type) {
		case fromTodo.AGREGAR_TODO:
			const todo = new Todo(action.texto);
			return [ ...state, todo ];

		case fromTodo.TOGGLE_ALL_TODO:
			return state.map( todoEdit => {

				return {
					...todoEdit,
					completado: action.completado

				};
			});

		case fromTodo.TOGGLE_TODO:
			return state.map((todoEdit) => {
				if (todoEdit.id === action.id) {
					return {
						...todoEdit,
						completado: !todoEdit.completado,
					};
				} else {
					return todoEdit;
				}
			});

		case fromTodo.EDIT_TODO:
			return state.map((todoEdit) => {
				if (todoEdit.id === action.id) {
					return {
						...todoEdit,
						texto: action.texto,
					};
				} else {
					return todoEdit;
				}
			});

		case fromTodo.BORRAR_TODO:
			return state.filter((todoEdit) => {
				return todoEdit.id !== action.id;
			});

		default:
			return state;
	}
}

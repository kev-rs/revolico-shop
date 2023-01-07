
export interface INIT_STATE {
  search: string;
}

export const init_state = {
  search: ''
}

export type ActionPyaload = 
  | { type: 'search', payload: string }

export const ctxReducer = (state: INIT_STATE, action: ActionPyaload): INIT_STATE => {
  switch(action.type) {
    case 'search':
      return { search: action.payload }
    default:
      return state
  }
}
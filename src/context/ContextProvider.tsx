import { useReducer } from 'react'
import { Provider } from './context'
import { ctxReducer, init_state } from './ctxReducer';

export const ContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {

  const [ state, dispatch ] = useReducer(ctxReducer, init_state);
  
  const searchQuery = (text: string) => {
    dispatch({ type: 'search', payload: text });
  };

  return (
    <Provider value={{ ...state, searchQuery }}>
      { children }
    </Provider>
  )
}

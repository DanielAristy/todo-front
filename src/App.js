
import React, { useContext, useReducer, useEffect } from 'react';

// Endpoint
const API = "http://localhost:8080/api";

//Estados iniciales
const initialState = {
  list: []
};

//Contexto
const Store = createContext(initialState);

// Compenente de listado
const List = () => {

  //Estamos creando una tienda donde se almacenan los estados
  const { dispatch, state } = useContext(Store);
  return <div>
    <table>
      <thead>
        <td>Id</td>
        <td>Nombre</td>
        <td>¿Esta completado?</td>
      </thead>
      <tbody>
        {state.list.map((todo) => {
          return <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>{todo.esCompletado}</td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}
// Funcion pura que depende de una entrada y obtiene una salida
function reducer(state,action) {
  switch(action.type) {
    case 'update-list':
      return {...state, list: action.list};
    case 'add-itme':
      const newList = state.list;
      newList.push(action.item);
      return {...state, list: newList};
      default:
        return state;
  }
}

//Provider, conectar entre si diferentes componentes
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);
  return <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>;
}

function App() {
  return (
    <div>
      <List/>
      <StoreProvider/>
    </div>
  );
}

export default App;

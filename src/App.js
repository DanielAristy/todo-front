
import React, { useContext, useReducer, useEffect, createContext } from 'react';

// Endpoint
const API = "http://localhost:8000/api";

//Estados iniciales
const initialState = {
  list: []
};

//Componente para el formulario del Crud
// const Form = () => {
//   const formRef = useRef(null);
//   return <form ref={formRef}>
//       <input type="text" name="name" onChange={(event) => {
//         setState({...state, name: event.target.value })
//       }}></input>
//       <input type="text" name="description" onChange={(event) => {
//         setState({...state, description: event.target.value })
//       }}></input>
//       <button onClick={onAdd}>Agregar</button>
//   </form>
// }

//Contexto
const Store = createContext(initialState);

// Compenente de listado
const List = () => {

  //Estamos creando una tienda donde se almacenan los estados
  const { dispatch, state } = useContext(Store);

  //No nos esta bloqueando el render con esa funcion
  //Consultar por http con fetch
  useEffect(() => {
    console.log(API+"/todos");
    fetch(API+"/todos")
    .then(response => response.json())
    .then((list) => {
      dispatch({type: "update-list", list})
    })
  }, [state.list.length, dispatch]);

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
  return <StoreProvider>
        <List/>
        {/* <Form/> */}
  </StoreProvider>
}

export default App;

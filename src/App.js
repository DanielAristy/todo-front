
import React, { useContext, useReducer, useEffect, useRef, createContext, useState } from 'react';

// Endpoint
const API = "http://localhost:8000/api";

//Estados iniciales
const initialState = {
  list: []
};

//Contexto
const Store = createContext(initialState);


//Componente para el formulario del Crud
const Form = () => {
  //Referencia para el formulario
  const formRef = useRef(null);
  const { dispatch } = useContext(Store);
  const [state, setState ] = useState({});

  //Funcion interna del componente donde se agrega un nuevo Todo
  const onAdd = (event) => {
    event.preventDefault();

    //Se obtienen los datos que ingresamos por el navegador desde el form
    const request = {
      name: state.name,
      id: null,
      esCompletado: false
    };

    fetch(API+"/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((todo) => {
      dispatch({ type: "add-item", item: todo });
      //Estados internos en el cual se limpian los datos del formulario
      setState({name: ""})
      formRef.current.reset();
    });
  }
  //Se crea la referencia cuando el componente esta creado
  return <form ref={formRef}>
      <input type="text" name="name" onChange={(event) => {
        setState({...state, name: event.target.value })
      }}></input>
      <button onClick={onAdd}>Agregar</button>
  </form>
}


// Compenente de listado
const List = () => {

  //Estamos creando una tienda donde se almacenan los estados
  const { dispatch, state } = useContext(Store);

  //No nos esta bloqueando el render con esa funcion
  //Consultar por http con fetch
  useEffect(() => {
    fetch(API + "/todos")
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
    case 'add-item':
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList };
    default:
      return state;
  }
}

//Provider, conectar entre si diferentes componentes
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>;
}

function App() {
  return <StoreProvider >
    <Form />
    <List />
  </StoreProvider>
}

export default App;
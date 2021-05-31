
import React, {useContext} from 'react';

const API = "http://localhost:8080/api"

function App() {
  return (
    <div>
      <List/>
    </div>
  );
}

const List = () => {

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

export default App;

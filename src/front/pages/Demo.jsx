import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <ul className="list-group">
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}>
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>
              <p>Open file ./src/front/store/flux.js to see the global store that contains and updates the list of colors</p>
              <button className="btn btn-success"
                onClick={() => actions.addTask({ id: item.id, color: '#ffa500' })}>
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
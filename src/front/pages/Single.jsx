import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";

export const Single = props => {
  const { store } = useContext(Context);
  const { theid } = useParams();
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theid));

  return (
    <div className="container text-center">
      <h1 className="display-4">Todo: {singleTodo?.title}</h1>
      <hr className="my-4" />
      <Link to="/">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};
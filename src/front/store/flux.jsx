export const initialStore = () => {
  return {
    message: null,
    token: sessionStorage.getItem("jwt-token") || null,
    user: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
  };
};

export const actions = (getState, dispatch) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return {
    setHello: (payload) => {
      dispatch({ type: "set_hello", payload: payload });
    },
    addTask: (payload) => {
      dispatch({ type: "add_task", payload: payload });
    },

    setFlashMessage: (msg, type = "danger") => {
      dispatch({
        type: "set_flash_message",
        payload: { text: msg, type: type },
      });
    },
    clearFlashMessage: () => {
      dispatch({ type: "clear_flash_message" });
    },

    signup: async (email, password) => {
      try {
        const resp = await fetch(`${BACKEND_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (resp.status === 201) {
          actions(getState, dispatch).setFlashMessage(
            "Registro exitoso, por favor inicia sesión.",
            "success"
          );
          return true;
        } else if (resp.status === 409) {
          actions(getState, dispatch).setFlashMessage(
            "El usuario ya existe.",
            "danger"
          );
        } else {
          actions(getState, dispatch).setFlashMessage(
            "Error al registrar: " + resp.statusText,
            "danger"
          );
        }
        return false;
      } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        actions(getState, dispatch).setFlashMessage(
          "Error de conexión al registrar.",
          "danger"
        );
        return false;
      }
    },

    login: async (email, password) => {
      try {
        const resp = await fetch(`${BACKEND_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await resp.json();

        if (resp.status === 200) {
          sessionStorage.setItem("jwt-token", data.token);
          dispatch({
            type: "set_auth_data",
            payload: { token: data.token, user: data.user_id },
          });
          actions(getState, dispatch).setFlashMessage(
            "Inicio de sesión exitoso!",
            "success"
          );
          return true;
        } else if (resp.status === 401) {
          actions(getState, dispatch).setFlashMessage(
            data.msg || "Credenciales inválidas.",
            "danger"
          );
        } else {
          actions(getState, dispatch).setFlashMessage(
            "Error al iniciar sesión: " + (data.msg || resp.statusText),
            "danger"
          );
        }
        return false;
      } catch (error) {
        console.error("Error en la solicitud de login:", error);
        actions(getState, dispatch).setFlashMessage(
          "Error de conexión al iniciar sesión.",
          "danger"
        );
        return false;
      }
    },

    logout: () => {
      sessionStorage.removeItem("jwt-token");
      dispatch({ type: "clear_auth_data" });
      actions(getState, dispatch).setFlashMessage("Sesión cerrada.", "info");
    },

    getPrivateData: async () => {
      const store = getState();
      if (!store.token || store.token === "" || store.token === undefined) {
        actions(getState, dispatch).setFlashMessage(
          "No autenticado, por favor inicia sesión.",
          "warning"
        );
        return null;
      }

      try {
        const resp = await fetch(`${BACKEND_URL}/api/private`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        });

        const data = await resp.json();

        if (resp.status === 200) {
          actions(getState, dispatch).setFlashMessage(
            "Datos privados obtenidos!",
            "success"
          );
          return data;
        } else if (resp.status === 401 || resp.status === 403) {
          actions(getState, dispatch).setFlashMessage(
            "Token inválido o expirado. Por favor, inicia sesión de nuevo.",
            "danger"
          );
          actions(getState, dispatch).logout();
          return null;
        } else {
          actions(getState, dispatch).setFlashMessage(
            "Error al obtener datos privados: " + (data.msg || resp.statusText),
            "danger"
          );
          return null;
        }
      } catch (error) {
        console.error("Error al obtener datos privados:", error);
        actions(getState, dispatch).setFlashMessage(
          "Error de conexión al obtener datos privados.",
          "danger"
        );
        return null;
      }
    },
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return { ...store, message: action.payload };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "set_flash_message":
      return { ...store, message: action.payload };

    case "clear_flash_message":
      return { ...store, message: null };

    case "set_auth_data":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "clear_auth_data":
      return { ...store, token: null, user: null };

    default:
      throw Error("Unknown action.");
  }
}

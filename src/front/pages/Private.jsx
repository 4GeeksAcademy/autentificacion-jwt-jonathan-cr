import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.jsx";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [privateData, setPrivateData] = useState(null);

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
        } else {
            const fetchData = async () => {
                const data = await actions.getPrivateData();
                if (data) {
                    setPrivateData(data);
                }
            };
            fetchData();
        }
    }, [store.token, navigate, actions]);

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    return (
        <div className="container mt-5 text-center">
            {store.message && (
                <div className={`alert alert-${store.message.type}`} role="alert">
                    {store.message.text}
                </div>
            )}
            <h2>Área Privada</h2>
            {store.token ? (
                <div>
                    <p>¡Bienvenido! Has iniciado sesión correctamente.</p>
                    {privateData ? (
                        <div>
                            <h3>Datos Privados:</h3>
                            <p>{JSON.stringify(privateData)}</p>
                        </div>
                    ) : (
                        <p>Cargando datos privados o no hay datos disponibles...</p>
                    )}
                    <button onClick={handleLogout} className="btn btn-danger mt-3">Cerrar Sesión</button>
                </div>
            ) : (
                <p>No tienes acceso a esta página. Por favor, <a href="/login">inicia sesión</a>.</p>
            )}
        </div>
    );
};
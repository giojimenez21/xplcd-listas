import { onValue, ref } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { database } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { orderData } from "../helpers/orderData";
import { ExportXLSX } from "./ExportXLSX";

export const Lists = () => {
    const dataTable = useRef();
    const { auth } = useContext(AuthContext);
    const startListRef = ref(database, "listas");
    const [loading, setLoading] = useState(true);
    const [dataLists, setDataLists] = useState([]);
    
    useEffect(() => {
        onValue(startListRef, (snapshot) => {
            const data = snapshot.val();
            setLoading(false);
            setDataLists(orderData(data, auth.role));
        });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-3">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <h1 className="text-center">Listas de precios</h1>
                        <ExportXLSX data={dataTable} />
                    </div>
                    <div ref={dataTable} className="w-100">
                        {dataLists.map((list) => (
                            <table className="table table-bordered mb-4 w-100">
                                <thead>
                                    <tr>
                                        <th
                                            className="text-center text-white fs-2 fw-semibold"
                                            style={{ backgroundColor: list.color }}
                                            colSpan={ Object.keys(list.products[0]).length }
                                        >
                                            {list.nameBrand}
                                        </th>
                                    </tr>
                                    <tr className="sticky-top bg-light">
                                        {Object.keys(list.products[0]).map(
                                            (th) => (
                                                <th className="text-uppercase">
                                                    {th}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.products.map((product) => (
                                        <tr>
                                            {Object.values(product).map(
                                                (value) => (
                                                    <td>{value}</td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

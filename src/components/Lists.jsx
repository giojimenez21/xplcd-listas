import React, { useContext, useEffect, useState } from "react";
import { getListPrices, startGetListPrice } from "../actions/user";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useForm } from "../hooks/useForm";
import { roles } from "../types/roles";

export const Lists = () => {
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState();
    const { user, dispatchUser } = useContext(UserContext);
    const { lists } = roles.find((rol) => rol.type === auth.role);
    const [selectValue, handleChange] = useForm({
        list: "",
    });

    const getData = async () => {
        if (selectValue.list !== "") {
            setLoading(true);
            const data = await startGetListPrice(selectValue.list);
            if (data) {
                dispatchUser(getListPrices(data));
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [selectValue.list]);

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
                <div className="col-12">
                    <h1 className="text-center">Listas de precios</h1>
                    <select
                        name="list"
                        className="form-select"
                        defaultValue={selectValue.list}
                        onChange={handleChange}
                    >
                        <option value="">
                            Seleccione una lista
                        </option>
                        {lists.map((list, i) => {
                            return (
                                <option key={i} value={list}>
                                    {list}
                                </option>
                            );
                        })}
                    </select>
                    {user?.priceList.map((pItem, i) => {
                        return (
                            <div className="table-responsive mt-4" key={i}>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th
                                                className="text-center"
                                                colSpan={8}
                                            >
                                                <h1>
                                                    {pItem?.nameBrand}
                                                </h1>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Modelo</th>
                                            <th>Disponible</th>
                                            <th>AAA</th>
                                            <th>COF</th>
                                            <th>COG</th>
                                            <th>INCELL</th>
                                            <th>OLED</th>
                                            <th>OR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pItem?.products.map(
                                            (product,i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{product.MODELO}</td>
                                                        <td>{product.DISPONIBLE}</td>
                                                        <td>{product.AAA}</td>
                                                        <td>{product.COF}</td>
                                                        <td>{product.COG}</td>
                                                        <td>{product.INCELL}</td>
                                                        <td>{product.OLED}</td>
                                                        <td>{product.OR}</td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

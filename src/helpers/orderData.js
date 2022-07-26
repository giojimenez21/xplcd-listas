export const orderData = (data) => {
    let auxIndex;
    let dataOrder = [];

    data.forEach((d, i) => {
        if (Object.keys(d).includes("AAA")) {
            auxIndex = dataOrder.findIndex((item) => item?.nameBrand === d?.MARCA.trim());
            if (auxIndex !== -1) {
                dataOrder[auxIndex].products.push({
                    id: i,
                    ...d,
                });
            } else {
                dataOrder.push({
                    nameBrand: d.MARCA,
                    color: d.Color,
                    products: [
                        {
                            id: i,
                            ...d,
                        },
                    ],
                });
            }
        }
    });
    return dataOrder;
};
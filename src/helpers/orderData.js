export const orderData = (data, role) => {
    let auxIndex, newProduct;
    let dataOrder = [];

    data.forEach((d) => {
        auxIndex = dataOrder.findIndex((item) => item?.nameBrand === d?.MARCA.trim());
        switch (role) {
            case "ADMIN":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    base: d.BASE,
                    xp31: d.XP31,
                    xp41: d.XP41,
                    xp51: d.XP51,
                    xp61: d.XP61,
                    xp71: d.XP71,
                };
                break;
            case "MAYORISTA1":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp41: d.XP41,
                    xp51: d.XP51,
                    xp61: d.XP61,
                    xp71: d.XP71,
                };
                break;
            case "MAYORISTA2":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp51: d.XP51,
                    xp61: d.XP61,
                    xp71: d.XP71,
                };
                break;
            case "VENDEDOR":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp61: d.XP61,
                    xp71: d.XP71,
                };
                break;
            case "31":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp31: d.XP31,
                };
                break;
            case "41":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp41: d.XP41,
                };
                break;
            case "51":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp51: d.XP51,
                };
                break;
            case "61":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp61: d.XP61,
                };
                break;
            case "71":
                newProduct = {
                    modelo: d.MODELO,
                    calidad: d.CALIDAD,
                    xp71: d.XP71,
                };
                break;
            default:
                break;
        }

        if (auxIndex !== -1) {
            dataOrder[auxIndex].products.push(newProduct);
        } else {
            dataOrder.push({
                nameBrand: d.MARCA,
                color: d.COLOR,
                products: [newProduct],
            });
        }
    });
    return dataOrder;
};

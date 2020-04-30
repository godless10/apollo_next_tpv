import root from "./root";
import auth from "./authTypes";
import shared from "./sharedTypes";
import proveedores from "./proveedoresTypes";
import categorias from "./categoriasTypes";
import productos from "./productosTypes";

const schemaArray = [root, auth, shared, proveedores, productos, categorias];

module.exports = schemaArray;

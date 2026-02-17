export const ApiPathConstants = {
    login: "login",
    products: "products",
    productId: "productId",
}

export const apiConstants = {
    LOGIN: `auth/${ApiPathConstants.login}`,
    PRODUCT_LIST: `/${ApiPathConstants.products}`,
    GET_PRODUCT_BY_ID: `/${ApiPathConstants.products}/:${ApiPathConstants.productId}`,
    CREATE_PRODUCT: `/${ApiPathConstants.products}/add`,
    UPDATE_PRODUCT: `/${ApiPathConstants.products}/:${ApiPathConstants.productId}`,
    DELETE_PRODUCT: `/${ApiPathConstants.products}/:${ApiPathConstants.productId}`,
}
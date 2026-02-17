export const PathConstants = {
    auth: "auth",
    login: "login",
    product: "product",
    list: "list",
    defaultRoute: "/",
    emptyRoute: "",
    wildCardRoute: "**",
}

export const RouteConstants = {
    loginPath: `/${PathConstants.auth}/${PathConstants.login}`,
    productListPath: `/${PathConstants.product}/${PathConstants.list}`

}
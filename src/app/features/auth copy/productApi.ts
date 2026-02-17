import { baseApi } from "src/app/apis/baseApi";
import { apiConstants, ApiPathConstants } from "src/app/constants";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => apiConstants.PRODUCT_LIST,
            providesTags: ['Products'],
        }),
        getProductById: builder.query({
            query: (id) => apiConstants.GET_PRODUCT_BY_ID.replace(`:${ApiPathConstants.productId}`, id),
        }),
        createProduct: builder.mutation({
            query: (params) => ({
                url: apiConstants.CREATE_PRODUCT,
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: apiConstants.UPDATE_PRODUCT.replace(`:${ApiPathConstants.productId}`, id),
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: apiConstants.DELETE_PRODUCT.replace(`:${ApiPathConstants.productId}`, id),
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
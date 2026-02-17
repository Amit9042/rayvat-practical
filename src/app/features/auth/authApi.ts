import { baseApi } from "src/app/apis/baseApi";
import { apiConstants } from "src/app/constants";
import type { LoginModel, UserModel } from "./models/login.model";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserModel, LoginModel>({
            query: (params) => ({
                url: apiConstants.LOGIN,
                method: 'POST',
                body: params,
            }),
        }),
    })
});

export const {
    useLoginMutation
} = authApi;
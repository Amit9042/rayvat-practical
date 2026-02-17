import { Box, Button, Stack, TextField } from "@mui/material";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { RouteConstants } from "../../../constants";
import { useLoginMutation } from "../authApi";
import { loginFormFields, type LoginModel } from "../models/login.model";

export const Login: FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginModel>({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const [loginFn, { isLoading }] = useLoginMutation();

  const onSubmit = async (formDetail: LoginModel) => {
    console.log(formDetail);
    try {
      const user = await loginFn(formDetail).unwrap();
      localStorage.setItem("accessToken", user.accessToken);
      navigate(`/${RouteConstants.productListPath}`);
    } catch (error) {
      console.error("ERROR IN LOGIN");
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name={`${loginFormFields.username}`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Username" variant="outlined" />
          )}
        />
        <Controller
          name={`${loginFormFields.password}`}
          control={control}
          render={({ field }) => (
            <TextField
              type="password"
              {...field}
              label="Password"
              variant="outlined"
            />
          )}
        />
        <Button variant="contained" type="submit" loading={isLoading}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

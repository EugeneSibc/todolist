import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useFormik } from "formik"

import { Navigate } from "react-router-dom"
import { selectAppIsLoggedIn } from "app/app.selectors"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { authThunks } from "features/auth/model/authSlice"
import { BaseResponseType } from "common/types/types"

export type LoginData = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
export const Login = () => {
  const isLoggedIn = useAppSelector(selectAppIsLoggedIn)
  const dispatch = useAppDispatch()
  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      // const errors: FormikErrorType = {}
      // if (!values.email) {
      //   errors.email = "Required"
      // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
      //   errors.email = "Invalid email address"

      // if (!values.password) {
      //   errors.password = "Required"
      // } else if (values.password.length < 6)
      //   errors.password = "Password must be more than 6 symbols"
      // return errors
    },
    onSubmit: (value, formikHelpers) => {

      dispatch(authThunks.loginTC(value))
      .unwrap()
      .catch((err:BaseResponseType)=>{
        err.fieldsErrors && err.fieldsErrors.forEach((el)=>{
          formikHelpers.setFieldError(el.field, el.error )
        })
          
      })
    },
  })
  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}

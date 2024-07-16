"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import * as yup from "yup";
import { baseURL } from "../../utils/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useToggle from "@/hooks/useToggle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const router = useRouter();
  const [passwordVisible, togglePasswordVisiblity] = useToggle();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email address is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be at most 16 characters long")
      .matches(
        /^(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,16}$/,
        "Password must contain at least one special character (!@#$%&*)"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseURL}/signin`, { ...values });
        if (response?.data?.user?.uid) {
          document.cookie = `authToken=${response?.data?.user?.uid}; path=/;`;
          toast.success("Login successful");
          formik.resetForm();
          router.push("/");
        }
      } catch (error) {
        if (
          error?.response?.data?.error ===
          "Firebase: Error (auth/invalid-credential)."
        ) {
          toast.error(
            "Invalid credentials. Please use correct email and password."
          );
        }
      }
    },
  });

  return (
    <Box
      sx={{ height: "100vh" }}
      backgroundColor="#e9f3ea"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container>
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Box
              padding={4}
              sx={{ background: "#35704e", borderRadius: "10px" }}
            >
              <Box>
                <Typography
                  variant="h3"
                  textAlign="center"
                  color="#55B9A9"
                  marginBottom="20px"
                >
                  Login
                </Typography>
              </Box>
              <Box
                sx={{
                  "& .MuiInputBase-root": {
                    padding: "0px",
                    background: "#fff",
                    borderRadius: "10px",
                  },
                  "& .MuiFormControl-root": {
                    marginBottom: "16px",
                    "& input": {
                      color: "#000",
                      fontFamily: '"Rubik", sans-serif',
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "normal",
                      height: "auto",
                      padding: "11px",
                      borderRadius: "10px",
                      background: "#fff",
                    },
                    "& textarea": {
                      color: "#000",
                      fontFamily: '"Rubik", sans-serif',
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "normal",
                      height: "100% !important",
                      padding: "0",
                      borderRadius: "10px",
                      background: "#fff",
                    },
                    "& fieldset": {
                      borderColor: "#E3E3E3",
                      borderRadius: "10px",
                      padding: "0",
                    },
                    "& .MuiInputBase-root": {
                      "&:focus-visible": {
                        outline: "none",
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "2px",
                        borderColor: "#E3E3E3",
                      },
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "#E3E3E3",
                        },
                      },
                    },
                    "& .Mui-error": {
                      "& fieldset": {
                        borderColor: "#d32f2f !important",
                      },
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "#d32f2f",
                        },
                      },
                    },
                    "& p.Mui-error": {
                      margin: "3px 0px !important",
                    },
                  },
                  "& ::placeholder": {
                    color: "#A4A4A4 !important",
                    opacity: "1 !important",
                  },
                }}
              >
                <Box>
                  <TextField
                    id="email"
                    fullWidth
                    placeholder="Email"
                    variant="outlined"
                    name="email"
                    value={formik?.values?.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik?.touched?.email && Boolean(formik?.errors?.email)
                    }
                    helperText={formik?.touched?.email && formik.errors.email}
                  />
                </Box>
                <Box>
                  <TextField
                    id="password"
                    fullWidth
                    placeholder="password"
                    variant="outlined"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    value={formik?.values?.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik?.touched?.password &&
                      Boolean(formik?.errors?.password)
                    }
                    helperText={
                      formik?.touched?.password && formik.errors.password
                    }
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ cursor: 'pointer', color: "#000", position: 'absolute', right: '15px' }}>
                            {passwordVisible ? <VisibilityOffIcon onClick={togglePasswordVisiblity} /> : <VisibilityIcon onClick={togglePasswordVisiblity} />}
                          </InputAdornment>
                        )
                      }}
                  />
                </Box>
                <Box>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: { lg: "15px", xs: "5px" },
                      background: "#55B9A9",
                      color: "#FFF",
                      fontFamily: '"Rubik", sans-serif',
                      fontSize: { lg: "20px", xs: "14px" },
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "normal",
                      letterSpacing: "1px",
                      padding: "13px 10px",
                      boxShadow: " none",
                      "&:hover": {
                        background: "#55B9A9",
                      },
                      textTransform: "capitalize",
                    }}
                    variant="contained"
                    onClick={formik.handleSubmit}
                    disabled={formik?.isSubmitting}
                  >
                    {formik?.isSubmitting ? "Login..." : "Login"}
                  </Button>
                  <Box
                    sx={{
                      marginTop: "10px",
                      a: {
                        color: "#55B9A9",
                      },
                    }}
                    textAlign="center"
                  >
                    {" "}
                    Not registered yet?{" "}
                    <Link href="/register">Sign up here</Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;

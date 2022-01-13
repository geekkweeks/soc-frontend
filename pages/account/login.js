import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API_URL } from "@/config/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { userService } from "services";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    console.log(username, password)
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        console.log("return url", returnUrl);
        router.push(returnUrl);
      })
      .catch((error) => {
        setError("apiError", { message: error });
      });
  }

  

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="alert alert-info">
        Username: test
        <br />
        Password: test
      </div>
      <div className="card">
        <h4 className="card-header">Next.js JWT Login Example</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            {errors.apiError && (
              <div className="alert alert-danger mt-3 mb-0">
                {errors.apiError?.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Container component="main" maxWidth="xs">
  //       <CssBaseline />
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //         <Box
  //           sx={{
  //             marginTop: 8,
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
  //             <RocketLaunchIcon />
  //           </Avatar>
  //           <Typography component="h1" variant="h5">
  //             Sign in
  //           </Typography>
  //           <Box
  //             component="form"
  //             onSubmit={handleSubmit}
  //             noValidate
  //             sx={{ mt: 1 }}
  //           >
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               id="username"
  //               label="username"
  //               name="username"
  //               autoComplete="username"
  //               autoFocus
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Password"
  //               type="password"
  //               id="password"
  //               autoComplete="current-password"
  //             />
  //             <FormControlLabel
  //               control={<Checkbox value="remember" color="primary" />}
  //               label="Remember me"
  //             />
  //             <Button
  //               type="submit"
  //               fullWidth
  //               variant="contained"
  //               sx={{ mt: 3, mb: 2 }}
  //             >
  //               Sign In
  //             </Button>
  //             <Grid container>
  //               <Grid item xs>
  //                 <Link href="#" variant="body2">
  //                   Forgot password?
  //                 </Link>
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         </Box>
  //       </form>

  //       <Copyright sx={{ mt: 8, mb: 4 }} />
  //     </Container>
  //   </ThemeProvider>
  // );
}

import Head from "next/head";
import { Stack, Box, Typography, TextField, Button, Link, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeTree1 from "../assets/Home_Tree 1.svg";
import HomeTree2 from "../assets/Home_Tree 2.png";
import LogoSmall3 from "../assets/CMyRoots_Logo 3.png";
import LogoSmall2 from "../assets/CMyRoots_Logo 2.svg";
import GoogleIcon from "../assets/flat-color-icons_google.svg";
import FacebookIcon from "../assets/logos_facebook.svg";
import { useAuth } from "../api/hooks/useAuth";
import { useState } from "react";
import { PATHS } from "../utils/path";
import { useAppDispatch } from "../redux/store";
import { JwtPayload } from "../api";
import { jwtDecode } from "jwt-decode";
import { fetchUserDetails } from "../slice/userSlice";


const menuLinkStyle = {
  fontFamily: "Nunito, sans-serif",
  fontWeight: 500,
  fontSize: { xs: "12px", md: "16px" },
  lineHeight: "100%",
  letterSpacing: 0,
  color: "#1E1E1E",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": { textDecoration: "none" },
};

const copyrightTextStyle = {
  fontFamily: "Nunito, sans-serif",
  fontWeight: 400,
  fontSize: { xs: "10px", md: "14px" },
  lineHeight: "100%",
  letterSpacing: 0,
  textAlign: "center",
  color: "#1E1E1E",
};


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { login } = useAuth();

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    setEmailError("");
    setErrorMessage("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await login({ email, password });
      // Check if token exists in response.data
      const token = response.data?.token;

      if (token) {
        // Save to localStorage
        localStorage.setItem("token", token);
        // Decode user info
        const decodedUserDetails: JwtPayload = jwtDecode(token);

        // Immediately fetch user details after login
        dispatch(fetchUserDetails(decodedUserDetails.id));

        // Navigate to home screen
        navigate(PATHS.HOMESCREEN);
      } else {
        setErrorMessage(response.message || "Login failed");
        setSnackbarOpen(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Unable to connect to server");
      setSnackbarOpen(true);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <Head>
        <title>Login | cMyRoots</title>
      </Head>

      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ minHeight: "100vh", width: "100%" }}
      >
        {/* Left Side - Hidden on mobile */}
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            flex: 0.8,
            background: "linear-gradient(to top, #B59662 0%, #FFFCF8 100%)",
            p: 4,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Box
            component="img"
            src={HomeTree1}
            alt="Family Tree"
            sx={{ width: "60%", maxWidth: 450, mb: 3 }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography>
              Build your family connections at{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                cMyRoots
              </Box>
            </Typography>
            <Typography>
              What are you waiting for? Connect with your loved ones today
            </Typography>

            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 3 }}>
              <Link href="#" sx={menuLinkStyle}>Home</Link>
              <Link href="#" sx={menuLinkStyle}>About</Link>
              <Link href="#" sx={menuLinkStyle}>Tour</Link>
              <Link href="#" sx={menuLinkStyle}>FAQ</Link>
            </Stack>
          </Box>

          <Stack alignItems="center" sx={{ mt: 5 }}>
            <Box component="img" src={LogoSmall2} alt="cMyRoots Logo" sx={{ width: 100, height: 40, mb: 1 }} />
            <Typography sx={copyrightTextStyle}>
              Copyright © 2019 cMyRoots.com. All Rights Reserved | Privacy Policy
            </Typography>
          </Stack>
        </Stack>

        {/* Right Side */}
        <Stack
          alignItems="center"
          justifyContent={{ xs: "flex-start", md: "center" }}
          sx={{
            flex: { xs: "1", md: 1.2 },
            bgcolor: "#fff",
            p: { xs: 2, md: 6 },
          }}
        >
          <Stack
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: 426 },
            }}
          >
            {/* Tree + text only visible on mobile */}
            <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "center", mb: 3 }}>
              <Box component="img" src={HomeTree2} alt="Family Tree" sx={{ width: 120, mb: 2 }} />
              <Typography sx={{ fontSize: 12 }}>
                Build your family connections at{" "}
                <Box component="span" sx={{ fontWeight: 700 }}>cMyRoots</Box>
              </Typography>
              <Typography sx={{ fontSize: 12 }}>
                What are you waiting for? Connect with your loved ones today
              </Typography>
            </Box>

            {/* Login Form */}
            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: 24, mb: 3 }}>
              Log In
            </Typography>

            <Stack component="form" spacing={2}>
              <TextField
                id="email"
                label="Email ID"
                type="email"
                placeholder="Enter Email"
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={handleEmailChange}
                error={Boolean(emailError)}
                helperText={emailError}
                value={email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#fff", // always white background
                    "& fieldset": { borderColor: "#ccc" }, // default border
                    "&:hover fieldset": { borderColor: "#72810B" }, // hover border
                    "&.Mui-focused fieldset": { borderColor: "#72810B" }, // focus border
                  },
                  "& .MuiOutlinedInput-input": {
                    p: "14px",
                    fontSize: 16,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 100px white inset",
                    WebkitTextFillColor: "#000",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#72810B",
                  },
                }}
              />
              <TextField
                id="password"
                type="password"
                placeholder="Enter Password"
                required
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(passwordError)}
                helperText={passwordError}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#72810B" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#72810B",
                      boxShadow: "0 0 0 2px rgba(114, 129, 11, 0.1)",
                    },
                  },
                  "& .MuiOutlinedInput-input": { p: "14px", fontSize: 16 },
                }}
              />
              <Box textAlign="left" sx={{ mt: -1 }}>
                <Link href="#"
                  sx={{
                    fontSize: 14,
                    color: "#16129A",
                    fontWeight: 400,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                onClick={handleLogin}
                sx={{
                  bgcolor: "#556E0E",
                  color: "#E9E9E9",
                  py: 1.8,
                  borderRadius: 2,
                  fontSize: 16,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#44550A" },
                }}
              >
                Log In
              </Button>

              {/* OR separator */}
              <Stack direction="row" alignItems="center" sx={{ my: 2, color: "#888" }}>
                <Box flex={1} height="1px" bgcolor="#ddd" />
                <Typography variant="body2" px={1}>
                  or
                </Typography>
                <Box flex={1} height="1px" bgcolor="#ddd" />
              </Stack>

              {/* Social Login */}
              <Stack direction="row" justifyContent="center" spacing={3}>
                <Box
                  component="img"
                  src={GoogleIcon}
                  alt="Google"
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
                <Box
                  component="img"
                  src={FacebookIcon}
                  alt="Facebook"
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                />
              </Stack>

              <Typography sx={{ textAlign: "center", color: '#16129A', fontSize: 14, mt: 2 }}>
                Don’t have an account?{" "}
                <Link href="#"
                  sx={{
                    color: "#556E0E",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "none" },
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Stack>

            {/* Mobile nav + footer */}
            <Box sx={{ display: { xs: "block", md: "none" }, mt: 5 }}>
              <Stack direction="row" justifyContent="center" spacing={3} sx={{ mb: 3 }}>
                <Link href="#" sx={menuLinkStyle}>Home</Link>
                <Link href="#" sx={menuLinkStyle}>About</Link>
                <Link href="#" sx={menuLinkStyle}>Tour</Link>
                <Link href="#" sx={menuLinkStyle}>FAQ</Link>
              </Stack>
              <Stack alignItems="center">
                <Box component="img" src={LogoSmall3} alt="cMyRoots Logo" sx={{ width: 100, height: 40, mb: 1 }} />
                <Typography sx={copyrightTextStyle}>
                  Copyright © 2019 cMyRoots.com. All Rights Reserved | Privacy Policy
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        <Snackbar
          open={snackbarOpen}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}
import { useState } from 'react';

// Material Ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';

// Firebase
import firebaseApp from "../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const theme = createTheme({
    palette: {
        primary: {
          main: blue[500],
        },
        secondary: {
          main: red[500],
        },
    }
});

export const Login = () => {

    const [disabled, setDisabled] = useState<boolean>(true);
    const [password, setPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<boolean>(false);

    function buttonState():boolean {
      if(password && email) {
        return true;
      } else {
        return false;
      }
    }

    const [isSignUp, setIstSignUp] = useState<boolean>(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data:FormData = new FormData(event.currentTarget);

        const email:string = String(data.get('email'));
        const password:string = String(data.get('password'));

        if(isSignUp) {
          const user = await createUserWithEmailAndPassword(auth, email, password);
        } else {
          signInWithEmailAndPassword(auth, email, password);
        }
    }

    return (
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height:60}}>
            <LockOutlinedIcon sx={{width: 40, height: 40}} />
          </Avatar>
          <Typography component="h1" variant="h3">
            {isSignUp ? "Sign up" : "Log in"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange = {(e) => {
                var text = e.currentTarget.value;

                if(text.length>0) {
                  setEmail(true);
                } else {
                  setEmail(false);
                }
              }}
              required
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange = {(e) => {
                var text = e.currentTarget.value;

                if(text.length>0) {
                  setPassword(true);
                } else {
                  setPassword(false);
                }
              }}
              required
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              
              disabled={!buttonState()}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? "Sign up" : "Continue"}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setIstSignUp(!isSignUp)}>
                  {isSignUp ? "Do you already have an account? Log in" : "Do you not have an account yer? Sign up here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Typography component="h3" variant="h6" sx={{marginTop:2, marginBottom:2}}>
            Or
          </Typography>
          <Button onClick={() => signInWithRedirect(auth, googleProvider)} color='secondary' fullWidth variant="outlined" startIcon = {<GoogleIcon/>}>
            You can acces with Google
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
    );
}
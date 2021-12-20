import { useState, useEffect } from 'react';

// Own imports
import { TableManager } from './table';
import { AddModal } from './addModal';

// Material ui
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Firebase
import firebaseApp from "../../firebase/firebaseConfig";
import {getAuth, signOut} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import { StringLiteralLike } from 'typescript';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

type props = {
    userEmail: string;
}

function createData(id:number, name:string, age:number, address:string, email:string) {
    return { id, name, age, address, email };
}

const rows = [
    createData(1, 'Sample name', 10, "sample address", 'sampleEmail@gmail.com'),
];

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

export const Manager = (props: props) => {

    const [peopleArray, setPeopleArray] = useState(null);

    async function getOrCreateUserDocument(documentId: string) {
        // Create reference for document
        const docRef = doc(firestore, `people/${documentId}`);
        // Obtain the document
        const query = await getDoc(docRef);
        // Check if it exists
        if(query.exists()) {
            // If it exists
            const docInfo = query.data();
            return docInfo.people;
        } else{
            // If it doesn't exists
            await setDoc(docRef, { people: [...rows]});
            const query = await getDoc(docRef);
            const docInfo:any = query.data();
            return docInfo.people;
        }
    }

    useEffect(() => {
        async function fetchPeople() {
           const obtained = await getOrCreateUserDocument(props.userEmail);
           setPeopleArray(obtained);
        }

        fetchPeople();
    } , [])

    return (

        <ThemeProvider theme = {theme}>
            <Container component = "main" maxWidth = "md">
                <CssBaseline />
                <Box sx = {{display:'flex', flexDirection: 'column', alignItems: 'end', marginTop: 8}}>

                    <AddModal userEmail={props.userEmail} setPeopleArray={setPeopleArray} peopleList={peopleArray}/>

                    {
                        peopleArray ? 
                        <TableManager userEmail={props.userEmail} setPeopleArray={setPeopleArray} peopleList={peopleArray}/> 
                        : <Typography sx = {{textAlign:'start', mt:3, mb:3}} variant="h6" component="h2"> Charging table </Typography>}
                    <Grid container>
                        <Grid item>
                            <Button
                            onClick={() => signOut(auth)}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="secondary"
                            >       
                                Log Out
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
import React, { useState } from 'react';

// Material ui imports
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';

// Firebase
import firebaseApp from "../../firebase/firebaseConfig";
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);

const CloseButton = styled(Button)(({theme}) => ({
    backgroundColor: grey[800],
    '&:hover': {
        backgroundColor: grey[700],
    },
}));

interface Person {
    id: number;
    name: string;
    age: number;
    address: string;
    email: string;
}

type props = {
    peopleList: any;
    userEmail: string;
    setPeopleArray: any;
}

export const AddModal = (props: props) => {

    const [name, setName] = useState<boolean>(false);
    const [age, setAge] = useState<boolean>(false);
    const [address, setAddress] = useState<boolean>(false);
    const [email, setEmail] = useState<boolean>(false);

    function buttonState():boolean {
        if(name && age && address && email) {
          return true;
        } else {
          return false;
        }
      }

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function addPerson(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Obtain data
        const data:FormData = new FormData(event.currentTarget);

        const name:string = String(data.get('name'));
        const age:number = parseInt(String(data.get('age')));
        const address:string = String(data.get('address'));
        const email:string = String(data.get('email'));

        // Create new people list
        const newPeopleList = [...props.peopleList, {id: + new Date(), name: name, age: age, address: address, email: email }];

        // Update database
        const docRef = doc(firestore, `people/${props.userEmail}`);
        updateDoc(docRef, {people: [...newPeopleList]});
        // Update state with the new array
        props.setPeopleArray(newPeopleList);

        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleOpen} variant = "contained" sx = {{mb:2}} startIcon = {<AddIcon/>}>
                Add New
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx = {{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 4,
                    }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add a new person
                        </Typography>
                        <Box component='form' onSubmit={addPerson} noValidate sx={{mt:2}}>
                            <TextField
                                onChange = {(e) => {
                                    var text = e.currentTarget.value;
                    
                                    if(text.length>0) {
                                      setName(true);
                                    } else {
                                      setName(false);
                                    }
                                  }}
                                margin="normal"
                                required
                                id="name"
                                label="Name"
                                name="name"
                                autoFocus
                                fullWidth
                            />
                            <Grid container>
                                <Grid item xs>
                                    <TextField
                                        onChange = {(e) => {
                                            var text = e.currentTarget.value;
                            
                                            if(text.length>0) {
                                              setAge(true);
                                            } else {
                                              setAge(false);
                                            }
                                          }}
                                        required
                                        id="age"
                                        label="Age"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="age"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        onChange = {(e) => {
                                            var text = e.currentTarget.value;
                            
                                            if(text.length>0) {
                                              setAddress(true);
                                            } else {
                                              setAddress(false);
                                            }
                                          }}
                                        required
                                        id="address"
                                        label="Street Address"
                                        name="address"
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                onChange = {(e) => {
                                    var text = e.currentTarget.value;
                    
                                    if(text.length>0) {
                                    setEmail(true);
                                    } else {
                                    setEmail(false);
                                    }
                                }}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                            <Grid container sx={{mt:2}}>
                                <Grid item xs>
                                    <CloseButton variant="contained" onClick={handleClose}>
                                        Close
                                    </CloseButton>
                                </Grid>
                                <Grid item>
                                <Button
                                    disabled={!buttonState()}
                                    type="submit"
                                    variant="contained"
                                    endIcon={<SaveIcon/>}
                                >
                                    Save
                                </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
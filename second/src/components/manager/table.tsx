// Material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

// Firebase
import firebaseApp from "../../firebase/firebaseConfig";
import {getFirestore, updateDoc, doc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

interface Person {
    id: number;
    name: string;
    age: number;
    address: string;
    email: string;
}

type props = {
    peopleList: Person [];
    userEmail: string;
    setPeopleArray: any;
}

export const TableManager = (props: props) => {

    async function deletePerson(personId:number){
        // Create new list whithout deleted row
        const newPeopleList = props.peopleList.filter((person) => person.id !== personId);

        // Update database
        const docRef = doc(firestore, `people/${props.userEmail}`);
        updateDoc(docRef, {people: [...newPeopleList]});
        // Update state with the new array
        props.setPeopleArray(newPeopleList);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Street Address</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.peopleList.map((person:Person) => (
                            <TableRow key={person.name}>
                                <TableCell>
                                    {person.name}
                                </TableCell>
                                <TableCell align="left">{person.age}</TableCell>
                                <TableCell align="left">{person.address}</TableCell>
                                <TableCell align="left">{person.email}</TableCell>
                                <TableCell align="left"><Button startIcon={<DeleteIcon/>} color="secondary" variant="contained" onClick={() => deletePerson(person.id)}> Delete </Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// import { async } from "@firebase/util";
import {   doc, collection, deleteDoc, onSnapshot } from "firebase/firestore";
// import {  serverTimestamp, updateDoc } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Grid, Image } from "semantic-ui-react";
import ModalComp from "../components/ModalComp";
import Spinner from "../components/Spinner";
import { db } from "../firebase";


const Home = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id , 'id');
        // console.log(doc.data);

        });

        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  if(loading){
    return <Spinner />
  }

  const handleModal = (item) => {
    setOpen(true);
    setUser(item);
    // navigate('')
    
  };

  const handleDelete = async(id) => {
    if(window.confirm('Are you sure to delete that user')){
      try{
        setOpen(false);
        await deleteDoc(doc(db, 'users', id))
        setUsers(users.filter((user)=> user.id !== id));
        // console.log(user)
      } catch (err){
        console.log(err);
      }
    }
  }


  return (
    <div>
     <Container>
         <Grid columns={3} stackable>
           {users && users.map((item) => (
               <Grid.Column key={item.id}>
                 <Card>
                 {/* {console.log(item.id)} */}
                   <Card.Content>
                     <Image
                       src={item.img}
                       size="medium"
                       style={{
                         height: "150px",
                         width: "150px",
                         borderRadius: "50%",
                       }}
                     />
                     <Card.Header style={{ marginTop: "10px" }}>
                       {item.name}
                     </Card.Header>
                     <Card.Description>{item.info}</Card.Description>
                   </Card.Content>
                   <Card.Content extra>
                     <div>
                       <Button
                         color="green"
                         onClick={() => navigate(`/update/${item.id}`)}
                       >
                         Update
                       </Button>
                       <Button
                         color="purple"
                         onClick={()=>handleModal(item) }
                       >
                         View
                       </Button>
                       {open && (
                        <ModalComp 
                          open={open}
                          setOpen={setOpen}
                          handleDelete = {handleDelete}
                          {...user}
                        />
                       )}
                     </div>
                   </Card.Content>
                 </Card>
               </Grid.Column>
             ))}
         </Grid>
     </Container>
    </div>
  )
}

export default Home

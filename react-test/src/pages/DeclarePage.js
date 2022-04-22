import React from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADhROQjGTctSTnuN0Q3XeapJ39K46ZFMk",
  authDomain: "lostandfound-e9912.firebaseapp.com",
  databaseURL: "https://lostandfound-e9912-default-rtdb.firebaseio.com",
  projectId: "lostandfound-e9912",
  storageBucket: "lostandfound-e9912.appspot.com",
  messagingSenderId: "971455276252",
  appId: "1:971455276252:web:0c65479f9b70e22f67c019"
};

// initialize
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
 
// class DeclarePage extends React.Component {


//   render() {
//     const params = useParams();
//     console.log(params);

//     return (
//       <div>Declare page.</div>
//     );
//   }
// }

function DeclarePage(props) {
  // read database
  const itemID = '0bfac146-1084-4001-8fe6-d5109eb1e2fe';
  const dbRef = ref(getDatabase());
  get(child(dbRef, `Found_items/${itemID}`)).then((snapshot) => {
    console.log(snapshot.val());

    const userID = snapshot.val().report_user;
    get(child(dbRef, `Users/${userID}`)).then((snapshot) => {
      console.log(snapshot.val());
    });
  });


  // console.log(this.props.match.params.id);
  const params = useParams();
  console.log(params);

  return (
    <div>Declare page. {params.itemID}</div>
  );
}
 
export default DeclarePage;
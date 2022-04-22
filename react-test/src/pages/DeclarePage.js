import React from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
const db = getFirestore(app);
 
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
  async function getCities(db) {
    const citiesCol = collection(db, 'users');
    console.log('citiesCol')
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log('test function');
    console.log(cityList);
    return cityList;
  }

  getCities(db).then(function (result){
    console.log(result);
  });

  // var dbRefObject = firebase.database().ref("Users/" + "person3");
  //   dbRefObject.on("value", (snapshot) => {
  //       const existuser = snapshot.val();
  //       console.log(existuser);
  //       // if (existuser == null){
  //       //     alert("This account is not existed, you can create an account fristly.");
  //       //     return false;
  //       // }else{
  //       //     const exist_password = existuser["password"]
  //       //     console.log(exist_password);
  //       //     if (exist_password != password){
  //       //         alert("Your password is incorrect");
  //       //         return false;
  //       //     }
  //       // }
  //   });


  // console.log(this.props.match.params.id);
  const params = useParams();
  console.log(params);

  return (
    <div>Declare page. {params.itemID}</div>
  );
}
 
export default DeclarePage;
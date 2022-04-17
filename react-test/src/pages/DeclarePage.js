import React from 'react';
import { useParams } from 'react-router-dom';
 
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
  // console.log(this.props.match.params.id);
  const params = useParams();
  console.log(params);

  return (
    <div>Declare page. {params.itemID}</div>
  );
}
 
export default DeclarePage;
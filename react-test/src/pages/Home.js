import React from 'react';
import { Link } from 'react-router-dom';
 
class Home extends React.Component {
  render () {
    return (
      <div>
        <header>
          <h1>Welcome</h1>
        </header>
 
        <main>
          <div><Link to="/mapdisplay">  Lost  </Link></div>
          <div><Link to="/login">  Find  </Link></div>
          
        </main>
      </div>
    );
  }
}
 
export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home_page.css';
import '../css/stylish-portfolio.css';
import Background from '../css/images/back.jpg';
 

let linkStyle = {
  textDecoration: 'none', 
  color: '#F2EADF',
  fontSize: 24,
};
let width = {
  width: 200,
}
class Home extends React.Component {
  

  render () {
    return (
      <div>
        <div className='header' style={{height: 800, backgroundImage: `url(${Background})` }}>
          {/* <h1>Welcome</h1> */}
          <div className="text-vertical-center">
            <h1 className="titlest" style={{fontSize: 100}}>USC LOST &amp; FOUND</h1>
            <h3 style={{fontSize: 30, color: '#F2EADF'}}>Make Lost-and-Found Becomes Easier</h3>
            {/* <br> */}
            <div className="row">
            <div className="btn1 btn-primary1 btn-block1 " style={width}><Link to="/mapdisplay" style={linkStyle}>  Report Lost  </Link></div>
            <br />
            <div className="btn1 btn-primary1 btn-block1 " style={width}><Link to="/login" style={linkStyle}>  Report Find  </Link></div>
              {/* <input type="button" class="btn1 btn-primary1 btn-block1 " value = "Report Lost"><br>
              <input type="button" class="btn1 btn-primary1 btn-block1 " value="Report Found" , onclick= "window.location.href = 'Signin.html';"> */}
            </div>
          </div>  
        </div>
 
        <main>
          {/* <div><Link to="/mapdisplay">  Lost  </Link></div>
          <div><Link to="/login">  Find  </Link></div> */}

          
          <div>
            {/* <h1 className="titlest" style={{fontSize: 100}}>USC LOST &amp; FOUND</h1>
            <h3 style={{fontSize: 30, color: '#F2EADF'}}>Make Lost-and-Found Becomes Easier</h3> */}
            {/* <div className="row">
              <div className="btn1 btn-primary1 btn-block1 "><Link to="/mapdisplay">  Lost  </Link></div>
              <div className="btn1 btn-primary1 btn-block1 "><Link to="/login">  Find  </Link></div>
            </div> */}
          </div>  
        </main>
      
      
      
      
      </div>
    );
  }
}
 
export default Home;
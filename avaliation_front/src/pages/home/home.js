import React from "react";
import { Card } from "react-bootstrap";


class Login extends React.Component {
  render() {
    return (
      <div className="mainHome" style={stylesheet.mainHome}>
        <Card style={stylesheet.cardHome}>
            <Card.Body style={stylesheet.cardBodyHome}>
              <h1>Bem vindo!</h1>
            </Card.Body>
        </Card>
      </div>
    );
  }
}

const stylesheet = {
  mainHome:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
  },
  cardHome:{
    height:'30%',
    width:'30%',
    marginTop:'10%',
    borderRadius:'12px',
    boxShadow: '0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)'
  },
  cardBodyHome:{
    marginBottom:'10%',
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
}

export default Login;
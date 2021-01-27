import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Row, Col, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from "./pages/components/Sidebar";
import p404 from "./pages/404/404";
import Home from "./pages/home/home";
import Categorias from "./pages/categorias/categorias";
import Cursos from "./pages/cursos/cursos";
import { LinkContainer } from "react-router-bootstrap";


const MyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (<>
    <Navbar style={{ backgroundColor: "#003366", color: "white", borderBottom: "3px solid Silver", justifyContent: "center" }} >
      <div style={{ width: "30%" }}>
      </div>
      <a href="/" style={{ width: "500%", textAlign: "center", fontWeight: "600", fontFamily: "UnBPro, sans-serif", fontSize: "calc(22px + 6 * ((100vw - 320px) / 680))", textDecoration: "none", color:"#f7f7f7", textShadow:'2px 1px 5px black' }}>
        Gerenciamento Cursos para Turma A
      </a>
      <div style={{ width: "15%", textAlign: "right" }}>
        <NavDropdown title={<img style={{ width: "auto", height: "40px", marginRight: "20px" }} id="changeOnHover"  alt="" src={process.env.PUBLIC_URL + "/img/Vector.png"} />}>
            <LinkContainer to="/405">
              <NavDropdown.Item style={{ color: "black" }}>WIP</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/405">
              <NavDropdown.Item style={{ color: "red" }}>WIP</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
      </div>
    </Navbar>
    <Row style={{ width: "100%" }}>
      <Col xs={2} style={{ minWidth: "170px", maxWidth:"250px", backgroundColor: "white", borderRight: "1px solid Silver", minHeight: "calc(100vh - 86px)", height: "calc(100% - 86px)" }}>
        <Sidebar />
      </Col>
      <Col id="page-content-wrapper" style={{ marginTop:"25px", marginBottom:"25px", marginLeft:"10px", width: "80vw!important" }}>
        <Component {...props} />
      </Col>
    </Row> 
  </>)
  } />
)

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <MyRoute exact path='/categorias' component={Categorias} />
          <MyRoute exact path='/cursos' component={Cursos} />
          <MyRoute exact path='/' component={Home} />
          <MyRoute exact path='*' component={p404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
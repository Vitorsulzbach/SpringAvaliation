import React from "react";
import './categorias.css'
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class Categorias extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categorias: [],
      categoria: {
        id: 2,
        codigo: 2,
        descricao: "Programação"
      },
      show: false,
      showNew: false,
    }
  }

  componentDidMount() {
    this.update();
  }

  update() {
    let that = this;
    axios.get('http://localhost:8000/categorias/all/')
      .then(function (response) {
        // handle success
        that.setState({ categorias: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  delete(id) {
    let that = this;
    axios.delete(`http://localhost:8000/categorias/delete/${id}`)
      .then(function (response) {
        that.update()
      })
      .catch(function (error) {
        alert(`error deleting categoria id:${id}`)
        that.update()
      })
  }

  submitCategoria() {
    let that = this;
    axios.put(`http://localhost:8000/categorias/put/`, this.state.categoria)
      .then(function (response) {
        that.update()
      })
      .catch(function (error) {
        //alert(`error updating categoria id:${this.state.categoria.id}`)
        console.log(error)
        that.update()
      })
  }

  submitNewCategoria() {
    let that = this;
    axios.post(`http://localhost:8000/categorias/save/`, this.state.categoria)
      .then(function (response) {
        that.update()
      })
      .catch(function (error) {
        //alert(`error updating categoria id:${this.state.categoria.id}`)
        console.log(error)
        that.update()
      })
  }

  render() {
    return (<>
      <div style={stylesheet.mainHome}>
        <Card style={stylesheet.cardHome} className="text-center">
          <Card.Header>
            <Card.Title><h1>Categorias</h1></Card.Title>
          </Card.Header>
          <Card.Body style={stylesheet.cardBodyHome}>
            <Card.Text>
              <div style={{ width: '100%', height: '100%' }}>
                <Row style={stylesheet.rowCategorias}>
                  <Col>
                    <h3>Código</h3>
                  </Col>
                  <Col>
                    <h3>Descrição</h3>
                  </Col>
                  <Col>
                  </Col>
                </Row>
                {this.state.categorias.sort((a,b)=>a.codigo-b.codigo).map(categoria => <>
                  <Row className="rowHoover" style={stylesheet.rowCategorias}>
                    <Col>
                      <div style={stylesheet.rowTextCategorias}>{categoria.codigo}</div>
                    </Col>
                    <Col>
                      <div style={stylesheet.rowTextCategorias}>{categoria.descricao}</div>
                    </Col>
                    <Col>
                      <Button style={stylesheet.buttonCategoria} onClick={() => { this.setState({ show: true, categoria }) }}>Edit</Button>
                      <Button style={stylesheet.buttonCategoria} onClick={() => { this.delete(categoria.id) }}>Delete</Button>
                    </Col>
                  </Row>
                </>)}
                <Row style={stylesheet.endButtonRow}>
                  <Col>
                    <Button onClick={()=>{this.setState({showNew:true,categoria:{id:"",codigo:"",descricao:""}})}}>Add</Button>
                  </Col>
                </Row>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Modal centered show={this.state.show} onHide={() => { this.setState({ show: false }) }}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ marginBottom: '10px' }}>Código:</h4>
          <input type="text" id="codigo" value={this.state.categoria.codigo} onChange={(event) => { this.setState({ categoria: { ...this.state.categoria, codigo: event.target.value } }); }} className="form-control login-input" placeholder="Código" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Descrição:</h4>
          <input type="text" id="descricao" value={this.state.categoria.descricao} onChange={(event) => { this.setState({ categoria: { ...this.state.categoria, descricao: event.target.value } }); }} className="form-control login-input" placeholder="Descrição" />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { this.setState({ show: false }) }}>
            Voltar
          </Button>
          <Button variant="primary" onClick={() => { this.setState({ show: false }); this.submitCategoria() }}>
            Alterar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={this.state.showNew} onHide={() => { this.setState({ showNew: false }) }}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ marginBottom: '10px' }}>Código:</h4>
          <input type="text" id="codigo" value={this.state.categoria.codigo} onChange={(event) => { this.setState({ categoria: { ...this.state.categoria, codigo: event.target.value } }); }} className="form-control login-input" placeholder="Código" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Descrição:</h4>
          <input type="text" id="descricao" value={this.state.categoria.descricao} onChange={(event) => { this.setState({ categoria: { ...this.state.categoria, descricao: event.target.value } }); }} className="form-control login-input" placeholder="Descrição" />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { this.setState({ showNew: false }) }}>
          Voltar
          </Button>
          <Button variant="primary" onClick={() => { this.setState({ showNew: false }); this.submitNewCategoria() }}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}

const stylesheet = {
  mainHome: {
    width: '100%',
    height: '100%',
  },
  cardHome: {
    height: '100%',
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)'
  },
  cardBodyHome: {
    width: '100%',
    height: '100%',
  },
  rowCategorias: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "8px",
    paddingTop: "5px",
    borderBottom: "1px solid black",
  },
  rowTextCategorias: {
  },
  endButtonRow: {
    marginTop: '35px'
  },
  addButton: {
  },
  buttonCategoria: {
    marginLeft: '30px'
  }
}

export default Categorias;
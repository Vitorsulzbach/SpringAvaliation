import React from "react";
import './cursos.css'
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import dateFormat from 'dateformat';
import DateTimePicker from 'react-datetime-picker';
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class Cursos extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cursos: [],
      curso: {
        id: 10001,
        nome: "EDO",
        descricao: "Estrutura de dados 1",
        initDate: new Date(),
        endDate: new Date(),
        qtdAluno: 40,
        categoria: "Processos"
      },
      categorias: [],
      show: false,
      showNew: false,
    }
  }

  componentDidMount() {
    this.update();
    this.getCategorias();
  }

  update() {
    let that = this;
    axios.get('http://localhost:8000/cursos/all/')
      .then(function (response) {
        // handle success
        that.setState({ cursos: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  getCategorias() {
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
    axios.delete(`http://localhost:8000/cursos/delete/${id}`)
      .then(function (response) {
        that.update()
      })
      .catch(function (error) {
        alert(`error deleting curso id:${id}`)
        that.update()
      })
  }

  submitCurso() {
    let that = this;
    axios.post(`http://localhost:8000/cursos/save/`, {
      ...this.state.curso,
      initDate: this.state.curso.initDate.getTime(),
      endDate: this.state.curso.endDate.getTime(),
      categoria: this.state.categorias.find(categoria => categoria.descricao === this.state.curso.categoria)
    })
      .then(function (response) {
        that.update()
      })
      .catch(function (error) {
        //alert(`error updating curso id:${this.state.curso.id}`)
        console.log(error)
        that.update()
      })
  }

  submitNewCurso() {
    let that = this;
    axios.post(`http://localhost:8000/cursos/save/`, {
      ...this.state.curso,
      initDate: this.state.curso.initDate.getTime(),
      endDate: this.state.curso.endDate.getTime(),
      categoria: this.state.categorias.find(categoria => categoria.descricao === this.state.curso.categoria)
    })
      .then(function (response) {
        that.update()
      })
      .catch(function (error) {
        //alert(`error updating curso id:${this.state.curso.id}`)
        console.log(error)
        that.update()
      })
  }

  render() {
    return (<>
      <div style={stylesheet.mainHome}>
        <Card style={stylesheet.cardHome} className="text-center">
          <Card.Header>
            <Card.Title><h1>Cursos</h1></Card.Title>
          </Card.Header>
          <Card.Body style={stylesheet.cardBodyHome}>
            <Card.Text>
              <div style={{ width: '100%', height: '100%' }}>
                <Row style={stylesheet.rowCursos}>
                  <Col>
                    <h3>Nome</h3>
                  </Col>
                  <Col>
                    <h3>Descrição</h3>
                  </Col>
                  <Col>
                    <h3>Data Inicial</h3>
                  </Col>
                  <Col>
                    <h3>Data Final</h3>
                  </Col>
                  <Col>
                    <h3>Qtd Alunos</h3>
                  </Col>
                  <Col>
                    <h3>Categoria</h3>
                  </Col>
                  <Col>
                  </Col>
                </Row>
                {this.state.cursos.sort((a, b) => a.codigo - b.codigo).map(curso => <>
                  <Row className="rowHoover" style={stylesheet.rowCursos}>
                    <Col>
                      <div style={stylesheet.rowTextCursos}>{curso.nome}</div>
                    </Col>
                    <Col>
                      <div style={stylesheet.rowTextCursos}>{curso.descricao}</div>
                    </Col>
                    <Col>
                      <div style={stylesheet.rowTextCursos}>{dateFormat((new Date(curso.initDate)), "dd/mm/yyyy H:mm")}</div>
                    </Col>
                    <Col>
                      <div style={stylesheet.rowTextCursos}>{dateFormat((new Date(curso.endDate)), "dd/mm/yyyy H:mm")}</div>
                    </Col>
                    <Col>
                      <div style={stylesheet.rowTextCursos}>{curso.qtdAluno}</div>
                    </Col>
                    <Col>
                      <div style={stylesheet.rowTextCursos}>{curso.categoria.descricao}</div>
                    </Col>
                    <Col>
                      <Button style={stylesheet.buttonCurso} onClick={() => { this.setState({ show: true, curso: {...curso, initDate: new Date(curso.initDate), endDate: new Date(curso.endDate), categoria: curso.categoria.descricao} }) }}>Edit</Button>
                      <Button style={stylesheet.buttonCurso} onClick={() => { this.delete(curso.id) }}>Delete</Button>
                    </Col>
                  </Row>
                </>)}
                <Row style={stylesheet.endButtonRow}>
                  <Col>
                    <Button onClick={() => { this.setState({ showNew: true, curso: { nome: "", initDate: new Date(), descricao: "", endDate: new Date(), qtdAluno: "", categoria: "" } }); this.getCategorias(); }}>Add</Button>
                  </Col>
                </Row>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Modal centered show={this.state.show} onHide={() => { this.setState({ show: false }) }}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ marginBottom: '10px' }}>Nome:</h4>
          <input type="text" id="nome" value={this.state.curso.nome} onChange={async (event) => { this.setState({ curso: { ...this.state.curso, nome: event.target.value } }); }} className="form-control login-input" placeholder="Nome" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Descrição:</h4>
          <input type="text" id="descricao" value={this.state.curso.descricao} onChange={async (event) => { this.setState({ curso: { ...this.state.curso, descricao: event.target.value } }); }} className="form-control login-input" placeholder="Descrição" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Data Inicial:</h4>
          <DateTimePicker onChange={async (event) => { this.setState({ curso: { ...this.state.curso, initDate: event } }); }} value={this.state.curso.initDate} />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Data Final:</h4>
          <DateTimePicker onChange={async (event) => { this.setState({ curso: { ...this.state.curso, endDate: event } }); }} value={this.state.curso.endDate} />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Qtd Alunos:</h4>
          <input type="text" id="qtdAluno" value={this.state.curso.qtdAluno} onChange={async (event) => { this.setState({ curso: { ...this.state.curso, qtdAluno: event.target.value } }); }} className="form-control login-input" placeholder="Descrição" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Categoria:</h4>
          <Form.Group>
            <Form.Control as="select" onChange={async (event)=>{this.setState({ curso: { ...this.state.curso, categoria: event.target.value }})}} defaultValue={this.state.curso.categoria}>
              {this.state.categorias.map(categoria=>
                <option>{categoria.descricao}</option>
              )}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { this.setState({ show: false }) }}>
            Voltar
          </Button>
          <Button variant="primary" onClick={() => { this.setState({ show: false }); this.submitCurso() }}>
            Alterar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={this.state.showNew} onHide={() => { this.setState({ showNew: false }) }}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ marginBottom: '10px' }}>Nome:</h4>
          <input type="text" id="nome" value={this.state.curso.nome} onChange={async (event) => { this.setState({ curso: { ...this.state.curso, nome: event.target.value } }); }} className="form-control login-input" placeholder="Nome" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Descrição:</h4>
          <input type="text" id="descricao" value={this.state.curso.descricao} onChange={async (event) => { this.setState({ curso: { ...this.state.curso, descricao: event.target.value } }); }} className="form-control login-input" placeholder="Descrição" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Data Inicial:</h4>
          <DateTimePicker onChange={async (event) => { this.setState({ curso: { ...this.state.curso, initDate: event } }); }} value={this.state.curso.initDate} />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Data Final:</h4>
          <DateTimePicker onChange={async (event) => { this.setState({ curso: { ...this.state.curso, endDate: event } }); }} value={this.state.curso.endDate} />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Qtd Alunos:</h4>
          <input type="text" id="qtdAluno" value={this.state.curso.qtdAluno} onChange={async (event) => { this.setState({ curso: { ...this.state.curso, qtdAluno: event.target.value } }); }} className="form-control login-input" placeholder="Descrição" />
          <hr />
          <h4 style={{ marginBottom: '10px', marginTop: '15px' }}>Categoria:</h4>
          <Form.Group>
            <Form.Control as="select" onChange={async (event) => { this.setState({ curso: { ...this.state.curso, categoria: event.target.value } }) }}>
              {this.state.categorias.map(categoria =>
                <option>{categoria.descricao}</option>
              )}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { this.setState({ showNew: false }) }}>
            Voltar
          </Button>
          <Button variant="primary" onClick={() => { this.setState({ showNew: false }); this.submitNewCurso() }}>
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
  rowCursos: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: "8px",
    paddingTop: "5px",
    borderBottom: "1px solid black",
  },
  rowTextCursos: {
  },
  endButtonRow: {
    marginTop: '35px'
  },
  addButton: {
  },
  buttonCurso: {
    marginLeft: '5px'
  }
}

export default Cursos;
import React from "react";
import { Card, Row } from "react-bootstrap";


class p404 extends React.Component {
  render() {
    return (
      <div style={stylesheet.main404}>
        <Card style={stylesheet.card404}>
          <Card.Body style={stylesheet.cardBody404}>
            <Row>
              <h1>404</h1>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const stylesheet = {
  main404: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  card404: {
    height: '30%',
    width: '30%',
    marginTop: '10%',
    borderRadius: '12px',
    boxShadow: '0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)'
  },
  cardBody404: {
    marginBottom: '10%',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default p404;
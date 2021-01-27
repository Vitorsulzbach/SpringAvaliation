import React from "react"
import { Link } from "react-router-dom"
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown, faSitemap, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

function Icon(props) {
    return (<>
        {props.selected ? <FontAwesomeIcon icon={faChevronDown} style={{ width: "20px" }} /> : <FontAwesomeIcon icon={faChevronRight} style={{ width: "20px" }} />}
    </>);
};

function Item(props) {
    return (<>
        <div onClick={props.onClick} id="link-sidebar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: "130px", maxWidth: "205px", width: "14vw" }}>
            <FontAwesomeIcon icon={props.icon} style={{ width: "20px", marginRight: "10px" }} />
            {props.title}
            {props.options ? <Icon selected={props.selected} /> : <div style={{ width: "20px" }}></div>}
        </div>
    </>);
};

function SubItem(props) {
    return (<>
        <Link to={props.href} id="Sublink-sidebar" style={{ display: "flex", alignItems: "center", minWidth: "130px", maxWidth: "205px", width: "14vw" }}>
            <div style={{ width: "3vw", minWidth: "28px", maxWidth: "46px" }}></div>
            <div>{props.title}</div>
        </Link>
    </>);
};

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.options = [
            {
                index: 0,
                title: "Categorias",
                icon: faSitemap,
                options: [{
                    title: "Categorias",
                    href: "/categorias"
                }]
            }, {
                index: 1,
                title: "Cursos",
                icon: faChalkboardTeacher,
                options: [{
                    title: "Cursos",
                    href: "/cursos"
                }]
            }
        ]
        this.state = {
            selected: -1
        }
    }

    render() {
        return (<>
            {this.options.map(item => {
                return (
                    <Row id="link-row">
                        <Col>
                            <Item title={item.title} icon={item.icon} options={item.options.length > 0} onClick={() => {
                                if (this.state.selected === item.index) {
                                    this.setState({ selected: -1 })
                                } else {
                                    this.setState({ selected: item.index })
                                }
                            }} selected={this.state.selected === item.index} />
                            {this.state.selected === item.index ? item.options.map(subitem => {
                                return (
                                    <SubItem title={subitem.title} href={subitem.href} />
                                )
                            }) : <></>}
                        </Col>
                    </Row>
                )
            })}
        </>)
    }
}

export default Sidebar

import React from "react";
import { Container, Row, Col } from "../Grid";
// article ListItem renders a bootstrap list item containing data from the recipe api call
export const ArticleListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="xs-6 sm-9">
          <h3>{props.title}</h3>
        </Col>
      </Row>
      <Row>
        <Col size="xs-2 sm-9">
          <h2>{props.date}</h2>
        </Col>
      </Row>
      <Row>
        <Col size="xs-4 sm-9">
        <p>URL: {props.url}</p>
        <a rel="noreferrer noopener" target="_blank" href={props.url}>Go to Article!</a>
        </Col>
      </Row>
    </Container>
  </li>
);

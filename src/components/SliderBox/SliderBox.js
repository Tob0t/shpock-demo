import React, { Component } from 'react';
import styles from './SliderBox.css';
import { Col, Panel, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Rheostat from 'rheostat';
import 'rheostat/css/slider.css';
import 'rheostat/css/slider-horizontal.css';

class SliderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValues: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValuesUpdated = this.handleValuesUpdated.bind(this);
  }

  handleChange(event) {
    this.props.onChangeValue(event);
  }

  handleValuesUpdated(event) {
    this.setState({
      currentValues: event.values
    });
    // For live update (f.e radius)
    this.props.onChangeValue(event);
  }

  render() {
    return (
      <div className="slider-box">
        <Panel header={this.props.header}>
          <Row className="show-grid">
            <Col xs={2}>
              <FontAwesome name={this.props.leftSymbol} />
            </Col>
            <Col xs={8}>
              <Rheostat
                values={this.props.value}
                onChange={this.handleChange}
                algorithm={this.props.algorithm}
                min={this.props.minValue}
                max={this.props.maxValue}
                onValuesUpdated={this.handleValuesUpdated}
              />
            </Col>
            <Col xs={2}>
              <FontAwesome name={this.props.rightSymbol} />
            </Col>
          </Row>
          <Row className="show-grid">
            <div className="slider-description">
              <b>
                {this.props.preSign}
                {this.state.currentValues[0] || 0}
                {this.state.currentValues.length > 1 &&
                  ' - ' + this.state.currentValues[1]}
                {' ' + this.props.unit}
              </b>
            </div>
            {this.props.extraLine}
          </Row>
        </Panel>
      </div>
    );
  }
}

export default SliderBox;

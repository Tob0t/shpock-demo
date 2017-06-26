import React, { Component } from 'react';
import styles from './SliderBox.css';
import {
  ControlLabel,
  Col,
  Button,
  FormControl,
  FormGroup,
  HelpBlock,
  Grid,
  Panel,
  Row,
  Well
} from 'react-bootstrap';
import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import ReactBootstrapSlider from 'react-bootstrap-slider';
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
                scale="logarithmic"
                min={this.props.minValue}
                max={this.props.maxValue}
                onValuesUpdated={this.handleValuesUpdated}
                //ticks = {[1, 2, 3, 4, 5, 6, 10, 15, 20, 30, 60, 100, 200, 300, 400, 500, 1000, 9999]}
                //ticks_labels = {["1", "2", "3", "4", "5", "7", "10", "15", "20", "30", "60", "100", "200", "300", "400", "500", "1000", "everywhere"]}
                //ticks_snap_bounds = { 30 }
              />
            </Col>
            <Col xs={2}>
              <FontAwesome name={this.props.rightSymbol} />
            </Col>
          </Row>
          <Row className="show-grid">
            <div className="slider-description">
              <b>
                {this.state.currentValues[0]}
                {this.state.currentValues.length > 1 &&
                  ' - ' + this.state.currentValues[1]}
                {' ' + this.props.unit}
              </b>
            </div>
          </Row>
        </Panel>
      </div>
    );
  }
}

export default SliderBox;

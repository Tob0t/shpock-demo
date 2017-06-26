import React, { Component } from 'react';
import styles from './SearchBar.css';
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
import CategoryButton from '../../components/Button/CategoryButton.js';
import SliderBox from '../../components/SliderBox/SliderBox.js';
import { pick } from 'lodash';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      listedSince: [1],
      sortBy: '',
      radius: [1],
      searchInternational: '',
      categories: {
        everything: true
      },
      priceRange: [0, 1000]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.changeListedSince = this.changeListedSince.bind(this);
    this.changePriceRange = this.changePriceRange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
      /*output: {
          ...this.state.output,
          searchTerm: event.target.value
      }*/
    });
  }

  handleAddCategory(category) {
    const { categories } = this.state;
    categories[category] = true;

    // update state
    this.setState({
      categories
    });
  }

  handleRemoveCategory(category) {
    const { categories } = this.state;
    categories[category] = false;

    // remove category from array
    /*if (index > -1) {
            categories.splice(index, 1);
      }*/

    // update state
    this.setState({
      categories
    });
  }

  changeRadius(event) {
    this.setState({
      radius: event.values
    });
  }

  changeListedSince(event) {
    this.setState({
      listedSince: event.values
    });
  }

  changePriceRange(event) {
    this.setState({
      priceRange: event.values
    });
  }

  handleCategory(categoryName) {
    const { categories } = this.state;

    // toggle category
    categories[categoryName] = !categories[categoryName];

    // update state
    this.setState({
      categories
    });
  }

  render() {
    const { categories } = this.state;
    var filterOverlay = (
      <Panel>
        <div className="heading-left">FILTERS</div>
        <div className="categories-box">
          <Row className="show-grid">
            <Col xs={4}>
              <CategoryButton
                categories={categories}
                name="Everything"
                value="everything"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="New in your area"
                value="new-in-your-area"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Fashion and Acessoiries"
                value="fashion-and-acessoires"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Home and Garden"
                value="home-and-garden"
                onClick={this.handleCategory}
              />
            </Col>
            <Col xs={4}>
              <CategoryButton
                categories={categories}
                name="Electronics"
                value="electronics"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Baby and Child"
                value="baby-and-child"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Sport, Leisure and Games"
                value="sport-leisure-and-games"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Movies, Books and Music"
                value="movies-books-and-music"
                onClick={this.handleCategory}
              />
            </Col>
            <Col xs={4}>
              <CategoryButton
                categories={categories}
                name="Cars and Motors"
                value="cars-and-motors"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Property"
                value="property"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Services"
                value="services"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Other"
                value="other"
                onClick={this.handleCategory}
              />
            </Col>
          </Row>
        </div>
        <div className="sliders">
          <Row className="show-grid">
            <Col xs={6}>
              <SliderBox
                header="Radius"
                unit="km"
                value={this.state.radius}
                onChangeValue={this.changeRadius}
                leftSymbol="home"
                rightSymbol="globe"
                minValue={1}
                maxValue={1000}
              />
              <SliderBox
                header="Listed in the last"
                unit="days"
                value={this.state.listedSince}
                onChangeValue={this.changeListedSince}
                leftSymbol="clock-o"
                rightSymbol="snowflake-o"
                minValue={1}
                maxValue={1000}
              />
            </Col>
            <Col xs={6}>
              <SliderBox
                header="Set your price range"
                unit="€"
                multipleValues={true}
                value={this.state.priceRange}
                onChangeValue={this.changePriceRange}
                leftSymbol="money"
                rightSymbol="money"
                minValue={1}
                maxValue={1000}
              />
            </Col>
          </Row>
        </div>
      </Panel>
    );

    return (
      <div>
        <Row className="show-grid">
          <Col xs={12} mdOffset={2} md={8} lgOffset={1} lg={10}>
            <form>
              <FormGroup controlId="formSearchBar">
                <ControlLabel>Search here</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.searchTerm}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                {this.state.searchTerm.length > 0 && filterOverlay}
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
              <Button bsStyle="success">Search</Button>
            </form>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} mdOffset={2} md={8} lgOffset={1} lg={10}>
            <Well>
              {/*<b>Output:</b> {JSON.stringify(pick(this.state, ['categories']))}*/}
              <b>Output:</b>{' '}
              <pre>
                {/*JSON.stringify({
                  categories: Object.keys(this.state.categories),
                  radius: Object.keys(this.state.radius)
                })*/}
                {JSON.stringify(this.state)}
              </pre>
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchBar;

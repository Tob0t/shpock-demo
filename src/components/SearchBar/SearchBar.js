import React, { Component } from 'react';
import styles from './SearchBar.css';
import {
  Checkbox,
  ControlLabel,
  Col,
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  InputGroup,
  Panel,
  Row,
  Well
} from 'react-bootstrap';
import CategoryButton from '../../components/Button/CategoryButton.js';
import SliderBox from '../../components/SliderBox/SliderBox.js';
import MapContainer from '../../components/GoogleMaps/MapContainer.js';
import RadioButton from '../../components/RadioButton/RadioButton.js';
import { pick } from 'lodash';

import log10 from 'rheostat/lib/algorithms/log10';
import linear from 'rheostat/lib/algorithms/linear';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = this.getinitialState();

    this.handleChange = this.handleChange.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeListedSince = this.changeListedSince.bind(this);
    this.changePriceRange = this.changePriceRange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handlePropertyCategory = this.handlePropertyCategory.bind(this);
    this.changeRooms = this.changeRooms.bind(this);
    this.changeArea = this.changeArea.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.toggleOnlyMyCountry = this.toggleOnlyMyCountry.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

  getinitialState() {
    const initialState = {
      searchTerm: '',
      listedSince: [1],
      sortBy: 'distance',
      location: {
        lat: 48.2089381,
        lng: 16.3615127
      },
      radius: [1],
      onlyMyCountry: false,
      searchInternational: '',
      categories: {
        everything: true
      },
      priceRange: [0, 1000],
      propertyCategories: {},
      propertyRooms: [0],
      propertyArea: [0]
    };
    return initialState;
  }

  clearFilters() {
    let searchTerm = this.state.searchTerm;
    this.setState(this.getinitialState());
    this.setState({ searchTerm });
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

  changeRadius(event) {
    this.setState({
      radius: event.values
    });
  }

  toggleOnlyMyCountry() {
    this.setState({
      onlyMyCountry: !this.state.onlyMyCountry
    });
  }

  changeLocation(location) {
    this.setState({
      location
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

  changeRooms(event) {
    this.setState({
      propertyRooms: event.values
    });
  }

  changeArea(event) {
    this.setState({
      propertyArea: event.values
    });
  }

  handleSorting(sortBy) {
    this.setState({
      sortBy
    });
  }

  handlePropertyCategory(categoryName) {
    var { propertyCategories } = this.state;

    // handle special cases for categories 'everything' and 'property' AND 'property-everything'
    propertyCategories = this.handleSingleCategoryToggle(
      propertyCategories,
      categoryName,
      'property-everything'
    );

    // toggle category
    propertyCategories[categoryName] = !propertyCategories[categoryName];

    // update state
    this.setState({
      propertyCategories
    });
  }

  handleCategory(categoryName) {
    var { categories } = this.state;

    // handle special cases for categories 'everything' and 'property' AND 'property-everything'
    categories = this.handleSingleCategoryToggle(
      categories,
      categoryName,
      'everything'
    );
    categories = this.handleSingleCategoryToggle(
      categories,
      categoryName,
      'property-everything'
    );
    categories = this.handleSingleCategoryToggle(
      categories,
      categoryName,
      'property'
    );

    // toggle category
    categories[categoryName] = !categories[categoryName];

    // update state
    this.setState({
      categories
    });
  }

  /**
   * Toggles all other categories except the selected one
   * @param {*} categoryName 
   * @param {*} singleCategoryName 
   */
  handleSingleCategoryToggle(categories, categoryName, singleCategoryName) {
    if (categoryName === singleCategoryName) {
      // remove all other categories if singleCategory is about to change to true
      if (!categories[categoryName]) {
        categories = {};
      }
    } else {
      // set singleCategory to false in any other case
      categories[singleCategoryName] = false;
    }
    return categories;
  }

  /**
 *  experimental property initializer syntax (ES6)
 */
  sendSearch() {
    console.log(JSON.stringify(this.state));
  }

  render() {
    const { categories } = this.state;
    const { propertyCategories } = this.state;
    var filterOverlay = (
      <Panel>
        <div className="heading-left">FILTERS</div>
        <div className="categories-box">
          <Row>
            <Col xs={12} sm={4}>
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
                name="Fashion and Accessories"
                value="fashion-and-accessories"
                onClick={this.handleCategory}
              />
              <CategoryButton
                categories={categories}
                name="Home and Garden"
                value="home-and-garden"
                onClick={this.handleCategory}
              />
            </Col>
            <Col xs={12} sm={4}>
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
            <Col xs={12} sm={4}>
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
        {this.state.categories['property'] &&
          <div className="property-box">
            <div className="heading-left">PROPERTY</div>
            <Row>
              <Col xs={12} sm={6}>
                <CategoryButton
                  categories={propertyCategories}
                  name="Everything"
                  value="property-everything"
                  onClick={this.handlePropertyCategory}
                />
                <CategoryButton
                  categories={propertyCategories}
                  name="For Sale"
                  value="property-for-sale"
                  onClick={this.handlePropertyCategory}
                />
              </Col>
              <Col xs={12} sm={6}>
                <CategoryButton
                  categories={propertyCategories}
                  name="For Rent"
                  value="property-for-rent"
                  onClick={this.handlePropertyCategory}
                />
                <CategoryButton
                  categories={propertyCategories}
                  name="Shared"
                  value="property-shared"
                  onClick={this.handlePropertyCategory}
                />
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} sm={6}>
                <SliderBox
                  header="Rooms"
                  preSign="min "
                  unit=""
                  algorithm={linear}
                  value={this.state.propertyRooms}
                  onChangeValue={this.changeRooms}
                  leftSymbol="square-o"
                  rightSymbol="plus-square-o"
                  minValue={0}
                  maxValue={10}
                />
              </Col>
              <Col xs={12} sm={6}>
                <SliderBox
                  header="Area"
                  preSign="min "
                  unit="m²"
                  algorithm={linear}
                  value={this.state.propertyArea}
                  onChangeValue={this.changeArea}
                  leftSymbol="home"
                  rightSymbol="bank"
                  minValue={1}
                  maxValue={250}
                />
              </Col>
            </Row>
          </div>}
        <div className="sliders">
          <Row className="show-grid">
            <Col xs={12} sm={6}>
              <SliderBox
                header="Listed in the last"
                unit="days"
                algorithm={log10}
                value={this.state.listedSince}
                onChangeValue={this.changeListedSince}
                leftSymbol="clock-o"
                rightSymbol="snowflake-o"
                minValue={1}
                maxValue={1000}
              />
            </Col>
            <Col xs={12} sm={6}>
              <SliderBox
                header="Set your price range"
                unit="€"
                algorithm={linear}
                multipleValues={true}
                value={this.state.priceRange}
                onChangeValue={this.changePriceRange}
                leftSymbol="euro"
                rightSymbol="money"
                minValue={1}
                maxValue={1000}
              />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} smOffset={3} sm={6}>
              <SliderBox
                header="Radius"
                unit="km"
                algorithm={log10}
                value={this.state.radius}
                onChangeValue={this.changeRadius}
                leftSymbol="home"
                rightSymbol="globe"
                minValue={1}
                maxValue={1000}
                extraLine={
                  <div>
                    <Checkbox
                      checked={this.state.onlyMyCountry}
                      onClick={this.toggleOnlyMyCountry}
                    >
                      <b>Search only in my country</b>
                    </Checkbox>
                  </div>
                }
              />
            </Col>
            <Col xs={12} sm={3} />
          </Row>
        </div>
        <div className="gmaps">
          <Row className="show-grid">
            <Col xs={12} smOffset={3} sm={6}>
              <div className="heading-left">Location</div>
              <MapContainer
                center={this.state.location}
                radius={this.state.radius}
                onChangeLocation={this.changeLocation}
              />
            </Col>
          </Row>
        </div>
        <div className="sorting-box">
          <div className="heading-left">Sort by</div>
          <Row>
            <Col xs={12} sm={6}>
              <RadioButton
                name="Distance"
                value="distance"
                sortBy={this.state.sortBy}
                onClick={this.handleSorting}
              />
              <RadioButton
                name="Price ▲"
                value="priceAsc"
                sortBy={this.state.sortBy}
                onClick={this.handleSorting}
              />
            </Col>
            <Col xs={12} sm={6}>
              <RadioButton
                name="Date"
                value="date"
                sortBy={this.state.sortBy}
                onClick={this.handleSorting}
              />
              <RadioButton
                name="Price ▼"
                value="priceDesc"
                sortBy={this.state.sortBy}
                onClick={this.handleSorting}
              />
            </Col>
          </Row>
        </div>
        <div className="filter">
          <Button
            bsStyle="warning"
            className="extra-space"
            onClick={this.clearFilters}
          >
            Clear Filters
          </Button>
          <Button
            bsStyle="success"
            className="extra-space"
            onClick={this.sendSearch}
          >
            Search
          </Button>
        </div>
      </Panel>
    );

    return (
      <div className="searchBar">
        <Row className="show-grid">
          <Col xs={12} mdOffset={2} md={8} lgOffset={1} lg={10}>
            <Form>
              <FormGroup controlId="formSearchBar">
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.searchTerm}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                  />
                  <InputGroup.Button controlId="search">
                    <Button bsStyle="success" onClick={this.sendSearch}>
                      Search
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </Form>
            {this.state.searchTerm.length > 0 && filterOverlay}
          </Col>
        </Row>
        {this.state.searchTerm.length > 0 &&
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
          </Row>}
      </div>
    );
  }
}

export default SearchBar;

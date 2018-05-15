import React from 'react';
import base from '../../firebase';

import InputText from '../../components/user/Form/InputText';
import InputDropDown from '../../components/user/Form/InputDropDown';
import InputTextarea from '../../components/user/Form/InputTextarea';
import SubmitButton from '../../components/user/Form/SubmitButton';

class AddProduct extends React.Component {
  state = {
    categoryList: [],
    locationList: [],
    category: '',
    subcategory: '',
    location: '',
    title: '',
    type: 'used',
    price: '',
    description: '',
    mobile: ''
  };

  componentDidMount() {
    this.fetchLocation();
    this.fetchCategory();
  }

  // Fetch location list from firebase
  fetchLocation = () => {
    base
      .fetch('/locations', {
        context: this,
        asArray: true
      })
      .then(data => this.setState({ locationList: data, location: data[0] }))
      .catch(error => console.log(error));
  };

  // Fetch Category list from firebase
  fetchCategory = () => {
    base
      .fetch('/category', {
        context: this
      })
      .then(data => {
        const list = Object.keys(data);
        this.setState({
          categoryList: data,
          category: list[0],
          subcategory: data[list[0]][0]
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleCategoryChange = event => {
    const value = event.target.value;
    this.setState({
      category: value.split(' ').join('_'),
      subcategory: this.state.categoryList[value][0]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    base
      .push('/products', {
        data: {
          subcategory: this.state.subcategory,
          location: this.state.location,
          title: this.state.title.toLowerCase(),
          type: this.state.type,
          price: this.state.price,
          description: this.state.description,
          mobile: this.state.mobile,
          date: Date.now(),
          uid: this.props.user.uid,
          email: this.props.user.email
        }
      })
      .then(() => console.log('success'))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <InputDropDown
          title="Category"
          options={Object.keys(this.state.categoryList).map(item =>
            item.split('_').join(' ')
          )}
          value={this.state.category}
          handleChange={event => this.handleCategoryChange(event)}
        />
        <InputDropDown
          title="Subcategory"
          options={this.state.categoryList[this.state.category] || []}
          value={this.state.subcategory}
          handleChange={event => this.handleChange(event, 'subcategory')}
        />
        <InputDropDown
          title="Location"
          options={this.state.locationList}
          value={this.state.location}
          handleChange={event => this.handleChange(event, 'location')}
        />
        <InputText
          title="Title"
          placeholder="Product Title"
          value={this.state.title}
          handleChange={event => this.handleChange(event, 'title')}
        />
        <InputDropDown
          title="Type"
          options={['used', 'new']}
          value={this.state.type}
          handleChange={event => this.handleChange(event, 'type')}
        />
        <InputText
          title="Price"
          placeholder="Product Price"
          value={this.state.price}
          handleChange={event => this.handleChange(event, 'price')}
        />

        <InputTextarea
          title="Description"
          placeholder="Product Details "
          value={this.state.description}
          handleChange={event => this.handleChange(event, 'description')}
        />
        <InputText
          title="Mobile"
          placeholder="Your Mobile"
          value={this.state.mobile}
          handleChange={event => this.handleChange(event, 'mobile')}
        />

        <SubmitButton onClick={this.handleSubmit}>SUBMIT</SubmitButton>
      </React.Fragment>
    );
  }
}

export default AddProduct;

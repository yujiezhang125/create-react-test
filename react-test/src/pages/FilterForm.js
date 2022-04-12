import React from 'react';
 
class FilterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 'basketball'};
        // this.handleChange = this.handleChange.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    changeColor(event) {
        // this.setState({value: event.target.value});
        console.log(event.target.value);
    }

  render() {
    return (
    //   <div>Log in page.</div>

      <div>
            <h3>Filters: </h3>
            <form>
              <label for="colors">Colors: </label>
              <select name="colors" onChange={this.changeColor}>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="N/A" selected="selected">N/A</option>
                <option value="blue">Blue</option>
              </select>
              <input type="submit" value="Apply" />
            </form>

            <form>
              <label for="colors">Colors: </label>
              <select name="colors">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="N/A" selected="selected">N/A</option>
                <option value="blue">Blue</option>
              </select>
              
            </form>
        </div>
    );
  }
}
 
export default FilterForm;
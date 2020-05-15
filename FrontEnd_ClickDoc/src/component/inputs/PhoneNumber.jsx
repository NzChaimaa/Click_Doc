import React,{ Component} from 'react';
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


export default class PhoneField extends Component {
    static defaultProps = {
      name: 'numero_telephone',
      placeholder: '0x xx xx xx xx',
      required: false,
    }
  
    static propTypes = {
      name: PropTypes.string.isRequired,
      icone: PropTypes.element.isRequired,

      placeholder: PropTypes.string,
      required: PropTypes.bool,
    }
  
    constructor(props) {
      super(props)
      this.state = { value: '' }
    }
  
    // This method is declared using an arrow function initializer solely
    // to guarantee its binding, as we cannot use decorators just yet.
    handleChange = ({ target: { value } }) => {
      value = value
        // Remove all non-digits, turn initial 33 into nothing
        .replace(/[^\d\+]/g, '')
        .replace(/^0/, '+212')
        // Stick to first 10, ignore later digits
        .slice(0, 13)
        // Add a space after any 2-digit group followed by more digits
        .replace(/(\d{3})(?=\d)/g, '$1 ')
      this.setState({ value })
      this.props.changingValue(value, this.props.name);
    }
  
    render() {
      const { name, placeholder, required, helperText, labelInput } = this.props
      return (
        
            <TextField
                autoComplete="fname"

                id="standard-basic input-with-icon-textfield"
                width= "200"
                name={name}
                placeholder={placeholder}
                onChange={this.handleChange}
                helperText={helperText}
                fullWidth
                type="tel"
                required={required}
                label={labelInput} 
                value={this.state.value}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <this.props.icone color="#3695EB" />
                    </InputAdornment>
                ),
                }}
            />
      )
    }
  }
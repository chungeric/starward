import React, { Component } from 'react';
import { textValdation } from '../Helpers/validation';

export default class Text extends Component {
  componentWillMount() {
    this.updateField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submitSuccess !== nextProps.submitSuccess) {
      this.updateField({target: null}, nextProps.field);
    }
  }
  updateField(event, field) {
    const { id, required } = field;
    const value = event.target ? event.target.value : null;
    const valid = textValdation(required, value);
    this.props.updateForm(value, id, valid);
  }
  render() {
    const {
      field,
      value,
      submitFailed,
      isValid
    } = this.props;
    const {
      id,
      type,
      label,
      classes,
      placeholder,
      required,
      maxLength
    } = field;
    return (
      <div className={!isValid && submitFailed ? `field error ${classes}` : `field ${classes}`}>
        <div className="textarea">
          <label htmlFor={id}>
            {label}{required ? <abbr>*</abbr> : null}
            <textarea
              name={id}
              type={type}
              placeholder={placeholder}
              value={value || ''}
              maxLength={maxLength}
              required={required}
              onChange={event => this.updateField(event, field)}
            />
          </label>
        </div>
      </div>
    );
  }
}

import React, {Component} from 'react';
import {Form, Radio} from 'semantic-ui-react';
import {FastField, Field, getIn} from 'formik';
import ErrorMessage from './ErrorMessage';
import {InputRef} from './InputRef';
import {getFieldError, setFieldValue} from './helpers';

class FormikCheckbox extends Component {
  constructor(props) {
    super(props);
    const {id, name, value} = props;
    this.id = id ? `${id}_${value}` : `field_radio_${name}_${value}`;
  }

  render() {
    const {
      name,
      label,
      value,
      validate,
      inputProps = {},
      fieldProps = {},
      errorComponent = ErrorMessage,
      inputRef,
      fast
    } = this.props;
    const {onChange, ...safeInputProps} = inputProps;
    const DesiredField = fast === true ? FastField : Field;
    return (
      <DesiredField
        name={name}
        validate={validate}
        render={({field, form}) => {
          const error = getFieldError(field, form);
          return (
            <Form.Field error={!!error} {...fieldProps}>
              <InputRef inputRef={inputRef}>
                <Radio
                  {...safeInputProps}
                  id={this.id}
                  label={label}
                  name={name}
                  value={value}
                  checked={field.value === value}
                  onChange={(e, {name, value}) => {
                    setFieldValue(form, name, value, true);
                    Promise.resolve().then(() => {
                      onChange && onChange(e, {name, value});
                    });
                  }}
                />
              </InputRef>
              {error && (
                React.createElement(errorComponent, { message: getIn(form.errors, name) })
              )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default FormikCheckbox;

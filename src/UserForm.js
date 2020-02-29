import React, { useReducer, useEffect } from 'react';
import { Grid, Form, Button, Loader, Message } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import _ from 'lodash'

const { Field, Input } = Form;


const UserAccountForm = (props) => {

  const { register, handleSubmit, errors, triggerValidation } = useForm();

  console.log('render UserAccountForm')

  const isLoading = false;

  const onSubmit = (data, e) => {
    console.log('submit event', e);
    console.log(data);
  }

  const validationList = [
    {
      name: 'name',
      typeList: [
        {
          type: 'required',
          message: 'This is required',
        },
        {
          type: 'maxLength',
          message: 'Max length not exceed 255 character'
        },
        {
          type: 'minLength',
          message: 'name length should at least have 4 character'
        },
        {
          type: 'nonDigital',
          message: 'Name should not contain digital number',
        }
      ]
    }
  ]

  

  return (
    <div>
        <Grid container={true}>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <h2>Account details</h2>
            <div>
              <Loader active={isLoading} />
              <form onSubmit={handleSubmit(onSubmit)} className="ui error form">
                <Field>
                  <label htmlFor="name">Name</label>
                  <div className="ui fluid input">
                    <input 
                      placeholder="Name" 
                      name="name" 
                      type="text" 
                      ref={register({required: true, minLength: 4, maxLength: 255, validate: {
                        nonDigital: value => !/\d+/.test(value)
                      } })}
                      onChange={() => triggerValidation('name')}
                    />
                  </div>
                  {showValidationErrors(errors, validationList, 'name')}
                </Field>
                
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Grid.Column>
        </Grid>
    </div>
  )
};

const showValidationErrors = (errors, validationList, name) => {
  const validation = validationList.filter(validate => validate.name === name).pop() || {typeList: []};
  
  return validation.typeList.reduce((compList, {type, message}) => {
    if (_.get(errors, [name]) && _.get(errors, [name, 'type']) === type) {
      compList.push(<FieldErrMessage key={`${name}-${type}`}>{message}</FieldErrMessage>);
    }
    return compList;
  }, []);
}

const FieldErrMessage = React.memo((props) => {
  const {message, ...rest} = props;
  return <Message error size="tiny" {...rest}>{props.children}</Message>
});

export default UserAccountForm;
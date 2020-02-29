import React, { useReducer, useEffect } from 'react';
import { Grid, Form, Button, Loader } from 'semantic-ui-react';
import { UseForm, useForm } from 'react-hook-form';
import {parse, stringify} from 'flatted/esm';

const { Field, Input } = Form;


const UserAccountForm = (props) => {

  const { register, handleSubmit, errors } = useForm();

  console.log('render UserAccountForm')

  const isLoading = false;

  const onSubmit = (data, e) => {
    console.log('submit event', e);
    console.log(data);
  }

  /*
  useEffect(() => {
    register({name: 'name'}, {max: 2, min: 1 });
  });
  */

//  console.log(`errors: ${stringify(errors.name)}`)


  return (
    <div>
        <Grid container={true}>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <h2>Account details</h2>
            <div>
              <Loader active={isLoading} />
    
              <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
              
                
                <Field>
                  <label htmlFor="name">Name</label>
                  <div className="ui fluid input">
                    <input placeholder="Name" name="name" type="text" ref={register({required: true, maxLength: 2 })}/>
                  </div>
                  {errors.name && errors.name.type === 'required' && (
                    <p>This is required</p>
                  )}
                  {errors.name && errors.name.type === 'maxLength' && (
                    <p>Max length not exceed 10 character</p>
                  )}
                </Field>
                
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Grid.Column>
        </Grid>
    </div>
  )
};

export default UserAccountForm;
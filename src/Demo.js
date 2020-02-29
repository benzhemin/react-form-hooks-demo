import React from 'react'
import { useForm } from 'react-hook-form'

export default function Demo() {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = data => console.log(data)
   
console.log(`errors ${JSON.stringify(errors)}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" ref={register({ required: true, maxLength: 2 })} />
      
      <input type="submit" />
    </form>
  );
}
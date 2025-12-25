
import React from 'react';
import User from './container/user/User';
import ProductForm from './container/productform/ProductForm';
import UserForm from './container/user/UserForm';
import UserFormValidation from './container/userformvalidtion/UserFormValidation';
import UserFormValidation2 from './container/userformvalidtion/UserFormValidation2';

function App(props) {
  return (
    <div>
      {/* <User/> */}
      {/* <UserForm/> */}
      {/* <UserFormValidation/> */}
      <UserFormValidation2 />
      {/* <ProductForm/> */}
    </div>
  );
}

export default App;


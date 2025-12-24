import React from 'react';
import User from './container/user/User';
import ProductForm from './container/productform/ProductForm';
import UserForm from './container/user/UserForm';
import UserFormValidation from './container/userformvalidtion/UserFormValidation';

function App(props) {
  return (
    <div>
      {/* <User/> */}
      {/* <UserForm/> */}
    <UserFormValidation/>
      {/* <ProductForm/> */}
    </div>
  );
}

export default App;
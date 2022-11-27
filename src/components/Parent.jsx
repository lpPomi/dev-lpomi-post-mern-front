
import { useState } from 'react';

import Child from './Child';
//function Parent() {
const Parent = () => {

  const [message, setMessage] = useState("Hello");

  const chooseMessage = (message) => {
    setMessage(message);
  };


  return (
    <div>
      <h1>{message}</h1>
      <Child chooseMessage={chooseMessage} />
    </div>
  );
};

export default Parent;
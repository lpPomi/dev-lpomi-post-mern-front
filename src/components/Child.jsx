
//function Child() {
const Child = ({ chooseMessage }) => {
  let msg = 'Goodbye';


  return (
    <div>
      <button onClick={() => chooseMessage(msg)}>Change Message</button>
    </div>
  );
};

export default Child;
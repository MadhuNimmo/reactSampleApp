import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState(["jack", "jill"]);
  const [name, setName] = useState("");
  let list2 = ["adam", "eve"]

  const handleClick = () => {
    setCount(count + 1);
    console.log('Clicked');
  }

  const updateName = (e) => {
    setName(e.target.value);
  }

  const updateList = () => {
    list.push(name)
    list2.push(name)
    setList(list)
  }

  return (
    <div>
      <button onClick={handleClick}>{count}</button>
      <ul>
        {list.map((listItem, index) => (
          <li key={index}>{listItem}</li>
        ))}
      </ul>
      <input type="text" value={name} onChange={ (e) =>updateName(e)} />
      <button onClick={updateList}>Update List</button>
      <ul>
        {list2.map((listItem, index) => (
          <li key={index}>{listItem}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

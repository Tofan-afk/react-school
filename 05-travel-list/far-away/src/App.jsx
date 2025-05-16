import { useState } from "react";

function App() {
  const [initialItems, setInitialItems] = useState([]);

  return (
    <div className="app">
      <Header />
      <Form setInitialItems={setInitialItems} />
      <PackingList
        initialItems={initialItems}
        setInitialItems={setInitialItems}
      />
      <Stats />
    </div>
  );
}

function Header() {
  return <h1>🌴Far Away💼</h1>;
}

function Form({ setInitialItems }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const description = form.elements[1].value;
    const quantity = form.elements[0].value;

    if (!description || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: parseInt(quantity),
      packed: false,
    };

    setInitialItems((prevItems) => [...prevItems, newItem]);
    form.reset();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button type="submit">Add</button>
    </form>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You have X items on your list, and you already packed Y of them.
    </footer>
  );
}

function PackingList({ initialItems, setInitialItems }) {
  function handleDelete(id) {
    setInitialItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function togglePacked(id) {
    setInitialItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item
            key={item.id}
            data={item}
            handleDelete={handleDelete}
            togglePacked={togglePacked}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ data, handleDelete, togglePacked }) {
  const { id, description, quantity, packed } = data;

  return (
    <li>
      <span
        style={{
          textDecoration: packed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => togglePacked(id)}
      >
        {description} {quantity} {""}
      </span>
      <button onClick={() => handleDelete(id)}>❌</button>
    </li>
  );
}

export default App;

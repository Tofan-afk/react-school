import { useState } from "react";

function App() {
  const [totalItems, setItems] = useState([]);

  return (
    <div className="app">
      <Header />
      <Form setItems={setItems} />
      <PackingList totalItems={totalItems} setItems={setItems} />
      <Stats totalItems={totalItems} />
    </div>
  );
}

function Header() {
  return <h1>🌴Far Away💼</h1>;
}

function Form({ setItems }) {
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

    setItems((prevItems) => [...prevItems, newItem]);
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

function Stats({ totalItems }) {
  return (
    <footer className="stats">
      You have {totalItems.length} items on your list, and you already packed{" "}
      {totalItems.filter((item) => item.packed).length} of them.
    </footer>
  );
}

function PackingList({ totalItems, setItems }) {
  function handleDelete(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function togglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  const [sortBy, setSortBy] = useState("packed");

  let sortedItems = [...totalItems];
  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    // Sort by putting alphabetically packed items first and the rest also alphabetically
    sortedItems.sort((a, b) => {
      if (a.packed === b.packed) {
        return a.description.localeCompare(b.description);
      }
      return a.packed ? -1 : 1;
    });
    sortedItems.sort;
  } else {
    sortedItems.sort((a, b) => a.id - b.id);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            data={item}
            handleDelete={handleDelete}
            togglePacked={togglePacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => setItems([])}>Clear List</button>
      </div>
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

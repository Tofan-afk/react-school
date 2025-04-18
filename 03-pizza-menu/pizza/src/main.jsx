import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length > 0 ? (
        <>
          <p>Pizza made with love</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => {
              return <Pizza key={pizza.name} data={pizza} />;
            })}
          </ul>
        </>
      ) : (
        <p>No menu, rough...</p>
      )}
    </main>
  );
}

function Pizza(props) {
  const pizzaList = props.data;
  return (
    <div className={`pizza ${pizzaList.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaList.photoName} alt={pizzaList.name} />
      <div>
        <h3>{pizzaList.name}</h3>
        <p>{pizzaList.ingredients}</p>
        <span>{pizzaList.soldOut ? "SOLD OUT" : pizzaList.price + "$"}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();

  return (
    <footer className="footer">
      <p>{hour >= 8 && hour < 22 ? "We're open!" : "We're closed!"}</p>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

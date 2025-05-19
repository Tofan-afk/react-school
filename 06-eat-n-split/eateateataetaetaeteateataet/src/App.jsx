import { useState } from "react";
import "./index.css";

const friends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList() {
  return (
    <ul>
      {friends.map((f) => (
        <Friend friend={f} key={f.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt="" />
      <h4>{friend.name}</h4>
      <p
        style={{
          color:
            friend.balance === 0
              ? `gray`
              : friend.balance < 0
              ? "red"
              : "green",
        }}
      >
        {friend.balance === 0
          ? `You are even`
          : friend.balance < 0
          ? `You owe ${friend.balance}$`
          : `${friend.name} owes you ${friend.balance}$`}
      </p>
      <button className="button">Select</button>
    </li>
  );
}

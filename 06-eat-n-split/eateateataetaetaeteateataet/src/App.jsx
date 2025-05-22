import { useState } from "react";
import "./index.css";

export default function App() {
  const [isVisibleAddFriend, setIsVisibleAddFriend] = useState(false);
  const [isVisibleBillSplit, setIsVisibleBillSplit] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("null");
  const [friends, updateFriends] = useState([
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
  ]);

  function handleVisibilityAddFriend() {
    setIsVisibleAddFriend((self) => (self = !self));
  }

  function handleVisibilityBillSplit({ friend }) {
    if (isVisibleBillSplit === false) {
      setIsVisibleBillSplit((self) => (self = !self));
      setSelectedFriend(friend);
    } else {
      setSelectedFriend(friend);
    }
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          visibilityBillSplitfunc={handleVisibilityBillSplit}
        />
        <FormAddFriend
          visibility={isVisibleAddFriend}
          updateFriends={updateFriends}
        />
        <Button func={handleVisibilityAddFriend}>
          {isVisibleAddFriend ? "close" : "Add friend"}
        </Button>
      </div>

      <FormSplitBill
        friends={friends}
        updateFriends={updateFriends}
        visibility={isVisibleBillSplit}
        selectedFriend={selectedFriend}
      />
    </div>
  );
}

function FriendsList({ friends, visibilityBillSplitfunc }) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          visibilityBillSplitfunc={visibilityBillSplitfunc}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, visibilityBillSplitfunc }) {
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
      <Button func={() => visibilityBillSplitfunc((friend = { friend }))}>
        Select
      </Button>
    </li>
  );
}

function Button({ children, func = () => {}, type = "button" }) {
  return (
    <button className="button" type={type} onClick={() => func()}>
      {children}
    </button>
  );
}

function FormAddFriend({ visibility, updateFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, image });
    if (name && image) {
      const newFriend = {
        id: Math.floor(Math.random() * 1000000),
        name: name,
        image: image,
        balance: 0,
      };
      updateFriends((prev) => [...prev, newFriend]);
      setName("");
      setImage("");
    } else {
      alert("Please fill in all fields");
    }
  }

  return (
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}
      style={{ display: visibility ? "" : "none" }}
    >
      <label>🧑‍🤝‍🧑 Friend Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🖼️ Image URL</label>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}

function FormSplitBill({ friends, updateFriends, visibility, selectedFriend }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  // Calculate friend's expense
  const friendExpense =
    bill && yourExpense ? Math.max(Number(bill) - Number(yourExpense), 0) : "";

  function handleSubmit(e) {
    e.preventDefault();

    // Logic to update the friends list with the new balance
    const updatedFriends = friends.map((f) => {
      if (f.id === selectedFriend.id) {
        return {
          ...f,
          balance:
            Number(f.balance) +
            (whoIsPaying === "user"
              ? Number(-friendExpense)
              : Number(yourExpense)),
        };
      }
      return f;
    });
    updateFriends(updatedFriends);
    console.log("Bill split successfully!");

    // Optionally reset form
    setBill("");
    setYourExpense("");
    setWhoIsPaying("user");
  }

  if (!selectedFriend || !selectedFriend.name) return null;

  return (
    <form
      className="form-split-bill"
      onSubmit={handleSubmit}
      style={{ display: visibility ? "" : "none" }}
    >
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Value</label>
      <input
        type="number"
        name="value"
        placeholder="Bill"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        min="0"
      />
      <label>💰 Your expense</label>
      <input
        type="number"
        name="yourExpense"
        placeholder="Your expense"
        value={yourExpense}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val <= Number(bill)) setYourExpense(e.target.value);
        }}
        min="0"
        max={bill}
      />
      <label>💰 {selectedFriend.name}'s expense</label>
      <input
        type="number"
        name="friendsExpense"
        placeholder="Friend's expense"
        value={friendExpense}
        disabled
      />
      <label>❓ Who is paying</label>
      <select
        name="whoIsPaying"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button type="submit">Split</Button>
    </form>
  );
}

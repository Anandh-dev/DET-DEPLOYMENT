import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  const addExpense = () => {
    if (desc && amount && category) {
      const newExpense = {
        description: desc,
        amount: parseFloat(amount),
        category,
      };
      setExpenses([...expenses, newExpense]);
      setDesc("");
      setAmount("");
      setCategory("");
    } else {
      alert("Please enter description, amount, and category!");
    }
  };

  const getTotal = () =>
    expenses.reduce((total, exp) => total + exp.amount, 0);

  const getMax = () =>
    expenses.reduce(
      (max, exp) => (exp.amount > max.amount ? exp : max),
      expenses[0]
    );

  const filterByCategory = (cat) =>
    expenses.filter(
      (exp) => exp.category.toLowerCase() === cat.toLowerCase()
    );

  const displayedExpenses = filter
    ? filterByCategory(filter)
    : expenses;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h2>Daily Expense Tracker</h2>

      <label>Description:</label>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="e.g. Groceries"
      />

      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g. 500"
      />

      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <button onClick={() => setFilter(category)}>Filter</button>
      <button onClick={addExpense}>Add Expense</button>

      <div id="expense-list">
        <h3>
          {filter ? `${filter} Expenses:` : "Your Expenses:"}
        </h3>
        {displayedExpenses.map((exp, index) => (
          <p key={index}>
            {exp.description} ({exp.category}): ₹{exp.amount}
          </p>
        ))}
      </div>

      <h3>Total Expenses: ₹{getTotal()}</h3>

      {expenses.length > 0 && (
        <h3>
          Highest Expense:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {getMax().description} - ₹{getMax().amount}
          </span>
        </h3>
      )}
    </div>
  );
}

export default App;

import { useMemo, useRef, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  const filteredItems = useMemo(() => {
    if (query === "") return items;
    return items.filter(item => item.toLowerCase() === query.toLowerCase());
  }, [items, query]);

  function onSubmit(e) {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value === "") return;

    if (items.some(item => item.toLowerCase() === value.toLowerCase())) {
      alert("⚠️ Item already exists");
      return;
    }

    setItems(prev => [...prev, value]);
    inputRef.current.value = "";
    setQuery("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <label htmlFor="search" style={{ color: "#333", fontSize: "18px" }}>
      🔍 Search:
        <input
          id="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="search"
          style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </label>
      <br /><br />
      <form onSubmit={onSubmit}>
        <label htmlFor="new-item" style={{ color: "#333", fontSize: "18px" }}>
          🆕 New Item:
          <input
            id="new-item"
            ref={inputRef}
            type="text"
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "4px", border: "none", backgroundColor: "#28a745", color: "#fff", cursor: "pointer" }}>
          ➕ Add
        </button>
      </form>
      <h3 style={{ color: "#007bff" }}>📋 Items:</h3>
      <div style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "4px", border: "1px solid #dee2e6" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <div key={index} style={{ padding: "5px 0", borderBottom: "1px solid #dee2e6" }}>{item}</div>)
        ) : (
          <p style={{ color: "#dc3545" }}>❌ No items found.</p>
        )}
      </div>
    </div>
  );
}

export default App;

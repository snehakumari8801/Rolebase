// import { useEffect, useState } from "react";
// import API from "../api";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const res = await API.get("/data");
//     setData(res.data);
//   };

//   const addData = async () => {
//     await API.post("/data", { title: "New", content: "Test" });
//     fetchData();
//   };

//   const updateData = async (id) => {
//     await API.put(`/data/${id}`, { title: "Updated" });
//     fetchData();
//   };

//   return (
//     <div>
//       <h2>{role} Dashboard</h2>

//       {(role === "admin" || role === "subadmin") && (
//         <button onClick={addData}>Add Data</button>
//       )}

//       <ul>
//         {data.map(d => (
//           <li key={d._id}>
//             {d.title}
//             {role === "subadmin" && (
//               <button onClick={() => updateData(d._id)}>Edit</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }













import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/data");
    setData(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ADD DATA
  const addData = async () => {
    if (!form.title || !form.content) {
      return alert("Fill all fields");
    }

    await API.post("/data", form);
    setForm({ title: "", content: "" });
    fetchData();
  };

  // SET EDIT MODE
  const startEdit = (item) => {
    setForm({
      title: item.title,
      content: item.content
    });
    setEditId(item._id);
  };

  // UPDATE DATA
  const updateData = async () => {
    await API.put(`/data/${editId}`, form);
    setEditId(null);
    setForm({ title: "", content: "" });
    fetchData();
  };

  return (
    <div>
      <h2>{role} Dashboard</h2>

      {/* INPUT FORM */}
      {(role === "admin" || role === "subadmin") && (
        <div style={{ marginBottom: "20px" }}>
          <input
            name="title"
            placeholder="Enter title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="content"
            placeholder="Enter content"
            value={form.content}
            onChange={handleChange}
          />

          {editId ? (
            <button onClick={updateData}>Update</button>
          ) : (
            <button onClick={addData}>Add</button>
          )}
        </div>
      )}

      {/* DATA LIST */}
      <ul>
        {data.map(d => (
          <li key={d._id}>
            <strong>{d.title}</strong> - {d.content}

            {role === "subadmin" && (
              <button onClick={() => startEdit(d)}>
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
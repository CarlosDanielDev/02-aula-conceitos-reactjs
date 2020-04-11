// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";
import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([]);

  async function handleAddProject() {
    const response = await api.post("/projects", {
      title: `Back-end development with Nodejs - ${Date.now().toFixed(2)}`,
      owner: "Carlos Daniel",
    });
    const project = response.data;
    setProjects([...projects, project]);
  }
  useEffect(() => {
    api.get("/projects").then((result) => setProjects(result.data));
  }, []);
  return (
    <>
      <Header title="Home">
        <ul>
          {projects.map((project) => (
            <li key={project.title}>{project.title}</li>
          ))}
        </ul>
        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}

export default App;

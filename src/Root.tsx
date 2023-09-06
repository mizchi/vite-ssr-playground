import {useState} from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Root() {
  return <>
    <h1>Router App</h1>
    <nav>
      <Link to="/">Home</Link>
      |
      <Link to="/about">About</Link>
    </nav>
    <hr />
    <Routes>
      <Route index element={<>Home</>} />
      <Route path="about" element={<>About</>} />
    </Routes>
  </>
}
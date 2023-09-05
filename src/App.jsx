import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Articles from "./components/Articles/Articles";
import SingleArticle from "./components/Articles/SingleArticle";



function App() {
  return (
    <div>
    <Header />
    <Nav />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/articles' element={<Articles/>}></Route>
      <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
    </Routes>
  </div>
);
}

export default App;

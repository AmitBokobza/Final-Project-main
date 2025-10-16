import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import UserLayout from "./components/layout/UserLayout";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import { createContext, useState } from "react";
import CreateCard from "./components/CreateRecipe";
import MyCards from "./components/MyRecipes";
import CardLanding from "./components/ReusableComp/RecipeComponents/RecipeLanding";
import Footer from "./components/layout/Footer";
import About from "./components/About";
import ProfilePage from "./components/ProfilePage";
import EditUser from "./components/EditUser";
import PageNotFound from "./components/ReusableComp/Misc/PageNotFound";
import AdminLayout from "./components/layout/AdminLayout";
import UserManager from "./components/UserManager";
import FavRecipes from "./components/LikedRecipes";
import EditRecipe from "./components/EditRecipe";

export interface Quarry {
  search: string;
  setSearch: (value: string) => void;
}
export const searchContext = createContext<Quarry>({
  search: "",
  setSearch: () => {},
});

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <searchContext.Provider value={{ search, setSearch }}>
        <ToastContainer />
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="create-recipe" element={<CreateCard />} />
              <Route path="my-recipes" element={<MyCards />} />
              <Route path="liked-recipes" element={<FavRecipes/>} />
              <Route path="recipes/:id" element={<CardLanding />} />
              <Route path="about" element={<About />} />
              <Route path="edit-recipe/:id" element={<EditRecipe/>} />
              <Route path="profile-page/:id" element={<ProfilePage />} />
              <Route path="edit-user/:id" element={<EditUser />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<UserManager />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </searchContext.Provider>
    </>
  );
}

export default App;

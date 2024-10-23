import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import SubAdmin from "./pages/SubAdmin";
import Users from "./pages/Users";
import ManageProgram from "./pages/ManageProgram";
import FitzoneManagement from "./pages/FitzoneManagement";
import CmsManagement from "./pages/CmsManagement";
import Faq from "./pages/Faq";
import AccountSettings from "./pages/AccountSettings";
import PushNotification from "./pages/PushNotification";
import NutritionFood from "./pages/NutritionFood";
import DietPlan from "./pages/DietPlan";
import ManageBlogsCategory from "./pages/ManageBlogsCategory";
import ManageBlogs from "./pages/ManageBlogs";
import AddCategory from "./components/AddCategory";
import AddBlogs from "./components/AddBlogs";
import AddNutrition from "./components/AddNutrition";
import AddDiet from "./components/AddDiet";
import AddFitzone from "./components/AddFitzone";
import AddSubAdmin from "./components/AddSubAdmin";
import AddProgram from "./components/AddProgram";
import ManageProgramSection from "./components/ManageProgramSection";
import EditIntro from "./components/EditIntro";
import ApproveNonApprove from "./components/ApproveNonApprove";
import Diet from "./components/Diet";
import AddFood from "./components/AddFood";
import DietMeal from "./components/DietMeal";
import AddUser from "./components/AddUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sub-admin" element={<SubAdmin />} />
          <Route path="/sub-admin/add-subadmin" element={<AddSubAdmin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add-user" element={<AddUser />} />
          <Route path="/manage-program" element={<ManageProgram />} />
          <Route path="/manage-program/add-program" element={<AddProgram />} />
          <Route
            path="/manage-program/manage"
            element={<ManageProgramSection />}
          />
          <Route
            path="/manage-program/manage/edit-intro"
            element={<EditIntro />}
          />
          <Route
            path="/manage-program/manage/food"
            element={<ApproveNonApprove />}
          />
          <Route
            path="/manage-program/manage/food/add-food"
            element={<AddFood />}
          />
          <Route path="/manage-program/manage/diet-plan" element={<Diet />} />
          <Route
            path="/manage-program/manage/diet-plan/add-diet"
            element={<DietMeal />}
          />
          <Route path="/fitzone-manage" element={<FitzoneManagement />} />
          <Route path="/fitzone-manage/add-fitzone" element={<AddFitzone />} />
          <Route path="/cms-manage" element={<CmsManagement />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/notification" element={<PushNotification />} />
          <Route
            path="/data-manage/nutrition-food"
            element={<NutritionFood />}
          />
          <Route
            path="/data-manage/nutrition-food/add-nutrition"
            element={<AddNutrition />}
          />
          <Route path="/data-manage/diet-plan" element={<DietPlan />} />
          <Route path="/data-manage/diet-plan/add-diet" element={<AddDiet />} />
          <Route
            path="/blogs/manage-category"
            element={<ManageBlogsCategory />}
          />
          <Route path="/blogs/manage-blogs" element={<ManageBlogs />} />
          <Route path="/blogs/manage-blogs/add-blogs" element={<AddBlogs />} />
          <Route
            path="/blog/manage-category/add-category"
            element={<AddCategory />}
          />
          <Route />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React,{ useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from './components/StaticPages/HomePage';
import Alumni from './components/StaticPages/Alumni';
import Footer from './components/StaticPages/Footer';
import SuccessPage from './components/StaticPages/SuccessPage';
import PageNotFound from './components/StaticPages/PageNotFound';
import SubmitProject from './components/SubmitProject';
import SubmitIdea from './components/SubmitIdea';
import Login from './components/Login';
import Specialization from './components/Specialization';
import ContactUs from './components/StaticPages/ContactUs';
import { useSelector } from 'react-redux';
import { selectUser } from "./features/userSlice";
import Dashboard from './components/Admin/Dashboard';
import Submissions from './components/Admin/Submissions';
import AdminProjectIdeas from './components/Admin/AdminProjectIdeas';
import AdminModSpecialization from './components/Admin/AdminModSpecialization';
import TopProjects from './components/StaticPages/TopProjects';
import ProfileDash from './components/StdProfiles/ProfileDash';
import Graduation from './components/Graduation';
import PostGraduation from './components/Admin/PostGraduation';
import AddPitch from './components/Admin/AddPitch';
import ManagePitches from './components/Admin/ManagePitches';
import ViewAlumniProfile from './components/AlumniData/ViewAlumniProfile';
import UsersProfiles from './components/Admin/UsersProfiles';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import('preline')

function App() {
  const user = useSelector(selectUser)

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/submitProject" element={<SubmitProject />} />
        <Route path="/idea-submission" element={<SubmitIdea />} />
        <Route path="/specialization" element={<Specialization />} />
        <Route path="/Add-Pitch" element={<AddPitch />} />
        <Route path="/ManagePitches" element={<ManagePitches />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="/update-profile" element={<ProfileDash/>}/>
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/student/:slug" element={<ViewAlumniProfile />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {user && <Route path="/admin" element={<Dashboard/>}/>}
        <Route path="/project-submissions" element={<Submissions/>}/>
        <Route path="/ideas-submissions" element={<AdminProjectIdeas/>}/>
        <Route path="/module-specialization" element={<AdminModSpecialization/>}/>
        <Route path="/post-graduation" element={<PostGraduation/>}/>
        <Route path="/usersProfiles" element={<UsersProfiles/>}/>
        <Route path="/top-projects" element={<TopProjects/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </main>
  )
}

export default App

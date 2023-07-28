import React, {useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContactList from './components/contacts/ContactList/ContactList';
import AddContact from './components/contacts/AddContact/AddContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import EditContact from './components/contacts/EditContact/EditContact';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';

let App = () => {
  //For Persistent DarkMode(For Refreshing)
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.classList.toggle("dark-mode-active", theme === "dark");
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'} />} />
        <Route path="/about" element={<About />} />
        <Route path={'/contacts/list'} element={<ContactList />} />
        <Route path={'/contacts/add'} element={<AddContact />} />
        <Route path={'/contacts/view/:contactId'} element={<ViewContact />} />
        <Route path={'/contacts/edit/:contactId'} element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

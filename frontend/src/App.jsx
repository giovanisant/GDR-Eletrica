import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserOptions from './components/UserOptions';
import UserRegistration from './components/UserRegistration';
import RegisteredUsers from './components/RegisteredUsers';
import LoginUser from './components/LoginUser';
import RedefineUser from './components/RedefineUser';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/redefine" element={<RedefineUser />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/user-options" element={<UserOptions />} />
                <Route path="/users" element={<UserRegistration />} />
                <Route path="/registered-users" element={<RegisteredUsers />} />
            </Routes>
        </Router>
    );
};

export default App;

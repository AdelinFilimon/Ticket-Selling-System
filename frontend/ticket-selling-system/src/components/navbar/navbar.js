import React, {useState} from 'react';
import {IconContext} from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import {Link} from 'react-router-dom';
import './navbar.css';
import { authService } from '../../service/authService';

function getHomeLink() {

    if ( (authService.getRole() === "administrator" && window.location.href.includes("administrator") ) ||
        (authService.getRole() === "cashier" && window.location.href.includes("cashier") ))
    return (
        <Link to="#" onClick={() => false}>
            <AiIcons.AiFillHome />
            <span>Home</span>
        </Link>
    )

    return (
        <Link to="/">
            <AiIcons.AiFillHome />
            <span>Home</span>
        </Link>
    )
}
 
export default function Navbar() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const logout = () => {
        showSidebar();
        authService.logout();
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#ED254E'}}>
                <div className="navbar">
                    <div onClick={showSidebar} className="menu-bars">
                        <FaIcons.FaBars/>
                        <span className="title">Untold Ticket System</span>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle" onClick={showSidebar}>
                            <div className="menu-bars">
                                <AiIcons.AiOutlineClose/>
                            </div>
                        </li>

                        <li className="nav-text" onClick={showSidebar}>
                            {getHomeLink()}
                        </li>

                        <li className={authService.isLoggedIn() ? "hide" : "nav-text"} onClick={showSidebar}>
                            <Link to="/login">
                                <RiIcons.RiLoginBoxFill/>
                                <span>Login</span>
                            </Link>
                        </li>

                        <li className={authService.isLoggedIn() ? "nav-text" : "hide"} onClick={logout}>
                            <Link to="/">
                                <RiIcons.RiLogoutBoxFill/>
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )

}
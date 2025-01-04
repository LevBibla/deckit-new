import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li style={{ marginTop: '100px' }}>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                            end
                        >
                            Your Custom Deck
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/materials"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Materials Guide
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/designs"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Design Ideas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/tips"
                            className={({ isActive }) => isActive ? 'active-link' : ''}
                        >
                            Building Tips
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;
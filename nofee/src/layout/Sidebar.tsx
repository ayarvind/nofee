import React from 'react';
import Project from '@/interface/Project';
import { Link } from 'react-router-dom';

function Sidebar({ project }: { project?: Project }) {

    const projectMenu = [
        'Providers',
        'Access Token',
        'Logs',
        // Add other project-specific menu items here
    ];

    const simpleMenu = [
       
        {
            name: 'Profile',
            link: '/profile',
        },
        
        {
            name : 'Docs',
            link:'/docs'
        },
        {
            name:'Blogs',
            link:'/blogs'
        }
        // Add other simple menu items here
    ];

    return (
        <div className="w-64 h-[80%] overflow-y-auto ml-3 rounded-lg bg-slate-950 text-gray-200 p-6 shadow-lg border-r border-gray-700">
            <div className="mb-6 flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-200">
                <h3 className="text-2xl font-bold ml-4 text-center">{project?.name[0] || 'P'}</h3>
                <span className="text-xl font-bold"></span>
                </div>
                <h3 className="text-2xl font-bold ml-4">{project?.name || 'Dashboard'}</h3>
            </div>

            {/* Project Specific Menu */}
            {project && (
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-300">Project Menu</h4>
                    <ul className="space-y-2">
                        {projectMenu.map((menuItem, index) => (
                            <li key={index} className="transition-colors duration-300 hover:bg-gray-700 rounded-lg">
                                <Link
                                    to={`/project/${project.id}/${menuItem.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="block px-4 py-2 text-gray-200 hover:text-white"
                                >
                                    {menuItem}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Simple Menu */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-300">General Menu</h4>
                <ul className="space-y-2">
                    {simpleMenu.map((menuItem, index) => (
                        <li key={index} className="transition-colors duration-300 hover:bg-gray-700 rounded-lg">
                            <Link
                                to={menuItem.link}
                                className="block px-4 py-2 text-gray-200 hover:text-white"
                            >
                                {menuItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;

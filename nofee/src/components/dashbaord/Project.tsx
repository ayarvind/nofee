import Project from '@/interface/Project';
import Sidebar from '@/layout/Sidebar';
import React, { useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RequestHandler from '../RequestHandler';
import { SET_OPEN_PROJECT } from '@/redux/actions/openProject';
import { getAllProjects } from '@/request/project';
import { SET_PROJECT } from '@/redux/actions/projects';
import Loader from '@/layout/Loader';

function ProjectDetails() {
    const { projectId, requestName } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const projects = useSelector((state: any) => state.projects);
    
    useEffect(() => {
        const fetchProjects = async () => {
            
            if (!projects || projects.length === 0) {
                try {
                    const prjs = await getAllProjects();
                    dispatch({
                        type: SET_PROJECT,
                        payload: prjs,
                    });
                } catch (error) {
                    console.error('Failed to fetch projects:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [dispatch, projects?.length]);

    const project = projects?.find((item: Project) => item.id === projectId);
    useEffect(() => {
        if (project) {
            dispatch({
                type: SET_OPEN_PROJECT,
                payload: project,
            });
        }
    }, [dispatch, project]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-2xl">
                    <Loader />
                </div>
            </div>
        );
    }

    return (
        <div className='flex gap-3 w-full h-full'>
            {project ? (
                <>
                    <Sidebar project={project} />
                    <RequestHandler requestName={requestName as string} />
                </>
            ) : (
                <div className="w-3 m-auto mt-5 bg-black">
                    <div className="text-white text-2xl">
                        <MdErrorOutline />
                        <span className="ml-3">Project not found</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectDetails;

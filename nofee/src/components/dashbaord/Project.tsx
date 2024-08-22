import Project from '@/interface/Project';
import Sidebar from '@/layout/Sidebar';
import React from 'react'
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import RequestHandler from '../RequestHandler';
import { SET_OPEN_PROJECT } from '@/redux/actions/openProject';
function ProjectDetails() {
    const { projectId, requestName } = useParams();
    const projects = useSelector((state: any) => state.projects);
    if (!projects) {
        return (
            <>
                <div className='bg-slate-800  w-1/5 h-auto rounded m-auto  mt-28  p-5 flex flex-col justify-center items-center text-white'>
                    <MdErrorOutline />
                    <h1>Something went wrong!</h1>
                </div>
            </>
        )
    }
    const dispatch = useDispatch();
    const project = projects.filter((item: Project) => {
        return item.id == projectId
    })[0]
    dispatch({
        type: SET_OPEN_PROJECT,
        payload: project,
    })


    return (
        <div className='flex gap-3'>
            <Sidebar
                project={project}
            />
            <RequestHandler requestName={requestName as string} />

        </div>
    )
}

export default ProjectDetails
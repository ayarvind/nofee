import React, { useEffect, useState } from 'react';
import { getAllProjects } from '@/request/project';
import Loader from '@/layout/Loader';
import { FaProjectDiagram } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PROJECT } from '@/redux/actions/projects';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Main() {
  const projects = useSelector((state: any) => state.projects);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    const fetch_ = async () => {
      if (projects && projects.length > 0) {
        // If projects are already in the state, no need to fetch
        return;
      }

      setLoading(true);
      try {
        const fetchedProjects = await getAllProjects();
        dispatch({
          type: SET_PROJECT,
          payload: fetchedProjects
        });
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [projects, dispatch]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-2xl">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl p-4">
          {projects && projects.length > 0 ? (
            <>
              <h2 className='text-white text-xl mb-4 flex gap-4 items-center'>
              All Projects
              <BsArrowRight size={20}/>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project: any) => (
                  <div
                    onClick={()=>{
                      const projectUrl = `/project/${project.id}`
                      navigate(projectUrl)
                    }}
                    key={project.id}
                    className="bg-gray-800 text-white p-4 rounded-lg cursor-pointer shadow-md flex items-center"
                  >
                    <FaProjectDiagram className="text-3xl mr-4" />
                    <div>
                      <h2 className="text-xl font-semibold">{project.name}</h2>
                      <p className="text-gray-400">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-white">
              <p>No projects available. Please create a new project.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;

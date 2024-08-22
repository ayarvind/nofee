import React, { useState } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createProject } from '@/request/project';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .required('Project name is required'),
    description: Yup.string()
      .max(420, 'Description cannot exceed 420 characters')
      .required('Description is required'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validateSchema.validate({ name, description }, { abortEarly: false });
      setLoading(true);

      const response = await createProject({ name, description });

      if (response) {
        toast.success('Project created successfully!');
        setName('');
        setDescription('');
        // push to home page
        window.location.href = '/'

      } else {
        toast.error('Failed to create project. Please try again.');
      }

    } catch (errors: any) {
      if (errors.inner) {
        errors.inner.forEach((error: any) => {
          toast.error(error.message);
        });
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 w-full max-w-lg mx-auto">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-8">Create New Project</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">Project Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your project name"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">Description</label>
            <textarea
              value={description}
              placeholder="Describe your project..."
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase font-semibold transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;

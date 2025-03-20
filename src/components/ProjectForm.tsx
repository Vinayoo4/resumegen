import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Project } from '../types';

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const project: Project = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      technologies,
      imageUrl: formData.get('imageUrl') as string,
      liveUrl: formData.get('liveUrl') as string,
      githubUrl: formData.get('githubUrl') as string,
    };

    onSubmit(project);
    e.currentTarget.reset();
    setTechnologies([]);
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Project Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
          Technologies
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tech}
              <button
                type="button"
                onClick={() => setTechnologies(technologies.filter((_, i) => i !== index))}
                className="ml-1 inline-flex items-center"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Project Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
          Live URL (optional)
        </label>
        <input
          type="url"
          name="liveUrl"
          id="liveUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
          GitHub URL (optional)
        </label>
        <input
          type="url"
          name="githubUrl"
          id="githubUrl"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Project
      </button>
    </form>
  );
}
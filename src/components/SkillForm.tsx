import React from 'react';
import type { Skill } from '../types';

interface SkillFormProps {
  onSubmit: (skill: Skill) => void;
}

export function SkillForm({ onSubmit }: SkillFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const skill: Skill = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      category: formData.get('category') as Skill['category'],
      level: Number(formData.get('level')),
    };

    onSubmit(skill);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Skill Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          id="category"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <optgroup label="Technical">
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend Development</option>
            <option value="tools">Development Tools</option>
          </optgroup>
          <optgroup label="Business">
            <option value="finance">Finance & Accounting</option>
            <option value="hr">Human Resources</option>
            <option value="leadership">Leadership & Management</option>
            <option value="entrepreneurship">Entrepreneurship</option>
          </optgroup>
          <option value="other">Other Skills</option>
        </select>
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
          Proficiency Level (1-5)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            name="level"
            id="level"
            min="1"
            max="5"
            step="1"
            defaultValue="3"
            required
            className="mt-1 block w-full"
          />
          <div className="text-sm text-gray-500 w-24">
            <span className="font-medium">Legend:</span>
            <ul className="mt-1 space-y-1">
              <li>1: Beginner</li>
              <li>2: Intermediate</li>
              <li>3: Proficient</li>
              <li>4: Advanced</li>
              <li>5: Expert</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Skill
      </button>
    </form>
  );
}
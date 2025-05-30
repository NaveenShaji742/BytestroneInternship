// File: HealthStatusForm.js (React Frontend Component)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const healthOptions = ["Green", "Amber", "Red"];
const severityOptions = ["High", "Medium", "Low"];
const statusOptions = ["Open", "Mitigated", "Closed"];
const priorityOptions = ["High", "Medium", "Low"];
const delayCategories = ["Technical", "Resource", "Client"];

export default function HealthStatusForm() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    overallHealth: '',
    scheduleHealth: '',
    scopeHealth: '',
    budgetHealth: '',
    highlights: ['', '', ''],
    delays: [
      { description: '', category: '' },
      { description: '', category: '' },
      { description: '', category: '' },
    ],
    concerns: ['', '', ''],
    risks: [],
    dependencies: [],
    trainingNeeds: []
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Project Fetch Error", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/healthstatus", formData);
      alert("Health status updated successfully!");
    } catch (err) {
      console.error("Submission Error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6">
      <select name="projectId" value={formData.projectId} onChange={(e) => setFormData({...formData, projectId: e.target.value})}>
        <option value="">Select Project</option>
        {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.projectName}</option>)}
      </select>

      {/* Overall Health Status */}
      {['overallHealth', 'scheduleHealth', 'scopeHealth', 'budgetHealth'].map(field => (
        <div key={field}>
          <label className="block font-semibold capitalize">{field.replace("Health", " Health")}</label>
          <select
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            {healthOptions.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      ))}

      {/* Highlights */}
      <div>
        <label className="block font-semibold">Key Highlights</label>
        {formData.highlights.map((highlight, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={300}
            placeholder={`Highlight ${idx + 1}`}
            value={highlight}
            onChange={(e) => {
              const newHighlights = [...formData.highlights];
              newHighlights[idx] = e.target.value;
              setFormData({ ...formData, highlights: newHighlights });
            }}
            className="w-full border px-2 py-1 mb-2"
          />
        ))}
      </div>

      {/* Delays */}
      <div>
        <label className="block font-semibold">Key Delays</label>
        {formData.delays.map((delay, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Delay ${idx + 1}`}
              value={delay.description}
              onChange={(e) => {
                const newDelays = [...formData.delays];
                newDelays[idx].description = e.target.value;
                setFormData({ ...formData, delays: newDelays });
              }}
              className="flex-1 border px-2"
            />
            <select
              value={delay.category}
              onChange={(e) => {
                const newDelays = [...formData.delays];
                newDelays[idx].category = e.target.value;
                setFormData({ ...formData, delays: newDelays });
              }}
            >
              <option value="">Category</option>
              {delayCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Concerns */}
      <div>
        <label className="block font-semibold">Key Concerns / Challenges</label>
        {formData.concerns.map((concern, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Concern ${idx + 1}`}
            value={concern}
            onChange={(e) => {
              const newConcerns = [...formData.concerns];
              newConcerns[idx] = e.target.value;
              setFormData({ ...formData, concerns: newConcerns });
            }}
            className="w-full border px-2 py-1 mb-2"
          />
        ))}
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Save Health Status
      </button>
    </form>
  );
}

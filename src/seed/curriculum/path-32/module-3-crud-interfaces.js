module.exports = {
  title: "Module 3: CRUD & Data Interfaces",
  description: "Displaying, filtering, and uploading data.",
  order: 3,
  lessons: [
    {
      title: "Protected Routes and Role-Based Interfaces",
      slug: "protected-routes",
      order: 1,
      estimatedMinutes: 35,
      content: `# Protected Routes and Role-Based Interfaces

**Learning objectives:**
- Block unauthenticated users
- Show admin-only UI

## The Protected Route Component
\`\`\`jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function ProtectedRoute({ children, requireAdmin }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Checking auth...</p>;
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/" />;

  return children;
}
\`\`\`

## Usage
\`\`\`jsx
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />

<Route path="/admin" element={
  <ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>
} />
\`\`\``
    },
    {
      title: "CRUD Interfaces for Backend APIs",
      slug: "crud-interfaces",
      order: 2,
      estimatedMinutes: 40,
      content: `# CRUD Interfaces for Backend APIs

**Learning objectives:**
- Build Create, Read, Update, Delete UIs
- Refresh state after mutations

## The Flow
1. User clicks "Add Course" → shows a form.
2. User submits → \`POST /api/courses\`.
3. Backend responds with the new course.
4. Frontend updates the local state (or refetches).

\`\`\`javascript
const handleAddCourse = async (courseData) => {
  const res = await fetch('/api/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData),
  });
  const data = await res.json();
  
  if (res.ok) {
    setCourses([...courses, data.course]); // Update UI without refetching
  }
};
\`\`\`

## Delete
\`\`\`javascript
const handleDelete = async (id) => {
  if (!confirm("Are you sure?")) return;
  await fetch(\`/api/courses/\${id}\`, { method: 'DELETE' });
  setCourses(courses.filter(c => c._id !== id));
};
\`\`\``
    },
    {
      title: "Search, Filtering, and Pagination Interfaces",
      slug: "search-filter-pagination",
      order: 3,
      estimatedMinutes: 35,
      content: `# Search, Filtering, and Pagination Interfaces

**Learning objectives:**
- Pass query parameters from React
- Sync URL with search state

## Sending Query Parameters
\`\`\`javascript
const [search, setSearch] = useState("");
const [level, setLevel] = useState("all");

useEffect(() => {
  const query = new URLSearchParams({ q: search, level }).toString();
  fetch(\`/api/courses?\${query}\`)
    .then(res => res.json())
    .then(data => setCourses(data.courses));
}, [search, level]); // Refetch when search or level changes
\`\`\`

## Debouncing the Search
Don't fire a request on every keystroke. Use a debounce.
\`\`\`javascript
useEffect(() => {
  const timer = setTimeout(() => {
    // execute search
  }, 500);
  return () => clearTimeout(timer); // Cleanup on next keystroke
}, [search]);
\`\`\``
    },
    {
      title: "File Upload Interfaces",
      slug: "file-upload-interfaces",
      order: 4,
      estimatedMinutes: 35,
      content: `# File Upload Interfaces

**Learning objectives:**
- Use \`FormData\` for file uploads
- Show upload progress

## The Form Data Object
You cannot upload files with JSON. You must use \`FormData\`.

\`\`\`javascript
const handleUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('avatar', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData, // Do NOT set Content-Type header. The browser sets it automatically with the boundary.
  });
};
\`\`\`

## Progress Bar (Axios)
Axios allows you to track upload progress easily.
\`\`\`javascript
axios.post('/api/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    setUploadProgress(percent);
  }
});
\`\`\``
    }
  ]
};
module.exports = {
  title: "Module 2: Pagination & Documentation",
  description: "Handling large datasets and documenting your API.",
  order: 2,
  lessons: [
    {
      title: "Pagination, Filtering, and Sorting",
      slug: "pagination-filtering",
      order: 1,
      estimatedMinutes: 35,
      content: `# Pagination, Filtering, and Sorting

**Learning objectives:**
- Paginate large datasets with offset and cursor
- Filter results using query parameters
- Sort results dynamically

## The Problem
Never return 10,000 records in one response. It will crash the client, slow the server, and waste bandwidth.

## Offset Pagination (Standard)
Use \`?page=2&limit=20\`.

\`\`\`javascript
app.get('/api/courses', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const courses = await Course.find()
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments();

  res.json({
    data: courses,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
});
\`\`\`

## Cursor Pagination (For Infinite Scroll)
Offset pagination gets slow at page 10,000 because the database has to scan all previous records. Cursor pagination uses a marker.

\`\`\`javascript
// Request: ?limit=20&lastId=64b8f...
app.get('/api/courses', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const query = req.query.lastId 
    ? { _id: { $gt: req.query.lastId } } 
    : {};

  const courses = await Course.find(query).limit(limit);
  res.json({ data: courses, nextCursor: courses[courses.length - 1]?._id });
});
\`\`\`

## Filtering
Accept filter parameters in the query string.

\`\`\`javascript
// Request: ?level=beginner&published=true
app.get('/api/courses', async (req, res) => {
  const filter = {};
  if (req.query.level) filter.level = req.query.level;
  if (req.query.published) filter.isPublished = req.query.published === 'true';

  const courses = await Course.find(filter);
  res.json(courses);
});
\`\`\`

## Sorting
Accept \`?sort=price\` or \`?sort=-price\` (minus sign for descending).

\`\`\`javascript
// Request: ?sort=-estimatedHours
const sortBy = req.query.sort || 'createdAt';
const sortOrder = sortBy.startsWith('-') ? -1 : 1;
const sortField = sortBy.replace('-', '');

const courses = await Course.find().sort({ [sortField]: sortOrder });
\`\`\`

## Key Takeaways
- Always paginate your lists.
- Offset is easy; cursor scales better.
- Let clients filter and sort via query parameters.`
    }
  ]
};
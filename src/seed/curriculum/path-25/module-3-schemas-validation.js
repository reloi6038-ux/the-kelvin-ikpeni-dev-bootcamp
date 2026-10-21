module.exports = {
  title: "Module 3: Schemas & Validation",
  description: "Designing your data and enforcing rules.",
  order: 3,
  lessons: [
    {
      title: "Using Mongoose with Node.js",
      slug: "using-mongoose",
      order: 1,
      estimatedMinutes: 30,
      content: `# Using Mongoose with Node.js

**Learning objectives:**
- Understand Schemas and Models
- Create a basic schema
- Export a model

## Schema vs Model
- **Schema**: Defines the shape of the data (fields, types, validation).
- **Model**: A class created from the schema that allows you to interact with the collection.

## Creating a Schema
\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number
});
\`\`\`

## Creating a Model
\`\`\`javascript
const User = mongoose.model('User', userSchema);
\`\`\`

The model name \`'User'\` creates a collection called \`users\` (lowercase, pluralized).

## Schema Options
- \`timestamps: true\`: Automatically adds \`createdAt\` and \`updatedAt\`.
- \`versionKey: false\`: Removes the \`__v\` field.

\`\`\`javascript
const userSchema = new mongoose.Schema({
  name: String
}, { timestamps: true });
\`\`\`

## Key Takeaways
- Schemas define the rules.
- Models are used to query the database.
- Use \`timestamps: true\` for audit trails.`
    },
    {
      title: "Designing MongoDB Schemas and Models",
      slug: "designing-schemas",
      order: 2,
      estimatedMinutes: 35,
      content: `# Designing MongoDB Schemas and Models

**Learning objectives:**
- Choose between embedding and referencing
- Use subdocuments effectively
- Follow naming conventions

## Embedding vs Referencing

### Embedding (Subdocuments)
Store related data inside the parent document.
\`\`\`javascript
const postSchema = new Schema({
  title: String,
  comments: [{ text: String, author: String }]
});
\`\`\`
**Use when**: Data belongs together, is read together, and won't grow indefinitely.

### Referencing
Store related data in a separate collection and store the \_id.
\`\`\`javascript
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});
\`\`\`
**Use when**: Data is large, updated frequently, or shared across multiple documents.

## Naming Conventions
- Model names: **PascalCase** (\`User\`, \`BlogPost\`).
- Field names: **camelCase** (\`firstName\`, \`createdAt\`).
- References: \`<fieldName>Id\` (\`authorId\`).

## Key Takeaways
- Embed for 1-to-few relationships.
- Reference for 1-to-many or many-to-many relationships.
- Keep schemas readable and predictable.`
    },
    {
      title: "Data Validation with Mongoose",
      slug: "data-validation",
      order: 3,
      estimatedMinutes: 30,
      content: `# Data Validation with Mongoose

**Learning objectives:**
- Enforce required fields
- Use built-in validators
- Create custom validators

## Built-in Validators
\`\`\`javascript
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});
\`\`\`

## Custom Validators
You can write your own validation function.

\`\`\`javascript
const userSchema = new Schema({
  age: {
    type: Number,
    validate: {
      validator: function(v) {
        return v >= 18;
      },
      message: props => \`\${props.value} is not old enough!\`
    }
  }
});
\`\`\`

## Handling Validation Errors
When you call \`.save()\` or \`.create()\`, Mongoose checks the schema. If it fails, it throws a \`ValidationError\`.

\`\`\`javascript
try {
  await user.save();
} catch (err) {
  console.error(err.errors.email.message); // "Please provide a valid email"
}
\`\`\`

## Key Takeaways
- Validation stops bad data at the database layer.
- Use built-in validators for common rules.
- Always catch validation errors and return 400 Bad Request.`
    }
  ]
};
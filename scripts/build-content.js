const fs = require('fs');
const path = require('path');

// Paths
const contentDir = path.join(__dirname, '..', 'src', 'content');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'content.json');

// Create output directory if it doesn't exist
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all markdown files and compile them into a single JSON
function buildContent() {
  try {
    const content = {
      about: fs.readFileSync(path.join(contentDir, 'about.md'), 'utf8'),
      skills: fs.readFileSync(path.join(contentDir, 'skills.md'), 'utf8'),
      experience: fs.readFileSync(path.join(contentDir, 'experience.md'), 'utf8'),
      projects: fs.readFileSync(path.join(contentDir, 'projects.md'), 'utf8'),
      contact: fs.readFileSync(path.join(contentDir, 'contact.md'), 'utf8')
    };

    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
    console.log('✅ Content successfully compiled to JSON');
  } catch (error) {
    console.error('❌ Error building content:', error);
    process.exit(1);
  }
}

// Run the build
buildContent();

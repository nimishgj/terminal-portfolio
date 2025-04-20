# Terminal Portfolio Website

A unique, interactive terminal-themed personal portfolio website built with Next.js, React, and TypeScript. This project creates an authentic command-line experience where visitors can navigate through different sections of the portfolio using familiar terminal commands.

![Terminal Portfolio Screenshot](https://via.placeholder.com/800x450/000000/33ff33?text=Terminal+Portfolio)

## 🌟 Features

- **Authentic Terminal Experience**: Command-based navigation with realistic terminal styling
- **Interactive Command Line**: Process commands like `about`, `skills`, `experience`, `projects`, etc.
- **Responsive Design**: Works on all screen sizes
- **Customizable Content**: All content managed through easy-to-edit markdown files
- **History Navigation**: Use up/down arrow keys to access command history
- **Personalized Welcome**: Login screen captures visitor name for personalized interaction
- **GitHub Pages Deployment**: Set up for easy deployment to GitHub Pages

## 🛠️ Technical Stack

- Next.js
- React
- TypeScript
- TailwindCSS
- Markdown content management
- GitHub Actions for deployment

## 📋 Available Commands

- `about` - Display personal information
- `skills` - Show technical skills
- `experience` - List work history
- `projects` - Showcase project details
- `contact` - Display contact information
- `help` - Show command list
- `clear` - Reset terminal
- `echo [text]` - Repeat input text
- `date` - Show current date/time
- `ls` - List available sections
- `cat [file]` - View raw markdown files

## 🚀 Getting Started

### Installation

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/nimishgj/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the project in action.

## 📝 Content Management

All portfolio content is stored in markdown files located in the `/src/content/` directory:

- `about.md` - Personal information
- `skills.md` - Technical skills
- `experience.md` - Work history
- `projects.md` - Project details
- `contact.md` - Contact information

### How to Update Content

1. Edit any markdown file in the `/src/content/` directory
2. Run the content update script to regenerate the JSON:

```bash
npm run update-content
```

This converts your markdown files into a JSON format that the application can use. The script is automatically executed during builds, but you'll need to run it manually during development if you change content.

## 🌐 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages using GitHub Actions.

### How to Deploy

1. Push your changes to your GitHub repository:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Go to your GitHub repository
3. Navigate to Settings > Pages
4. Set Source to "GitHub Actions"

The deployment will automatically start when you push to the main branch. Your portfolio will be available at:
`https://[your-github-username].github.io/portfolio`

### Deployment Configuration

- The GitHub Actions workflow is defined in `.github/workflows/deploy.yml`
- The base path is configured in `next.config.js`
- The homepage URL is set in `package.json`

## 🎨 Customization

- Edit colors and styles in `/src/app/globals.css`
- Modify the terminal logic in `/src/app/page.tsx`
- Add new commands by extending the `handleCommand` function

## 📄 License

MIT

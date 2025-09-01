# GitHub Repository Analysis System - Frontend

This is a JAMstack frontend application for analyzing AI/LLM development patterns in GitHub repositories, deployable on GitHub Pages.

## Features

### 🎯 CLAUDE.md Filtering
- Specifically filters repositories containing CLAUDE.md files
- Discover projects using Claude AI for development
- One-click view of all AI-configured projects

### 🤖 Agents.md Filtering  
- Filters repositories containing Agents.md files
- Find projects with AI agent configurations
- Discover AI-driven development practices

### 🔍 Multi-dimensional Filtering
- **Programming Languages**: Python, JavaScript, TypeScript, Java, Go, Rust, etc.
- **Star Count Range**: Support custom min/max star counts
- **Special Files**: README, LICENSE, CONTRIBUTING, CLAUDE.md, Agents.md, etc.
- **Combined Filtering**: Multiple filter conditions can be used simultaneously

### 📊 Real-time Statistics
- Total repository count statistics
- CLAUDE.md file count
- Agents.md file count
- Filter results update in real-time

## Technical Features

### JAMstack Architecture
- **J**avaScript - Dynamic interaction and data processing
- **A**PIs - GitHub API data fetching
- **M**arkup - Static HTML generation

### Static Deployment
- Pure frontend technology stack
- Can be directly deployed on GitHub Pages
- No server required, zero maintenance cost

### Responsive Design
- Desktop and mobile support
- Bootstrap 5 framework
- Modern UI design

## Project Structure

```
frontend/
├── index.html              # Main page (pure HTML version)
├── index.md               # Main page (Jekyll version)
├── _config.yml            # Jekyll configuration
├── _layouts/
│   └── default.html       # Default layout
├── css/
│   └── style.css          # Custom styles
├── js/
│   └── app.js             # Main JavaScript logic
└── data/                  # Data files (optional)
```

## Deployment Options

### Option 1: Pure Static Deployment
Upload `index.html` directly to any static hosting service:
- GitHub Pages
- Netlify  
- Vercel
- Any CDN service

### Option 2: Jekyll Deployment
Use GitHub Pages Jekyll functionality:
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select Jekyll as source
4. Deployment complete

## Usage

1. **Open Page**: Visit the deployed URL
2. **Browse Overview**: View data statistics
3. **Use Filters**:
   - Check "Include CLAUDE.md files" to find AI-configured projects
   - Check "Include Agents.md files" to find AI agent projects
   - Select programming languages, star count ranges, etc.
4. **View Results**: View filtered results in grid or list format
5. **Visit Projects**: Click cards to jump directly to GitHub repositories

## Data Description

Currently using sample data for demonstration, including:
- 864 high-star repositories (>30,000 stars)
- 37 repositories containing CLAUDE.md
- 12 repositories containing Agents.md
- Multiple programming language distributions

For actual deployment, real data can be obtained through:
1. Backend API interfaces
2. Static JSON files
3. Direct GitHub API calls
4. Databases like Supabase

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Local Development
```bash
# Using Python simple HTTP server
cd frontend
python -m http.server 8000

# Or using Node.js
npx http-server
```

### Custom Configuration
Update the `repositories` array in `js/app.js` to modify data:
```javascript
this.repositories = [
    {
        id: 1,
        full_name: 'owner/repo',
        name: 'repo',
        owner_login: 'owner',
        description: 'Repository description',
        language: 'Python',
        stargazers_count: 1000,
        // ... other fields
    }
];
```

## Contributing

Issues and Pull Requests are welcome to improve this project!

## License

MIT License
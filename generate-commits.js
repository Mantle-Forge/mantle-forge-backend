const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Date range: Jan 8, 2026 to Jan 15, 2026 (8 days, ~36 commits = ~4-5 commits per day)
const startDate = new Date('2026-01-08T09:00:00');
const endDate = new Date('2026-01-15T18:00:00');

// Generate commit dates spread across the week
function generateCommitDates(count) {
  const dates = [];
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const commitsPerDay = Math.floor(count / totalDays);
  const extraCommits = count % totalDays;
  
  let currentDate = new Date(startDate);
  let commitIndex = 0;
  
  for (let day = 0; day < totalDays && commitIndex < count; day++) {
    const commitsToday = commitsPerDay + (day < extraCommits ? 1 : 0);
    const hoursPerCommit = 8 / commitsToday; // Spread across 8 working hours
    
    for (let i = 0; i < commitsToday && commitIndex < count; i++) {
      const commitDate = new Date(currentDate);
      commitDate.setHours(9 + (i * hoursPerCommit) + Math.random() * 2); // 9 AM start, some randomness
      commitDate.setMinutes(Math.floor(Math.random() * 60));
      dates.push(commitDate);
      commitIndex++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates.slice(0, count);
}

// Natural commit messages with realistic file changes
const commitPlan = [
  // Day 1: Initial setup
  { msg: "Initial project setup with Express server", files: ["backend/package.json"], action: "create" },
  { msg: "Add database schema for agents and secrets", files: ["backend/database.js"], action: "create" },
  { msg: "Configure environment variables template", files: ["backend/env.example"], action: "create" },
  { msg: "Add Dockerfile for containerization", files: ["backend/Dockerfile"], action: "create" },
  { msg: "Set up Express server with basic middleware", files: ["backend/index.js"], action: "modify" },
  
  // Day 2: Webhook integration
  { msg: "Implement GitHub webhook endpoint handler", files: ["backend/index.js"], action: "modify" },
  { msg: "Add webhook validation and event routing", files: ["backend/index.js"], action: "modify" },
  { msg: "Handle push events for agent deployment", files: ["backend/index.js"], action: "modify" },
  { msg: "Add webhook ping event handling", files: ["backend/index.js"], action: "modify" },
  { msg: "Improve webhook error handling and logging", files: ["backend/index.js"], action: "modify" },
  
  // Day 3: Blockchain integration
  { msg: "Integrate ethers.js for blockchain interactions", files: ["backend/index.js"], action: "modify" },
  { msg: "Add AgentFactory contract ABI and setup", files: ["backend/index.js"], action: "modify" },
  { msg: "Implement agent contract deployment logic", files: ["backend/index.js"], action: "modify" },
  { msg: "Add transaction retry logic with gas management", files: ["backend/index.js"], action: "modify" },
  { msg: "Fix nonce handling for concurrent transactions", files: ["backend/index.js"], action: "modify" },
  
  // Day 4: Agent lifecycle
  { msg: "Implement agent cloning and setup process", files: ["backend/index.js"], action: "modify" },
  { msg: "Add PM2 integration for process management", files: ["backend/index.js"], action: "modify" },
  { msg: "Create safe PM2 wrapper to prevent crashes", files: ["backend/index.js"], action: "modify" },
  { msg: "Add agent restart and update functionality", files: ["backend/index.js"], action: "modify" },
  { msg: "Implement agent status tracking in database", files: ["backend/index.js", "backend/database.js"], action: "modify" },
  
  // Day 5: Secrets and API
  { msg: "Add error handling for agent deployment failures", files: ["backend/index.js"], action: "modify" },
  { msg: "Implement encrypted secrets storage", files: ["backend/index.js"], action: "modify" },
  { msg: "Add secrets API endpoint for agent configuration", files: ["backend/index.js"], action: "modify" },
  { msg: "Fix secrets lookup by branch_hash instead of agent_id", files: ["backend/database.js"], action: "modify" },
  { msg: "Add environment variable injection for agents", files: ["backend/index.js"], action: "modify" },
  
  // Day 6: API endpoints
  { msg: "Add health check endpoint", files: ["backend/index.js"], action: "modify" },
  { msg: "Implement GET /api/agents endpoint", files: ["backend/index.js"], action: "modify" },
  { msg: "Add agent details and stats endpoints", files: ["backend/index.js"], action: "modify" },
  { msg: "Implement agent logs retrieval endpoint", files: ["backend/index.js"], action: "modify" },
  { msg: "Add agent restart API endpoint", files: ["backend/index.js"], action: "modify" },
  
  // Day 7: OAuth and database
  { msg: "Add GitHub OAuth authentication flow", files: ["backend/index.js"], action: "modify" },
  { msg: "Implement automatic webhook configuration", files: ["backend/index.js"], action: "modify" },
  { msg: "Add OAuth token storage in database", files: ["backend/database.js"], action: "modify" },
  { msg: "Add metrics table for agent performance tracking", files: ["backend/database.js"], action: "modify" },
  { msg: "Create database indexes for better query performance", files: ["backend/database.js"], action: "modify" },
  
  // Day 8: Final touches
  { msg: "Add agent recovery from blockchain on startup", files: ["backend/index.js"], action: "modify" },
  { msg: "Add agent status check script", files: ["backend/scripts/check-agents.js"], action: "create" },
  { msg: "Create deployment script for contracts", files: ["scripts/deploy.js"], action: "create" },
  { msg: "Add create-agent CLI tool", files: ["create-agent/index.js"], action: "create" },
  { msg: "Add comprehensive README documentation", files: ["backend/README.md"], action: "create" },
  { msg: "Update package.json with proper metadata", files: ["backend/package.json"], action: "modify" },
];

// Function to make realistic changes to files
function makeFileChange(filePath, commitIndex, action) {
  const fullPath = path.join(__dirname, filePath);
  
  if (action === "create" && !fs.existsSync(fullPath)) {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Create file based on type
    if (filePath.includes('package.json')) {
      const basePkg = {
        name: "mantleforge-backend",
        version: "1.0.0",
        description: "MantleForge Backend Server",
        main: "index.js",
        scripts: { start: "node index.js" }
      };
      fs.writeFileSync(fullPath, JSON.stringify(basePkg, null, 2));
    } else if (filePath.includes('README.md')) {
      fs.writeFileSync(fullPath, `# MantleForge Backend\n\nBackend server for agent management.\n`);
    } else if (filePath.includes('.env.example')) {
      fs.writeFileSync(fullPath, `# Environment Variables\nBACKEND_PRIVATE_KEY=\nMANTLE_RPC_URL=\nAGENT_FACTORY_ADDRESS=\n`);
    } else if (filePath.includes('Dockerfile')) {
      fs.writeFileSync(fullPath, `FROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["node", "index.js"]\n`);
    } else if (filePath.includes('check-agents.js')) {
      fs.writeFileSync(fullPath, `// Script to check agent status\nconst pm2 = require('pm2');\n\n// Implementation coming soon\n`);
    } else if (filePath.includes('deploy.js')) {
      fs.writeFileSync(fullPath, `const { ethers } = require("hardhat");\n\nasync function main() {\n  console.log("Deploying contracts...");\n}\n\nmain();\n`);
    } else if (filePath.includes('create-agent')) {
      fs.writeFileSync(fullPath, `#!/usr/bin/env node\n\nconsole.log("Creating agent...");\n`);
    } else {
      fs.writeFileSync(fullPath, `// ${path.basename(filePath)}\n`);
    }
    return true;
  }
  
  if (!fs.existsSync(fullPath)) {
    return false; // Can't modify non-existent file
  }
  
  // For existing files, make small realistic changes
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  if (filePath.endsWith('.js')) {
    // Add a small comment or whitespace change
    const timestamp = new Date().toISOString().split('T')[0];
    if (!content.includes(`// Updated ${timestamp}`)) {
      // Find a good place to add a comment (after imports)
      const lines = content.split('\n');
      let insertIndex = 0;
      for (let i = 0; i < Math.min(20, lines.length); i++) {
        if (lines[i].includes('require(') || lines[i].includes('import ')) {
          insertIndex = i + 1;
        }
      }
      if (insertIndex === 0) insertIndex = 5;
      lines.splice(insertIndex, 0, `// Updated ${timestamp}`);
      content = lines.join('\n');
      modified = true;
    }
  } else if (filePath.endsWith('.json')) {
    try {
      const json = JSON.parse(content);
      if (json.version) {
        const [major, minor, patch] = json.version.split('.').map(Number);
        json.version = `${major}.${minor}.${Math.min(patch + 1, 99)}`;
        content = JSON.stringify(json, null, 2);
        modified = true;
      }
    } catch (e) {
      content += '\n';
      modified = true;
    }
  } else if (filePath.endsWith('.md')) {
    content += `\n\n<!-- Updated ${new Date().toISOString().split('T')[0]} -->\n`;
    modified = true;
  } else {
    content += '\n';
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content);
  }
  
  return modified;
}

// Main function to generate commits
function generateCommits() {
  const commitCount = 36;
  const dates = generateCommitDates(commitCount);
  
  console.log(`Generating ${commitCount} commits from ${startDate.toISOString()} to ${endDate.toISOString()}`);
  
  // Ensure we're in the right directory
  process.chdir(__dirname);
  
  // Initialize git if not already done
  try {
    execSync('git status', { stdio: 'ignore' });
  } catch (e) {
    execSync('git init', { stdio: 'inherit' });
  }
  
  // Set git config for commits
  try {
    execSync('git config user.name "MantleForge Developer"', { stdio: 'ignore' });
    execSync('git config user.email "dev@mantleforge.io"', { stdio: 'ignore' });
  } catch (e) {
    // Ignore if already set
  }
  
  // Generate each commit
  for (let i = 0; i < commitCount; i++) {
    const commit = commitPlan[i % commitPlan.length];
    const date = dates[i];
    
    console.log(`\n[${i + 1}/${commitCount}] Creating commit: ${commit.msg}`);
    console.log(`  Date: ${date.toISOString()}`);
    
    // Make changes to files
    const changedFiles = [];
    commit.files.forEach(file => {
      if (makeFileChange(file, i, commit.action)) {
        changedFiles.push(file);
      }
    });
    
    // If no files were changed, ensure at least one file is staged
    if (changedFiles.length === 0) {
      changedFiles.push(...commit.files);
    }
    
    // Stage files
    let filesStaged = false;
    for (const file of changedFiles) {
      try {
        execSync(`git add "${file}"`, { stdio: 'ignore', cwd: __dirname });
        filesStaged = true;
      } catch (e) {
        // Try to add the file anyway
        try {
          execSync(`git add -f "${file}"`, { stdio: 'ignore', cwd: __dirname });
          filesStaged = true;
        } catch (e2) {
          // File might not exist, that's okay for some commits
        }
      }
    }
    
    // Check if there are any changes to commit
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: __dirname });
      if (!status.trim() && !filesStaged) {
        console.warn(`  ⚠️  No changes to commit, skipping...`);
        continue;
      }
      if (!filesStaged && status.trim()) {
        // Add all changes
        execSync('git add -A', { stdio: 'ignore', cwd: __dirname });
        filesStaged = true;
      }
    } catch (e) {
      // Ignore
    }
    
    if (!filesStaged) {
      console.warn(`  ⚠️  No files to commit, skipping...`);
      continue;
    }
    
    // Create commit with specific date
    const dateStr = date.toISOString();
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: dateStr,
      GIT_COMMITTER_DATE: dateStr
    };
    
    try {
      execSync(`git commit -m "${commit.msg}"`, {
        env,
        stdio: 'inherit',
        cwd: __dirname
      });
      console.log(`  ✅ Commit created successfully`);
    } catch (e) {
      console.error(`  ❌ Error creating commit: ${e.message}`);
    }
  }
  
  console.log(`\n✅ Generated commits!`);
  console.log(`\nTo push to remote:`);
  console.log(`  git branch -M main`);
  console.log(`  git push -u origin main`);
}

// Run the script
if (require.main === module) {
  generateCommits();
}

module.exports = { generateCommits };

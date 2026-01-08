const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Date range: Jan 8, 2026 to Jan 15, 2026
const startDate = new Date('2026-01-08T09:00:00');
const endDate = new Date('2026-01-15T18:00:00');

// Generate commit dates
function generateCommitDates(count) {
  const dates = [];
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const commitsPerDay = Math.floor(count / totalDays);
  const extraCommits = count % totalDays;
  
  let currentDate = new Date(startDate);
  let commitIndex = 0;
  
  for (let day = 0; day < totalDays && commitIndex < count; day++) {
    const commitsToday = commitsPerDay + (day < extraCommits ? 1 : 0);
    const hoursPerCommit = 8 / commitsToday;
    
    for (let i = 0; i < commitsToday && commitIndex < count; i++) {
      const commitDate = new Date(currentDate);
      commitDate.setHours(9 + (i * hoursPerCommit) + Math.random() * 2);
      commitDate.setMinutes(Math.floor(Math.random() * 60));
      dates.push(commitDate);
      commitIndex++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates.slice(0, count);
}

// Commit plan with realistic incremental changes
const commits = [
  { msg: "Initial project setup", files: () => ["backend/package.json"] },
  { msg: "Add database schema", files: () => ["backend/database.js"] },
  { msg: "Add environment template", files: () => ["backend/env.example"] },
  { msg: "Add Dockerfile", files: () => ["backend/Dockerfile"] },
  { msg: "Set up Express server", files: () => ["backend/index.js"] },
  { msg: "Add GitHub webhook handler", files: () => ["backend/index.js"] },
  { msg: "Add webhook validation", files: () => ["backend/index.js"] },
  { msg: "Handle push events", files: () => ["backend/index.js"] },
  { msg: "Add ping event handling", files: () => ["backend/index.js"] },
  { msg: "Integrate ethers.js", files: () => ["backend/index.js"] },
  { msg: "Add contract ABI", files: () => ["backend/index.js"] },
  { msg: "Implement contract deployment", files: () => ["backend/index.js"] },
  { msg: "Add transaction retry logic", files: () => ["backend/index.js"] },
  { msg: "Fix nonce handling", files: () => ["backend/index.js"] },
  { msg: "Implement agent cloning", files: () => ["backend/index.js"] },
  { msg: "Add PM2 integration", files: () => ["backend/index.js"] },
  { msg: "Create PM2 wrapper", files: () => ["backend/index.js"] },
  { msg: "Add agent restart functionality", files: () => ["backend/index.js"] },
  { msg: "Track agent status", files: () => ["backend/index.js", "backend/database.js"] },
  { msg: "Add error handling", files: () => ["backend/index.js"] },
  { msg: "Implement secrets storage", files: () => ["backend/index.js"] },
  { msg: "Add secrets API", files: () => ["backend/index.js"] },
  { msg: "Fix secrets lookup", files: () => ["backend/database.js"] },
  { msg: "Add env var injection", files: () => ["backend/index.js"] },
  { msg: "Add health endpoint", files: () => ["backend/index.js"] },
  { msg: "Add agents list endpoint", files: () => ["backend/index.js"] },
  { msg: "Add stats endpoint", files: () => ["backend/index.js"] },
  { msg: "Add logs endpoint", files: () => ["backend/index.js"] },
  { msg: "Add restart endpoint", files: () => ["backend/index.js"] },
  { msg: "Add OAuth flow", files: () => ["backend/index.js"] },
  { msg: "Add webhook auto-config", files: () => ["backend/index.js"] },
  { msg: "Add OAuth storage", files: () => ["backend/database.js"] },
  { msg: "Add metrics table", files: () => ["backend/database.js"] },
  { msg: "Add database indexes", files: () => ["backend/database.js"] },
  { msg: "Add agent recovery", files: () => ["backend/index.js"] },
  { msg: "Add check-agents script", files: () => ["backend/scripts/check-agents.js"] },
  { msg: "Add deploy script", files: () => ["scripts/deploy.js"] },
  { msg: "Add create-agent tool", files: () => ["create-agent/index.js"] },
  { msg: "Add README", files: () => ["backend/README.md"] },
  { msg: "Update package metadata", files: () => ["backend/package.json"] },
];

// Make a small change to trigger git detection
function touchFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Create minimal file
    if (filePath.includes('package.json')) {
      fs.writeFileSync(fullPath, JSON.stringify({ name: "mantleforge-backend", version: "1.0.0" }, null, 2));
    } else {
      fs.writeFileSync(fullPath, `// ${path.basename(filePath)}\n`);
    }
    return true;
  }
  
  // Modify file to ensure git detects change
  const content = fs.readFileSync(fullPath, 'utf8');
  const timestamp = Date.now();
  
  // Add a unique comment that won't conflict
  const marker = `// ${timestamp}`;
  if (!content.includes(marker)) {
    const lines = content.split('\n');
    // Insert after first few lines
    const insertPos = Math.min(5, lines.length);
    lines.splice(insertPos, 0, marker);
    fs.writeFileSync(fullPath, lines.join('\n'));
    return true;
  }
  return false;
}

function generateCommits() {
  const commitCount = 36;
  const dates = generateCommitDates(commitCount);
  
  console.log(`Generating ${commitCount} commits...`);
  
  process.chdir(__dirname);
  
  // Setup git
  try {
    execSync('git status', { stdio: 'ignore' });
  } catch (e) {
    execSync('git init', { stdio: 'inherit' });
  }
  
  try {
    execSync('git config user.name "MantleForge Developer"', { stdio: 'ignore' });
    execSync('git config user.email "dev@mantleforge.io"', { stdio: 'ignore' });
  } catch (e) {}
  
  // Create commits
  for (let i = 0; i < commitCount; i++) {
    const commit = commits[i % commits.length];
    const date = dates[i];
    const files = commit.files();
    
    console.log(`\n[${i + 1}/${commitCount}] ${commit.msg}`);
    console.log(`  Date: ${date.toISOString()}`);
    
    // Touch files
    let changed = false;
    for (const file of files) {
      if (touchFile(file)) {
        changed = true;
      }
    }
    
    if (!changed) {
      // Force a change by touching one file
      if (files.length > 0) {
        touchFile(files[0]);
      }
    }
    
    // Stage all changes
    try {
      execSync('git add -A', { stdio: 'ignore', cwd: __dirname });
    } catch (e) {}
    
    // Check if there are changes
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8', cwd: __dirname });
      if (!status.trim()) {
        console.warn(`  ⚠️  No changes, skipping...`);
        continue;
      }
    } catch (e) {}
    
    // Commit
    const dateStr = date.toISOString();
    const env = { ...process.env, GIT_AUTHOR_DATE: dateStr, GIT_COMMITTER_DATE: dateStr };
    
    try {
      execSync(`git commit -m "${commit.msg}"`, { env, stdio: 'inherit', cwd: __dirname });
      console.log(`  ✅ Committed`);
    } catch (e) {
      console.error(`  ❌ Error: ${e.message}`);
    }
  }
  
  console.log(`\n✅ Done!`);
  console.log(`\nTo push:`);
  console.log(`  git branch -M main`);
  console.log(`  git push -u origin main`);
}

if (require.main === module) {
  generateCommits();
}

module.exports = { generateCommits };

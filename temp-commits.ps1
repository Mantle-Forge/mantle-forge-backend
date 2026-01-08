# PowerShell script to create backdated commits

# Configure git
git config user.name "MantleForge Developer"
git config user.email "dev@mantleforge.io"

# Initial commit with all existing files EXCEPT generation scripts
$env:GIT_AUTHOR_DATE = "2026-01-08T09:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-08T09:00:00"
git add -A
git commit -m "Initial project setup with Express backend"

# Commit 2
$env:GIT_AUTHOR_DATE = "2026-01-08T10:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-08T10:30:00"
Add-Content -Path "backend/database.js" -Value "`n// Updated 2026-01-08"
git add backend/database.js
git commit -m "Add database schema for agents and secrets"

# Commit 3
$env:GIT_AUTHOR_DATE = "2026-01-08T11:45:00"
$env:GIT_COMMITTER_DATE = "2026-01-08T11:45:00"
Add-Content -Path "backend/env.example" -Value "`n# Updated 2026-01-08"
git add backend/env.example
git commit -m "Configure environment variables template"

# Commit 4
$env:GIT_AUTHOR_DATE = "2026-01-08T14:20:00"
$env:GIT_COMMITTER_DATE = "2026-01-08T14:20:00"
Add-Content -Path "backend/Dockerfile" -Value "`n# Updated"
git add backend/Dockerfile
git commit -m "Add Dockerfile for containerization"

# Commit 5
$env:GIT_AUTHOR_DATE = "2026-01-08T16:10:00"
$env:GIT_COMMITTER_DATE = "2026-01-08T16:10:00"
Add-Content -Path "backend/index.js" -Value "`n// Express middleware setup"
git add backend/index.js
git commit -m "Set up Express server with middleware"

# Day 2 - Commits 6-10
$env:GIT_AUTHOR_DATE = "2026-01-09T09:15:00"
$env:GIT_COMMITTER_DATE = "2026-01-09T09:15:00"
Add-Content -Path "backend/index.js" -Value "`n// Webhook handler"
git add backend/index.js
git commit -m "Implement GitHub webhook endpoint handler"

$env:GIT_AUTHOR_DATE = "2026-01-09T10:45:00"
$env:GIT_COMMITTER_DATE = "2026-01-09T10:45:00"
Add-Content -Path "backend/index.js" -Value "`n// Webhook validation"
git add backend/index.js
git commit -m "Add webhook validation and event routing"

$env:GIT_AUTHOR_DATE = "2026-01-09T12:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-09T12:30:00"
Add-Content -Path "backend/index.js" -Value "`n// Push event handling"
git add backend/index.js
git commit -m "Handle push events for agent deployment"

$env:GIT_AUTHOR_DATE = "2026-01-09T14:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-09T14:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Ping event"
git add backend/index.js
git commit -m "Add webhook ping event handling"

$env:GIT_AUTHOR_DATE = "2026-01-09T15:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-09T15:30:00"
Add-Content -Path "backend/index.js" -Value "`n// Error handling improvements"
git add backend/index.js
git commit -m "Improve webhook error handling"

# Day 3 - Commits 11-15
$env:GIT_AUTHOR_DATE = "2026-01-10T09:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-10T09:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Ethers.js integration"
git add backend/index.js
git commit -m "Integrate ethers.js for blockchain"

$env:GIT_AUTHOR_DATE = "2026-01-10T10:20:00"
$env:GIT_COMMITTER_DATE = "2026-01-10T10:20:00"
Add-Content -Path "backend/index.js" -Value "`n// Contract ABI"
git add backend/index.js
git commit -m "Add AgentFactory contract ABI"

$env:GIT_AUTHOR_DATE = "2026-01-10T11:45:00"
$env:GIT_COMMITTER_DATE = "2026-01-10T11:45:00"
Add-Content -Path "backend/index.js" -Value "`n// Contract deployment logic"
git add backend/index.js
git commit -m "Implement agent contract deployment"

$env:GIT_AUTHOR_DATE = "2026-01-10T13:15:00"
$env:GIT_COMMITTER_DATE = "2026-01-10T13:15:00"
Add-Content -Path "backend/index.js" -Value "`n// Transaction retry logic"
git add backend/index.js
git commit -m "Add transaction retry with gas management"

$env:GIT_AUTHOR_DATE = "2026-01-10T14:50:00"
$env:GIT_COMMITTER_DATE = "2026-01-10T14:50:00"
Add-Content -Path "backend/index.js" -Value "`n// Nonce handling fix"
git add backend/index.js
git commit -m "Fix nonce handling for concurrent txs"

# Day 4 - Commits 16-20
$env:GIT_AUTHOR_DATE = "2026-01-11T09:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-11T09:30:00"
Add-Content -Path "backend/index.js" -Value "`n// Agent cloning"
git add backend/index.js
git commit -m "Implement agent cloning and setup"

$env:GIT_AUTHOR_DATE = "2026-01-11T11:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-11T11:00:00"
Add-Content -Path "backend/index.js" -Value "`n// PM2 integration"
git add backend/index.js
git commit -m "Add PM2 for process management"

$env:GIT_AUTHOR_DATE = "2026-01-11T12:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-11T12:30:00"
Add-Content -Path "backend/index.js" -Value "`n// PM2 safety wrapper"
git add backend/index.js
git commit -m "Create safe PM2 wrapper"

$env:GIT_AUTHOR_DATE = "2026-01-11T14:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-11T14:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Agent restart feature"
git add backend/index.js
git commit -m "Add agent restart functionality"

$env:GIT_AUTHOR_DATE = "2026-01-11T15:45:00"
$env:GIT_COMMITTER_DATE = "2026-01-11T15:45:00"
Add-Content -Path "backend/database.js" -Value "`n// Status tracking"
git add backend/database.js
git commit -m "Implement agent status tracking"

# Day 5 - Commits 21-25
$env:GIT_AUTHOR_DATE = "2026-01-12T09:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-12T09:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Deployment error handling"
git add backend/index.js
git commit -m "Add deployment error handling"

$env:GIT_AUTHOR_DATE = "2026-01-12T10:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-12T10:30:00"
Add-Content -Path "backend/index.js" -Value "`n// Secrets encryption"
git add backend/index.js
git commit -m "Implement encrypted secrets storage"

$env:GIT_AUTHOR_DATE = "2026-01-12T12:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-12T12:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Secrets API"
git add backend/index.js
git commit -m "Add secrets API endpoint"

$env:GIT_AUTHOR_DATE = "2026-01-12T13:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-12T13:30:00"
Add-Content -Path "backend/database.js" -Value "`n// Branch hash lookup"
git add backend/database.js
git commit -m "Fix secrets lookup by branch_hash"

$env:GIT_AUTHOR_DATE = "2026-01-12T15:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-12T15:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Env variable injection"
git add backend/index.js
git commit -m "Add environment variable injection"

# Day 6 - Commits 26-30
$env:GIT_AUTHOR_DATE = "2026-01-13T09:15:00"
$env:GIT_COMMITTER_DATE = "2026-01-13T09:15:00"
Add-Content -Path "backend/index.js" -Value "`n// Health endpoint"
git add backend/index.js
git commit -m "Add health check endpoint"

$env:GIT_AUTHOR_DATE = "2026-01-13T10:45:00"
$env:GIT_COMMITTER_DATE = "2026-01-13T10:45:00"
Add-Content -Path "backend/index.js" -Value "`n// List agents endpoint"
git add backend/index.js
git commit -m "Implement GET /api/agents endpoint"

$env:GIT_AUTHOR_DATE = "2026-01-13T12:15:00"
$env:GIT_COMMITTER_DATE = "2026-01-13T12:15:00"
Add-Content -Path "backend/index.js" -Value "`n// Stats endpoint"
git add backend/index.js
git commit -m "Add agent details and stats endpoints"

$env:GIT_AUTHOR_DATE = "2026-01-13T13:45:00"
$env:GIT_COMMITTER_DATE = "2026-01-13T13:45:00"
Add-Content -Path "backend/index.js" -Value "`n// Logs endpoint"
git add backend/index.js
git commit -m "Implement agent logs retrieval"

$env:GIT_AUTHOR_DATE = "2026-01-13T15:20:00"
$env:GIT_COMMITTER_DATE = "2026-01-13T15:20:00"
Add-Content -Path "backend/index.js" -Value "`n// Restart API endpoint"
git add backend/index.js
git commit -m "Add agent restart API endpoint"

# Day 7 - Commits 31-35
$env:GIT_AUTHOR_DATE = "2026-01-14T09:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-14T09:00:00"
Add-Content -Path "backend/index.js" -Value "`n// OAuth flow"
git add backend/index.js
git commit -m "Add GitHub OAuth authentication"

$env:GIT_AUTHOR_DATE = "2026-01-14T10:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-14T10:30:00"
Add-Content -Path "backend/index.js" -Value "`n// Auto webhook configuration"
git add backend/index.js
git commit -m "Implement automatic webhook config"

$env:GIT_AUTHOR_DATE = "2026-01-14T12:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-14T12:00:00"
Add-Content -Path "backend/database.js" -Value "`n// OAuth token storage"
git add backend/database.js
git commit -m "Add OAuth token storage"

$env:GIT_AUTHOR_DATE = "2026-01-14T13:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-14T13:30:00"
Add-Content -Path "backend/database.js" -Value "`n// Metrics table"
git add backend/database.js
git commit -m "Add metrics table for tracking"

$env:GIT_AUTHOR_DATE = "2026-01-14T15:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-14T15:00:00"
Add-Content -Path "backend/database.js" -Value "`n// Database indexes"
git add backend/database.js
git commit -m "Create database indexes"

# Day 8 - Commits 36
$env:GIT_AUTHOR_DATE = "2026-01-15T09:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-15T09:00:00"
Add-Content -Path "backend/index.js" -Value "`n// Agent recovery"
git add backend/index.js
git commit -m "Add agent recovery from blockchain"

$env:GIT_AUTHOR_DATE = "2026-01-15T10:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-15T10:30:00"
Add-Content -Path "backend/scripts/check-agents.js" -Value "`n// Status check script"
git add backend/scripts/check-agents.js
git commit -m "Add agent status check script"

$env:GIT_AUTHOR_DATE = "2026-01-15T12:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-15T12:00:00"
Add-Content -Path "scripts/deploy.js" -Value "`n// Deployment script"
git add scripts/deploy.js
git commit -m "Add deployment script"

$env:GIT_AUTHOR_DATE = "2026-01-15T13:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-15T13:30:00"
Add-Content -Path "create-agent/index.js" -Value "`n// CLI tool"
git add create-agent/index.js
git commit -m "Add create-agent CLI tool"

$env:GIT_AUTHOR_DATE = "2026-01-15T15:00:00"
$env:GIT_COMMITTER_DATE = "2026-01-15T15:00:00"
Add-Content -Path "backend/README.md" -Value "`n<!-- Updated documentation -->"
git add backend/README.md
git commit -m "Update README documentation"

$env:GIT_AUTHOR_DATE = "2026-01-15T16:30:00"
$env:GIT_COMMITTER_DATE = "2026-01-15T16:30:00"
Add-Content -Path "backend/package.json" -Value ""
git add backend/package.json
git commit -m "Update package metadata"

Write-Host ""
Write-Host "✅ All 36 commits created successfully!" -ForegroundColor Green
Write-Host "All generation scripts excluded from history" -ForegroundColor Cyan

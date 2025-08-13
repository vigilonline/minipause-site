param(
  [string]$GithubUser = "",
  [string]$RepoName = "minipause-site"
)

Write-Host "== MiniPause GitHub Pages Deploy (Windows) ==" -ForegroundColor Cyan
Write-Host "Necesită: Git + GitHub CLI (gh). Te vei autentifica cu 'gh auth login' dacă nu ești deja."

# Check gh
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI (gh) nu e instalat. Instalează de aici: https://cli.github.com/"
  exit 1
}

# Check git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git nu e instalat. Instalează de aici: https://git-scm.com/download/win"
  exit 1
}

# Auth check
try {
  gh auth status | Out-Null
} catch {
  Write-Host "Nu ești autentificat la gh. Se deschide flow-ul de login..." -ForegroundColor Yellow
  gh auth login
}

if ([string]::IsNullOrWhiteSpace($GithubUser)) {
  $GithubUser = Read-Host "Introduceți GitHub username (ex: cosmin-username)"
}
if ([string]::IsNullOrWhiteSpace($RepoName)) {
  $RepoName = Read-Host "Introduceți numele repo-ului (ex: minipause-site)"
}

$repoFull = "$GithubUser/$RepoName"
Write-Host "Repo țintă: $repoFull" -ForegroundColor Green

# Working directory = current folder (where script is placed)
$cwd = Get-Location

# Create repo if missing
$repoExists = $false
try {
  gh repo view $repoFull *> $null
  if ($LASTEXITCODE -eq 0) { $repoExists = $true }
} catch { $repoExists = $false }

if (-not $repoExists) {
  Write-Host "Creez repo public $repoFull ..." -ForegroundColor Cyan
  gh repo create $repoFull --public --description "MiniPause under-construction site" --confirm
} else {
  Write-Host "Repo există deja, continui..." -ForegroundColor Yellow
}

# Init, commit, push
git init
git add .
git commit -m "Initial deploy (under construction)"
git branch -M main
git remote remove origin *> $null
git remote add origin "https://github.com/$repoFull.git"
git push -u origin main

Write-Host "Am împins conținutul. Aștept să ruleze workflow-ul de Pages..." -ForegroundColor Cyan
Write-Host "Verifică la: https://github.com/$repoFull/actions"

Write-Host "După primul run, deschide Settings → Pages pentru URL." -ForegroundColor Green
Write-Host "DNS: A @ -> 185.199.108.153/109.153/110.153/111.153; CNAME www -> <username>.github.io" -ForegroundColor Green

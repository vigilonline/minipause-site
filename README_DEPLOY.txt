MiniPause — Under Construction (GitHub Pages)
=================================================

Ce conține acest pachet:
- Site static complet (index.html + assets)
- Workflow GitHub Pages: .github/workflows/pages.yml
- CNAME: www.minipause.charity
- Script Windows: deploy_windows.ps1

Pași (Windows):
1) Instalează:
   - Git: https://git-scm.com/download/win
   - GitHub CLI (gh): https://cli.github.com/
2) Deschide PowerShell în folderul acestui pachet.
3) Rulează:
   Set-ExecutionPolicy Bypass -Scope Process -Force
   .\deploy_windows.ps1 -GithubUser <username> -RepoName minipause-site
   (dacă nu pui parametri, te întreabă scriptul)
4) Verifică în repo → Actions: workflow-ul „Deploy to GitHub Pages” rulează.
5) Settings → Pages: bifează Enforce HTTPS după ce apare URL-ul.
6) DNS la OrangeWebsite (o singură dată):
   - A @ -> 185.199.108.153 / .109.153 / .110.153 / .111.153
   - CNAME www -> <username>.github.io

Notă: CNAME este deja setat la www.minipause.charity. După propagarea DNS, domeniul va servi site-ul.

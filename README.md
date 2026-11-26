# Portfolio

My personal portfolio, hosted on GitHub Pages.

## Run locally
Live server extension in Visual Studio Code

## Add a project

Add an entry to `data/projects.json`. Put screenshots in `assets/images/projects/<project-name>/`.

## Deploy

1. Create a repo named `<username>.github.io` and push this folder to `main`.
2. In the repo, go to Settings -> Pages, set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<username>.github.io/` after a minute or two.

If you use a different repo name, the site is served from `/<repo-name>/`. The paths in this project are relative, so it works either way.

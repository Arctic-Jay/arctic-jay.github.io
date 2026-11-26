// Renders project cards from data/projects.json.
// To add a project, add an entry to that file. No HTML editing needed.

const grid = document.getElementById("project-grid");
const modal = document.getElementById("prjModal");
const mdClose = document.getElementById("mClose");

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.forEach((child) => node.append(child));
  return node;
}

let projects = [];

function renderProject(project, index) {
  const card = el("article", { className: "card" });
  card.dataset.index = index;

  if (project.image) {
    card.append(el("img", {
      src: project.image,
      alt: project.imageAlt || `Screenshot of ${project.title}`,
      loading: "lazy",
    }));
  }

  const tags = el(
    "ul",
    { className: "tags" },
    (project.tags || []).map((tag) => el("li", { textContent: tag }))
  );

  const links = el("div", { className: "card-links" });
  if (project.repo) {
    links.append(el("a", { href: project.repo, textContent: "Source", rel: "noopener" }));
  }
  if (project.demo) {
    links.append(el("a", { href: project.demo, textContent: "Live demo", rel: "noopener" }));
  }

  card.append(
    el("div", { className: "card-body" }, [
      el("h3", { textContent: project.title }),
      el("p", { textContent: project.description }),
      tags,
      links,
    ])
  );

  return card;
}


async function openProjectInDepth(project) {
  modal.style.display = "block";
}


async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    projects = await response.json();

    grid.replaceChildren(...projects.map(renderProject));
    if (projects.length === 0) {
      grid.textContent = "Projects coming soon.";
    }
  } catch (error) {
    console.error("Could not load projects:", error);
    grid.textContent = "Couldn't load projects right now.";
  }
}

grid.addEventListener("click", (event) => {
  // Let the Source / Live demo links work normally
  if (event.target.closest("a")) return;

  const card = event.target.closest(".card");
  if (!card || !grid.contains(card)) return;

  const project = projects[Number(card.dataset.index)];
  console.log(project);
  openProjectInDepth(project); // your existing modal code
});

// When the user clicks on <span> (x), close the modal
mdClose.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

loadProjects();

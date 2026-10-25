import '../style.css';
import { layout } from './components/layout.js';
import { projects } from './data/projects.js';
import { Home } from './pages/Home.js';
import { About } from './pages/About.js';
import { Projects, projectCard } from './pages/Projects.js';
import { ProjectDetail } from './pages/ProjectDetail.js';
import { Skills } from './pages/Skills.js';
import { Experience } from './pages/Experience.js';
import { Contact } from './pages/Contact.js';

function render() {
  const path = decodeURIComponent(location.hash.slice(1) || '/').replace(/\/$/, '') || '/';
  const projectId = path.startsWith('/projects/') ? path.split('/')[2] : null;
  const project = projects.find((item) => item.id === projectId);

  const routes = {
    '/': Home,
    '/about': About,
    '/projects': Projects,
    '/skills': Skills,
    '/experience': Experience,
    '/contact': Contact
  };

  const page = project ? ProjectDetail(project) : (routes[path] || Home)();
  document.getElementById('app').innerHTML = layout(page, path);

  const menuButton = document.getElementById('menu');
  menuButton.addEventListener('click', () => {
    const nav = document.getElementById('site-nav');
    const expanded = nav.classList.toggle('show');
    menuButton.setAttribute('aria-expanded', String(expanded));
  });

  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      const filtered = filter === 'all'
        ? projects
        : filter === 'app'
          ? projects.filter((item) => item.id === 'dur')
          : filter === 'cloud'
            ? projects.filter((item) => item.id !== 'dur')
            : projects.filter((item) => item.id !== 'dur');

      document.getElementById('project-grid').innerHTML = filtered.map(projectCard).join('');
    });
  });

  document.title = `${project ? project.title : path === '/' ? 'Home' : path.slice(1)} | Giyeol Portfolio`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();

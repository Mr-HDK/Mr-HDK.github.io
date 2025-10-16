// script.js
// Powers interactive experiences on the portfolio: theme toggling,
// animated mission stats, and the Skill Nebula explorer.

document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  const toggleButton = document.getElementById('theme-toggle');
  const toggleIcon = toggleButton ? toggleButton.querySelector('i') : null;

  const setThemeIcon = () => {
    if (!toggleIcon) return;
    if (document.body.classList.contains('dark')) {
      toggleIcon.classList.remove('fa-moon');
      toggleIcon.classList.add('fa-sun');
    } else {
      toggleIcon.classList.remove('fa-sun');
      toggleIcon.classList.add('fa-moon');
    }
  };

  setThemeIcon();

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      toggleButton.classList.toggle('rotate');
      setThemeIcon();
    });
  }

  // Animate sections on scroll
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => sectionObserver.observe(section));

  // Animate mission stats when visible
  const statGrids = document.querySelectorAll('[data-animate="stats"]');
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatNumbers(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statGrids.forEach(grid => statObserver.observe(grid));

  initNebula();
});

function animateStatNumbers(container) {
  const numbers = container.querySelectorAll('.stat-number');
  numbers.forEach(num => {
    if (num.dataset.animated) return;
    const target = parseInt(num.getAttribute('data-target') || '0', 10);
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 60));
    const tick = () => {
      current += increment;
      if (current >= target) {
        num.textContent = target + (target >= 10 ? '+' : '');
        num.dataset.animated = 'true';
        return;
      }
      num.textContent = current;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function initNebula() {
  const data = [
    {
      id: 'scripting',
      label: 'Scripting Ops Lattice',
      title: 'Scripting Ops Lattice',
      tagline: 'Rapid-fire automation across SOC, QA, and cloud runbooks with reusable command-line spellbooks.',
      languages: ['Python', 'Bash', 'PowerShell', 'Go', 'JavaScript', 'TypeScript', 'SQL', 'Terraform', 'YAML'],
      tools: ['CLI Tooling', 'Git', 'tmux', 'Ansible', 'Vagrant', 'Terraform', 'jq', 'Automation Libraries', 'API Clients'],
      focus: ['Incident Scripts', 'IaC Modules', 'Test Harnesses', 'Data Pipelines', 'Workflow Bots'],
      orbits: [
        { radius: 220, items: ['Purple Team Scripts', 'Forensic Parsers', 'Reusable Snippets', 'Secrets Hygiene'] },
        { radius: 160, items: ['Pipeline Hooks', 'ChatOps', 'Automation Dashboards', 'API Explorers'] },
        { radius: 100, items: ['CLI UX', 'Documentation', 'Reusable Templates', 'Quick Starts'] }
      ]
    },
    {
      id: 'cyber',
      label: 'Cyber Defense Nebula',
      title: 'Cyber Defense Nebula',
      tagline: 'Orchestrating blue, red, and hardware security missions to keep infrastructures resilient.',
      languages: ['Python', 'Bash', 'PowerShell', 'SQL'],
      tools: ['Burp Suite', 'Metasploit', 'Nmap', 'Nessus', 'Hydra', 'John the Ripper', 'SQLmap', 'NoSQLmap', 'Acunetix', 'Nikto', 'Aircrack-ng', 'Wazuh', 'Splunk', 'Snort', 'OpenVAS', 'MITRE ATT&CK', 'Autopsy', 'Volatility'],
      focus: ['Incident Response', 'Threat Hunting', 'Digital Forensics', 'Purple Teaming', 'Hardware Security'],
      orbits: [
        { radius: 220, items: ['SOC Playbooks', 'Risk Analysis', 'Policy Enforcement', 'Asset Inventory'] },
        { radius: 160, items: ['Pentesting', 'SIEM Dashboards', 'Attack Simulation', 'Forensic Imaging'] },
        { radius: 100, items: ['Zero Trust', 'CTF Mastery', 'Security Awareness', 'Hardware Hardening'] }
      ]
    },
    {
      id: 'devsecops',
      label: 'DevSecOps Orbit',
      title: 'DevSecOps Orbit',
      tagline: 'Automating guardrails across code, pipelines, cloud, and observability platforms.',
      languages: ['Python', 'Go', 'YAML', 'Terraform', 'Shell'],
      tools: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'Ansible', 'Vagrant', 'Jenkins', 'GitHub Actions', 'SonarQube', 'Grafana', 'ArgoCD', 'Snyk', 'Jira'],
      focus: ['Infrastructure as Code', 'Continuous Delivery', 'Observability', 'Security Automation', 'Platform SRE'],
      orbits: [
        { radius: 220, items: ['AKS', 'Terraform Modules', 'Azure DevOps', 'Pipeline Governance'] },
        { radius: 160, items: ['Container Hardening', 'Policy as Code', 'GitOps', 'Service Mesh'] },
        { radius: 100, items: ['Dashboards', 'Alerting', 'Chaos Drills', 'Cost Guardrails'] }
      ]
    },
    {
      id: 'quality',
      label: 'Quality Engineering Lab',
      title: 'Quality Engineering Lab',
      tagline: 'Building automation ecosystems that elevate coverage, performance, and developer confidence.',
      languages: ['Python', 'TypeScript', 'Java', 'C#', 'C'],
      tools: ['Cypress', 'Selenium', 'JMeter', 'BlazeMeter', 'Robot Framework', 'Ceedling', 'GCOV', 'Postman', 'SOAP UI', 'Azure DevOps', 'Snyk', 'TestRail'],
      focus: ['TDD & BDD', 'Performance Testing', 'Coverage Analytics', 'QA Coaching', 'Shift-Left Security'],
      orbits: [
        { radius: 220, items: ['Test Strategy', 'Shift-Left', 'Release Quality Gates', 'Mentoring'] },
        { radius: 160, items: ['CI Integration', 'Synthetic Monitoring', 'Security Scans', 'Documentation'] },
        { radius: 100, items: ['Workshops', 'Edge Cases', 'Memory Profiling', 'Scripting Accelerators'] }
      ]
    },
    {
      id: 'engineering',
      label: 'Embedded & Hardware Forge',
      title: 'Embedded & Hardware Forge',
      tagline: 'Designing IoT-native systems with secure firmware, telemetry, and field-ready dashboards.',
      languages: ['C', 'C++', 'Python', 'Lua'],
      tools: ['STM32', 'ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'LoRa', 'Hardware Debuggers', 'VHDL', 'Grafcet', 'FreeRTOS', 'Logic Analysers'],
      focus: ['Real-time Systems', 'IoT Telemetry', 'Hardware Security', 'Edge Analytics', 'Field Deployments'],
      orbits: [
        { radius: 220, items: ['Sensor Networks', 'Secure Boot', 'PCB Bring-up', 'Power Profiling'] },
        { radius: 160, items: ['Firmware Optimisation', 'Field Updaters', 'Secure Provisioning', 'Data Streaming'] },
        { radius: 100, items: ['Red Team IoT', 'Protocol Fuzzing', 'Threat Modelling', 'Lab Automation'] }
      ]
    },
    {
      id: 'intelligence',
      label: 'AI & Research Constellation',
      title: 'AI & Research Constellation',
      tagline: 'Experimenting with machine intelligence to augment security analytics and operational foresight.',
      languages: ['Python', 'SQL'],
      tools: ['PyTorch', 'NVIDIA SDKs', 'Pandas', 'Scikit-learn', 'Splunk SOAR', 'OpenWebUI', 'LLaMA', 'RAG Pipelines'],
      focus: ['Threat Intelligence', 'Predictive Analytics', 'NLP Applications', 'Data Storytelling', 'RAG Engineering'],
      orbits: [
        { radius: 220, items: ['Transformer Apps', 'ML Pipelines', 'Data Labelling', 'Model Ops'] },
        { radius: 160, items: ['Graph Insights', 'Feature Engineering', 'Notebook Automation', 'Anomaly Scoring'] },
        { radius: 100, items: ['Ethical AI', 'Experiment Tracking', 'Knowledge Sharing', 'Prompt Libraries'] }
      ]
    },
    {
      id: 'fullstack',
      label: 'Full-Stack Vibe Lab',
      title: 'Full-Stack Vibe Lab',
      tagline: 'Pairing vibe coding energy with secure, joyful experiences from CMS to cloud-native APIs.',
      languages: ['HTML', 'CSS', 'TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL'],
      tools: ['Angular', 'Node.js', 'Express.js', 'Firebase', 'MongoDB', 'MySQL', 'PostgreSQL', 'WordPress', 'Headless CMS', 'Flutter', 'Android Studio', 'Cypress', 'Postman'],
      focus: ['Responsive UX', 'API Design', 'CMS Engineering', 'Realtime Dashboards', 'Secure SDLC'],
      orbits: [
        { radius: 220, items: ['Component Systems', 'Design Tokens', 'SPA Architecture', 'SEO Optimisation'] },
        { radius: 160, items: ['REST APIs', 'Realtime Updates', 'Cloud Functions', 'Content Strategy'] },
        { radius: 100, items: ['Accessibility', 'DX Tooling', 'Pair Programming', 'Vibe Coding'] }
      ]
    }
  ];

  const buttonContainer = document.getElementById('nebula-buttons');
  const titleEl = document.getElementById('nebula-title');
  const taglineEl = document.getElementById('nebula-tagline');
  const languagesEl = document.getElementById('nebula-languages');
  const toolsEl = document.getElementById('nebula-tools');
  const focusEl = document.getElementById('nebula-focus');
  const spaceEl = document.getElementById('nebula-space');

  if (!buttonContainer || !titleEl || !taglineEl || !languagesEl || !toolsEl || !focusEl || !spaceEl) {
    return;
  }

  buttonContainer.innerHTML = '';
  data.forEach(entry => {
    const btn = document.createElement('button');
    btn.textContent = entry.label;
    btn.dataset.target = entry.id;
    buttonContainer.appendChild(btn);
  });

  const buttons = Array.from(buttonContainer.querySelectorAll('button'));
  let activeId = data[0]?.id;

  const renderNebula = (id) => {
    const entry = data.find(item => item.id === id) || data[0];
    if (!entry) return;
    activeId = entry.id;
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.target === entry.id));

    titleEl.textContent = entry.title;
    taglineEl.textContent = entry.tagline;

    populateTags(languagesEl, entry.languages);
    populateTags(toolsEl, entry.tools);
    populateTags(focusEl, entry.focus);

    renderOrbit(spaceEl, entry.orbits);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => renderNebula(btn.dataset.target));
  });

  renderNebula(activeId);
}

function populateTags(container, items) {
  container.innerHTML = '';
  items.forEach(item => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = item;
    container.appendChild(tag);
  });
}

function renderOrbit(container, orbits) {
  container.innerHTML = '';
  if (!Array.isArray(orbits)) return;

  orbits.forEach((orbit, index) => {
    const ring = document.createElement('div');
    ring.className = 'orbital';
    ring.style.width = `${orbit.radius}px`;
    ring.style.height = `${orbit.radius}px`;
    ring.style.top = '50%';
    ring.style.left = '50%';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.animationDuration = `${18 - index * 2}s`;

    const radius = orbit.radius / 2;
    orbit.items.forEach((item, itemIndex) => {
      const node = document.createElement('span');
      node.textContent = item;
      const angle = (360 / orbit.items.length) * itemIndex;
      node.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
      ring.appendChild(node);
    });

    container.appendChild(ring);
  });
}

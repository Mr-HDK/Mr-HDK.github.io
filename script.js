// script.js
// Powers the portfolio interactions: theme & language toggles,
// animated stats, and the Skill Nebula explorer.

let currentLanguage = localStorage.getItem('language') || 'en';
let nebulaController = null;

const nebulaData = [
  {
    id: 'scripting',
    label: {
      en: 'Scripting Ops Lattice',
      fr: 'Matrice des scripts ops'
    },
    title: {
      en: 'Scripting Ops Lattice',
      fr: 'Matrice des scripts ops'
    },
    tagline: {
      en: 'Rapid-fire automation across SOC, QA, audits, and cloud runbooks with reusable command-line spellbooks.',
      fr: 'Automatisation éclair pour les SOC, l’audit, la QA et le cloud grâce à des grimoires de commandes réutilisables.'
    },
    languages: ['Python', 'Bash', 'PowerShell', 'Go', 'JavaScript', 'TypeScript', 'SQL', 'Terraform', 'YAML', 'Assembler'],
    tools: ['CLI Tooling', 'Git', 'tmux', 'Ansible', 'Vagrant', 'Terraform', 'jq', 'Automation Libraries', 'API Clients'],
    focus: {
      en: ['Incident Scripts', 'IaC Modules', 'Test Harnesses', 'Data Pipelines', 'Workflow Bots'],
      fr: ['Scripts d’incident', 'Modules IaC', 'Harnais de tests', 'Pipelines de données', 'Bots opérationnels']
    },
    orbits: {
      en: [
        { radius: 220, items: ['Purple Team Scripts', 'Forensic Parsers', 'Reusable Snippets', 'Secrets Hygiene'] },
        { radius: 160, items: ['Pipeline Hooks', 'ChatOps', 'Automation Dashboards', 'API Explorers'] },
        { radius: 100, items: ['CLI UX', 'Documentation', 'Reusable Templates', 'Quick Starts'] }
      ],
      fr: [
        { radius: 220, items: ['Scripts purple team', 'Analyseurs forensics', 'Snippets réutilisables', 'Hygiène des secrets'] },
        { radius: 160, items: ['Hooks pipeline', 'ChatOps', 'Tableaux de bord automatisés', 'Explorateurs d’API'] },
        { radius: 100, items: ['UX CLI', 'Documentation', 'Modèles réutilisables', 'Démarrages rapides'] }
      ]
    }
  },
  {
    id: 'cyber',
    label: {
      en: 'Cyber Defense Nebula',
      fr: 'Nébuleuse cyberdéfense'
    },
    title: {
      en: 'Cyber Defense Nebula',
      fr: 'Nébuleuse cyberdéfense'
    },
    tagline: {
      en: 'Orchestrating blue, red, and hardware security missions to keep infrastructures resilient.',
      fr: 'Orchestrer les missions blue, red et hardware pour garder les infrastructures résilientes.'
    },
    languages: ['Python', 'Bash', 'PowerShell', 'SQL'],
    tools: ['Burp Suite', 'Metasploit', 'Nmap', 'Nessus', 'Hydra', 'John the Ripper', 'SQLmap', 'NoSQLmap', 'Acunetix', 'Nikto', 'Aircrack-ng', 'Wazuh', 'Splunk', 'Snort', 'OpenVAS', 'MITRE ATT&CK', 'Autopsy', 'Volatility'],
    focus: {
      en: ['Incident Response', 'Threat Hunting', 'Digital Forensics', 'Purple Teaming', 'Hardware Security'],
      fr: ['Réponse à incident', 'Threat hunting', 'Forensique numérique', 'Purple teaming', 'Sécurité hardware']
    },
    orbits: {
      en: [
        { radius: 220, items: ['SOC Playbooks', 'Risk Analysis', 'Policy Enforcement', 'Asset Inventory'] },
        { radius: 160, items: ['Pentesting', 'SIEM Dashboards', 'Attack Simulation', 'Forensic Imaging'] },
        { radius: 100, items: ['Zero Trust', 'CTF Mastery', 'Security Awareness', 'Hardware Hardening'] }
      ],
      fr: [
        { radius: 220, items: ['Playbooks SOC', 'Analyse de risque', 'Application des politiques', 'Inventaire des actifs'] },
        { radius: 160, items: ['Pentest', 'Tableaux SIEM', 'Simulation d’attaque', 'Acquisition forensique'] },
        { radius: 100, items: ['Zero Trust', 'Maîtrise CTF', 'Sensibilisation sécurité', 'Durcissement hardware'] }
      ]
    }
  },
  {
    id: 'devsecops',
    label: {
      en: 'DevSecOps Orbit',
      fr: 'Orbites DevSecOps'
    },
    title: {
      en: 'DevSecOps Orbit',
      fr: 'Orbites DevSecOps'
    },
    tagline: {
      en: 'Automating guardrails across code, pipelines, cloud, and observability platforms.',
      fr: 'Automatiser les garde-fous du code, des pipelines, du cloud et de l’observabilité.'
    },
    languages: ['Python', 'Go', 'YAML', 'Terraform', 'Shell'],
    tools: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'Ansible', 'Vagrant', 'Jenkins', 'GitHub Actions', 'SonarQube', 'Grafana', 'ArgoCD', 'Snyk', 'Jira'],
    focus: {
      en: ['Infrastructure as Code', 'Continuous Delivery', 'Observability', 'Security Automation', 'Platform SRE'],
      fr: ['Infrastructure as Code', 'Livraison continue', 'Observabilité', 'Automatisation sécurité', 'Plateforme SRE']
    },
    orbits: {
      en: [
        { radius: 220, items: ['AKS', 'Terraform Modules', 'Azure DevOps', 'Pipeline Governance'] },
        { radius: 160, items: ['Container Hardening', 'Policy as Code', 'GitOps', 'Service Mesh'] },
        { radius: 100, items: ['Dashboards', 'Alerting', 'Chaos Drills', 'Cost Guardrails'] }
      ],
      fr: [
        { radius: 220, items: ['AKS', 'Modules Terraform', 'Azure DevOps', 'Gouvernance pipeline'] },
        { radius: 160, items: ['Durcissement conteneurs', 'Policy as Code', 'GitOps', 'Service mesh'] },
        { radius: 100, items: ['Dashboards', 'Alerte', 'Exercices de chaos', 'Garde-fous coûts'] }
      ]
    }
  },
  {
    id: 'quality',
    label: {
      en: 'Quality Engineering Lab',
      fr: 'Laboratoire QA'
    },
    title: {
      en: 'Quality Engineering Lab',
      fr: 'Laboratoire QA'
    },
    tagline: {
      en: 'Building automation ecosystems that elevate coverage, performance, and developer confidence.',
      fr: 'Construire des écosystèmes d’automatisation qui boostent couverture, performance et confiance développeur.'
    },
    languages: ['Python', 'TypeScript', 'Java', 'C#', 'C'],
    tools: ['Cypress', 'Selenium', 'JMeter', 'BlazeMeter', 'Robot Framework', 'Ceedling', 'GCOV', 'Postman', 'SOAP UI', 'Azure DevOps', 'Snyk', 'TestRail'],
    focus: {
      en: ['TDD & BDD', 'Performance Testing', 'Coverage Analytics', 'QA Coaching', 'Shift-Left Security'],
      fr: ['TDD & BDD', 'Tests de performance', 'Analyse de couverture', 'Coaching QA', 'Sécurité shift-left']
    },
    orbits: {
      en: [
        { radius: 220, items: ['Test Strategy', 'Shift-Left', 'Release Quality Gates', 'Mentoring'] },
        { radius: 160, items: ['CI Integration', 'Synthetic Monitoring', 'Security Scans', 'Documentation'] },
        { radius: 100, items: ['Workshops', 'Edge Cases', 'Memory Profiling', 'Scripting Accelerators'] }
      ],
      fr: [
        { radius: 220, items: ['Stratégie de test', 'Shift-left', 'Gates de qualité', 'Mentorat'] },
        { radius: 160, items: ['Intégration CI', 'Monitoring synthétique', 'Scans sécurité', 'Documentation'] },
        { radius: 100, items: ['Ateliers', 'Cas limites', 'Profiling mémoire', 'Accélérateurs de scripts'] }
      ]
    }
  },
  {
    id: 'engineering',
    label: {
      en: 'Embedded & Hardware Forge',
      fr: 'Forge embarquée & hardware'
    },
    title: {
      en: 'Embedded & Hardware Forge',
      fr: 'Forge embarquée & hardware'
    },
    tagline: {
      en: 'Designing IoT-native systems with secure firmware, telemetry, and field-ready dashboards.',
      fr: 'Concevoir des systèmes IoT natifs avec firmware sécurisé, télémétrie et tableaux prêts pour le terrain.'
    },
    languages: ['C', 'C++', 'Python', 'Lua', 'Assembler'],
    tools: ['STM32', 'ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'LoRa', 'Hardware Debuggers', 'VHDL', 'Grafcet', 'FreeRTOS', 'Logic Analysers'],
    focus: {
      en: ['Real-time Systems', 'IoT Telemetry', 'Hardware Security', 'Edge Analytics', 'Field Deployments'],
      fr: ['Systèmes temps réel', 'Télémétrie IoT', 'Sécurité hardware', 'Analytique edge', 'Déploiements terrain']
    },
    orbits: {
      en: [
        { radius: 220, items: ['Sensor Networks', 'Secure Boot', 'PCB Bring-up', 'Power Profiling'] },
        { radius: 160, items: ['Firmware Optimisation', 'Field Updaters', 'Secure Provisioning', 'Data Streaming'] },
        { radius: 100, items: ['Red Team IoT', 'Protocol Fuzzing', 'Threat Modelling', 'Lab Automation'] }
      ],
      fr: [
        { radius: 220, items: ['Réseaux de capteurs', 'Secure boot', 'Mise sous tension PCB', 'Profilage énergétique'] },
        { radius: 160, items: ['Optimisation firmware', 'Mises à jour terrain', 'Provisionnement sécurisé', 'Streaming de données'] },
        { radius: 100, items: ['Red team IoT', 'Fuzzing protocoles', 'Modélisation des menaces', 'Automatisation labo'] }
      ]
    }
  },
  {
    id: 'intelligence',
    label: {
      en: 'AI & Research Constellation',
      fr: 'Constellation IA & recherche'
    },
    title: {
      en: 'AI & Research Constellation',
      fr: 'Constellation IA & recherche'
    },
    tagline: {
      en: 'Experimenting with machine intelligence to augment security analytics and operational foresight.',
      fr: 'Expérimenter l’IA pour augmenter les analyses de sécurité et la prévision opérationnelle.'
    },
    languages: ['Python', 'SQL'],
    tools: ['PyTorch', 'NVIDIA SDKs', 'Pandas', 'Scikit-learn', 'Splunk SOAR', 'OpenWebUI', 'LLaMA', 'RAG Pipelines'],
    focus: {
      en: ['Threat Intelligence', 'Predictive Analytics', 'NLP Applications', 'Data Storytelling', 'RAG Engineering'],
      fr: ['Threat intelligence', 'Analytique prédictive', 'Applications NLP', 'Data storytelling', 'Ingénierie RAG']
    },
    orbits: {
      en: [
        { radius: 220, items: ['Transformer Apps', 'ML Pipelines', 'Data Labelling', 'Model Ops'] },
        { radius: 160, items: ['Graph Insights', 'Feature Engineering', 'Notebook Automation', 'Anomaly Scoring'] },
        { radius: 100, items: ['Ethical AI', 'Experiment Tracking', 'Knowledge Sharing', 'Prompt Libraries'] }
      ],
      fr: [
        { radius: 220, items: ['Apps transformer', 'Pipelines ML', 'Étiquetage données', 'MLOps'] },
        { radius: 160, items: ['Analyses de graphes', 'Feature engineering', 'Automatisation notebooks', 'Scoring anomalies'] },
        { radius: 100, items: ['IA éthique', 'Suivi d’expériences', 'Partage de connaissances', 'Bibliothèques de prompts'] }
      ]
    }
  },
  {
    id: 'fullstack',
    label: {
      en: 'Full-Stack Vibe Lab',
      fr: 'Lab full-stack vibes'
    },
    title: {
      en: 'Full-Stack Vibe Lab',
      fr: 'Lab full-stack vibes'
    },
    tagline: {
      en: 'Pairing vibe coding energy with secure, joyful experiences from CMS to cloud-native APIs.',
      fr: 'Allier vibe coding et expériences sécurisées, des CMS aux API cloud-native.'
    },
    languages: ['HTML', 'CSS', 'TypeScript', 'JavaScript', 'PHP', 'Python', 'SQL'],
    tools: ['Angular', 'Node.js', 'Express.js', 'Firebase', 'MongoDB', 'MySQL', 'PostgreSQL', 'WordPress', 'Headless CMS', 'Flutter', 'Android Studio', 'Cypress', 'Postman'],
    focus: {
      en: ['Responsive UX', 'API Design', 'CMS Engineering', 'Realtime Dashboards', 'Secure SDLC'],
      fr: ['UX responsive', 'Design d’API', 'Ingénierie CMS', 'Tableaux temps réel', 'SDLC sécurisé']
    },
    orbits: {
      en: [
        { radius: 220, items: ['Component Systems', 'Design Tokens', 'SPA Architecture', 'SEO Optimisation'] },
        { radius: 160, items: ['REST APIs', 'Realtime Updates', 'Cloud Functions', 'Content Strategy'] },
        { radius: 100, items: ['Accessibility', 'DX Tooling', 'Pair Programming', 'Vibe Coding'] }
      ],
      fr: [
        { radius: 220, items: ['Systèmes de composants', 'Design tokens', 'Architecture SPA', 'Optimisation SEO'] },
        { radius: 160, items: ['APIs REST', 'Mises à jour temps réel', 'Fonctions cloud', 'Stratégie de contenu'] },
        { radius: 100, items: ['Accessibilité', 'Outils DX', 'Pair programming', 'Vibe coding'] }
      ]
    }
  }
];

const translations = {
  en: {},
  fr: {
    'controls.theme': 'Changer&nbsp;de&nbsp;mode',
    'hero.badge1': 'Cyber&nbsp;Défense',
    'hero.badge2': 'Automatisation&nbsp;QA',
    'hero.badge3': 'Sécurité&nbsp;Embarquée',
    'hero.location': 'Tunisie · Ouvert au remote',
    'hero.firstName': 'Youssef',
    'hero.lastName': 'Haddouk',
    'hero.subtitle': 'Stratège cybersécurité, expert en audit &amp; conseil, spécialiste QA automation et sécurité IoT/embarqué.',
    'hero.role1': 'Blue &amp; Purple Teaming',
    'hero.role2': 'Audit &amp; Conseil cybersécurité',
    'hero.role3': 'Durcissement matériel &amp; IoT',
    'hero.role4': 'Full&nbsp;Stack&nbsp;Vibe&nbsp;Coding',
    'hero.bio': 'Je combine pilotage SOC, cliniques de conseil cybersécurité et ingénierie orientée hardware pour sécuriser les plateformes de bout en bout. Des pipelines Azure aux labs STM32, chaque mission conjugue programmes d’audit, scripting, résilience et accompagnement.',
    'hero.ctaPrimary': 'Entrer&nbsp;dans&nbsp;la&nbsp;mission',
    'hero.ctaSecondary': 'Voir&nbsp;les&nbsp;labs&nbsp;code',
    'hero.highlight1': 'Top 0,1 % · TryHackMe',
    'hero.highlight2': 'Missions d’audit &amp; de conseil',
    'hero.highlight3': 'Bâtisseur SOC &amp; DevSecOps',
    'hero.highlight4': 'Assembleur &amp; 12+ langages de scripts',
    'nav.mission': 'Mission',
    'nav.experience': 'Expérience',
    'nav.skills': 'Constellations',
    'nav.projects': 'Projets',
    'nav.highlights': 'Succès',
    'nav.certifications': 'Certifications',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'mission.title': 'Mission&nbsp;Deck',
    'mission.body': 'Armé d’un Master en sécurité des systèmes d’information et d’un leadership terrain en SOC, audit, DevSecOps et automatisation, j’aide les équipes à livrer plus vite des produits résilients. Mon terrain de jeu s’étend des flottes Kubernetes Azure aux cartes STM32 pour concevoir des expériences sécurisées, observables et humaines.',
    'mission.stat1': 'Outils de sécurité maîtrisés',
    'mission.stat2': 'Langages, scripts &amp; automatisations',
    'mission.stat3': 'Domaines livrés de bout en bout',
    'mission.stat4': 'Plateformes Cloud &amp; DevOps déployées',
    'mission.pill1': 'Réponse à incident',
    'mission.pill2': 'Stratégie d’automatisation QA',
    'mission.pill3': 'Infrastructure as Code',
    'mission.pill4': 'R&amp;D embarqué &amp; IoT',
    'mission.pill5': 'Sécurité hardware',
    'mission.pill6': 'Audits de sécurité',
    'experience.title': 'Expérience &amp;&nbsp;enseignement',
    'experience.oss.dates': 'Février&nbsp;2025&nbsp;–&nbsp;Présent',
    'experience.oss.title': 'Observatoire du Sahara et du Sahel (OSS)',
    'experience.oss.role': 'Responsable sécurité des SI',
    'experience.oss.point1': 'Durcissement de l’infrastructure, réponse à incident et forensique pour des environnements critiques.',
    'experience.oss.point2': 'Pentests, audits cyber et analyses de risques tout en pilotant les politiques et la gestion d’actifs.',
    'experience.oss.point3': 'Sensibilisation cybersécurité via des cliniques conseil pour dirigeants et équipes delivery.',
    'experience.isi.dates': 'Février&nbsp;2024&nbsp;–&nbsp;Août&nbsp;2024',
    'experience.isi.title': 'Institut Supérieur d’Informatique (ISI)',
    'experience.isi.role': 'Chargé de cours · Test automation',
    'experience.isi.point1': 'Enseignement de Ceedling, GCOV, Robot Framework et des pratiques TDD aux promotions d’ingénieurs.',
    'experience.isi.point2': 'Ateliers sur l’analyse de couverture, la détection de cas limites et la gestion des débordements mémoire.',
    'experience.isi.point3': 'Mentorat de projets QA avec stratégies d’automatisation prêtes pour l’industrie et scripts accélérateurs.',
    'experience.datahorizon.dates': 'Février&nbsp;2024&nbsp;–&nbsp;Février&nbsp;2025',
    'experience.datahorizon.title': 'DATAHORIZON',
    'experience.datahorizon.role': 'Ingénieur QA automation',
    'experience.datahorizon.point1': 'Conception de frameworks Cypress, Selenium et JMeter intégrés aux pipelines Azure DevOps.',
    'experience.datahorizon.point2': 'Augmentation de la couverture via Snyk et Acunetix intégrés aux garde-fous SSDLC.',
    'experience.datahorizon.point3': 'Coaching QA, revues de code et playbooks de documentation à destination des équipes.',
    'experience.aptyx.dates': 'Février&nbsp;2022&nbsp;–&nbsp;Juillet&nbsp;2022',
    'experience.aptyx.title': 'APTYX',
    'experience.aptyx.role': 'Ingénieur embarqué &amp; mobile',
    'experience.aptyx.point1': 'Contrôleur d’irrigation temps réel sur STM32 avec visualisation Android.',
    'experience.aptyx.point2': 'Télémétrie via Firebase avec alertes en direct et sécurité matérielle.',
    'experience.aptyx.point3': 'Optimisation du code embarqué pour garantir performance et maintenabilité.',
    'experience.freelance.dates': 'Janvier&nbsp;2020&nbsp;–&nbsp;Septembre&nbsp;2023',
    'experience.freelance.title': 'Freelance · Fiverr',
    'experience.freelance.role': 'Développeur web &amp; consultant sécurité',
    'experience.freelance.point1': 'Expériences web performantes avec CMS, accessibilité et UX soignée.',
    'experience.freelance.point2': 'Audits sécurité, tests OWASP et plans de remédiation pour les clients.',
    'experience.freelance.point3': 'Maintenance long terme, optimisation et coaching cybersécurité.',
    'experience.educationTitle': 'Tremplin académique',
    'experience.educationBody': 'Master en sécurité des systèmes d’information (2024) et licence en systèmes embarqués (2022) — tous deux à l’Institut Supérieur d’Informatique (ISI) — fondent mon approche transverse sécurité, logiciel et hardware.',
    'skills.title': 'Constellation de compétences',
    'skills.body': 'Choisissez une constellation pour explorer comment scripting, sécurité hardware, IoT et full-stack se croisent sur les missions.',
    'skills.languages': 'Langages &amp; scripts',
    'skills.tools': 'Arsenal d’outils',
    'skills.focus': 'Focus mission',
    'projects.title': 'Projets',
    'projects.aks.title': 'Migration DevSecOps vers AKS',
    'projects.aks.body': 'Conteneurisation d’une solution 3-tiers, optimisation des Dockerfiles et infrastructure codifiée avec Terraform. Pipelines Azure DevOps reliés à ArgoCD pour la livraison continue et les contrôles de sécurité.',
    'projects.aks.cta': 'Explorer les dépôts',
    'projects.soc.title': 'SOC de labo maison',
    'projects.soc.body': 'Terrain défensif combinant Snort IDS/IPS, honeypots Cowrie, tableaux Splunk et durcissement SSH pour expérimenter la détection.',
    'projects.soc.cta': 'Lire les notes de lab',
    'projects.tls.title': 'ETL des flux TLS',
    'projects.tls.body': 'Pipeline Bash avec Tshark &amp; SplitCap pour extraire l’intelligence des sessions TLS en CSV pour la détection d’anomalies.',
    'projects.tls.badge': 'Shell · Data Engineering',
    'projects.irrigation.title': 'Irrigation intelligente',
    'projects.irrigation.body': 'Contrôle d’irrigation sur STM32 avec visualisation Android et synchronisation Firebase pour un UX embarqué résilient.',
    'projects.irrigation.badge': 'STM32 · Android · Firebase',
    'projects.pixel.title': 'Bot d’automatisation pixel',
    'projects.pixel.body': 'Automatisation créative avec PyAutoGUI, combinant vision et macros pour booster la productivité.',
    'projects.pixel.badge': 'Python · Automation',
    'projects.shortener.title': 'Raccourcisseur d’URL Golang',
    'projects.shortener.body': 'Service de liens courts performant et sécurisé avec observabilité et design API-first.',
    'projects.shortener.badge': 'Go · REST · Sécurité',
    'achievements.title': 'Succès &amp; impact',
    'achievements.ctf.title': 'Vanguard CTF',
    'achievements.ctf.body': 'Top <strong>0,1&nbsp;%</strong> mondial sur TryHackMe grâce à une pratique offensive et défensive continue.',
    'achievements.hackathon.title': 'Lauréat hackathon',
    'achievements.hackathon.body': '3<sup>e</sup> place au hackathon 24 Heures (SPOT) avec une plateforme d’alerte médicaments résiliente.',
    'achievements.devsecops.title': 'Accélérateur DevSecOps',
    'achievements.devsecops.body': 'Intégration de Snyk, Acunetix et IaC dans les pipelines pour renforcer le SSDLC sans freiner l’innovation.',
    'achievements.soc.title': 'Explorateur SOC',
    'achievements.soc.body': 'SOC maison avec Snort, Cowrie et Splunk pour créer des détections sur mesure et accélérer la réponse.',
    'tools.title': 'Labs interactifs',
    'tools.body': 'Outils pratiques créés pour l’analyse quotidienne, l’audit et l’expérimentation.',
    'tools.base64.title': 'Convertisseur Base64',
    'tools.base64.body': 'Encoder ou décoder du texte Base64 pour inspecter rapidement des charges.',
    'tools.hash.title': 'Générateur de hash',
    'tools.hash.body': 'Créer des hash SHA-256 pour vérifications ou tests de credentials.',
    'tools.jwt.title': 'Inspecteur JWT',
    'tools.jwt.body': 'Décoder les JSON Web Tokens pour analyser entêtes, claims et contexte de signature.',
    'tools.uuid.title': 'Forge UUID',
    'tools.uuid.body': 'Générer des séries de UUIDv4 pour les labs et jeux de tests.',
    'tools.password.title': 'Pulse mot de passe',
    'tools.password.body': 'Mesurer l’entropie, les indices et les pistes d’amélioration instantanément.',
    'tools.cidr.title': 'Navigateur CIDR',
    'tools.cidr.body': 'Cartographier plages réseau, capacité hôte et diffusion depuis un bloc CIDR.',
    'tools.url.title': 'Encodeur d’URL',
    'tools.url.body': 'Encoder ou décoder des URLs pour déboguer webhooks et charges HTTP.',
    'tools.use': 'Lancer',
    'certs.title': 'Certifications &amp; signaux d’apprentissage',
    'certs.body': 'Une veille continue pour garder mon radar affûté. Voici quelques validations récentes.',
    'certs.iso.title': 'Auditeur principal ISO 27001',
    'certs.iso.body': 'PECB · 2025',
    'certs.early.title': 'Conception de systèmes d’alerte précoce',
    'certs.early.body': 'BRLi · 2025',
    'certs.nlp.title': 'Applications NLP à base de transformers',
    'certs.nlp.body': 'NVIDIA · 2024',
    'certs.sc900.title': 'Fondamentaux SC-900',
    'certs.sc900.body': 'Microsoft · 2024',
    'certs.devnet.title': 'DevNet Associate',
    'certs.devnet.body': 'Cisco · 2024',
    'certs.cloud.title': 'Cybersécurité &amp; cloud computing',
    'certs.cloud.body': 'NASBA · 2023',
    'certs.crypto.title': 'Cryptographie &amp; sécurité réseau',
    'certs.crypto.body': 'IIBA · 2023',
    'blog.title': 'Blog',
    'blog.body': 'Instantanés de reverse engineering, veille menace et expériences d’automatisation.',
    'blog.post1.tag': 'Veille menace',
    'blog.post1.title': 'Scanned and Scammed : au cœur d’une attaque par QR code',
    'blog.post1.body': 'Dissection d’un leurre d’ingénierie sociale exploitant les QR codes tout en évitant les contrôles superficiels.',
    'blog.post1.cta': 'Lire l’enquête <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    'blog.post2.tag': 'Lab malware',
    'blog.post2.title': 'Analyse d’une attaque captive reCAPTCHA',
    'blog.post2.body': 'Lever le voile sur les couches d’obfuscation d’une campagne de malware persistante.',
    'blog.post2.cta': 'Voir l’analyse <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    'blog.post3.tag': 'Ops CTF',
    'blog.post3.title': 'Write-up TryHackMe : Chrome',
    'blog.post3.body': 'Méthodologie pas à pas pour résoudre la box Chrome et affiner les exploits navigateur.',
    'blog.post3.cta': 'Lire le walkthrough <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    'blog.post4.tag': 'Vulnérabilité',
    'blog.post4.title': 'Alerte critique : CVE-2024-21413 sur Outlook',
    'blog.post4.body': 'Analyse des vecteurs d’exploitation et des mesures de durcissement pour cette faille majeure.',
    'blog.post4.cta': 'Consulter l’alerte <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    'contact.title': 'Entrer en contact',
    'contact.body': 'Une mission, un audit ou un conseil cybersécurité ? Construisons quelque chose de résilient.',
    'contact.card1.title': 'Mission control',
    'contact.card1.body': 'Co-concevoir des systèmes résilients, des plans d’automatisation ou des upgrades sécurité embarquée.',
    'contact.card1.cta': '<i class="fa-solid fa-calendar-check"></i> Planifier une session',
    'contact.card2.title': 'Connecter &amp; collaborer',
    'contact.card2.body': 'Alignement sur initiatives SOC, programmes d’audit, parcours DevSecOps ou accélérateurs QA.',
    'contact.card2.cta': '<i class="fa-brands fa-linkedin"></i> LinkedIn',
    'contact.card3.title': 'Explorer les labs',
    'contact.card3.body': 'Découvrir les expériences GitHub, prototypes vibe coding et kits d’outils.',
    'contact.card3.cta': '<i class="fa-brands fa-github"></i> GitHub',
    'contact.card4.title': 'Lire les notes de terrain',
    'contact.card4.body': 'Suivre les journaux de reverse, les articles de veille et les retours pédagogiques.',
    'contact.card4.cta': '<i class="fa-brands fa-medium"></i> Medium',
    'contact.cta': '<i class="fa-solid fa-paper-plane"></i> Envoyer un message LinkedIn',
    'footer.name': 'Mr&nbsp;HDK',
    'footer.built': 'Créé avec'
  }
};

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
  const sunIcon = toggleButton ? toggleButton.querySelector('.sun-icon') : null;
  const moonIcon = toggleButton ? toggleButton.querySelector('.moon-icon') : null;

  const setThemeIcon = () => {
    if (!sunIcon || !moonIcon) return;
    const isDark = document.body.classList.contains('dark');
    sunIcon.setAttribute('aria-hidden', String(!isDark));
    moonIcon.setAttribute('aria-hidden', String(isDark));
  };

  setThemeIcon();

  if (toggleButton) {
    toggleButton.setAttribute('aria-pressed', String(document.body.classList.contains('dark')));
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      toggleButton.classList.toggle('rotate');
      setThemeIcon();
      toggleButton.setAttribute('aria-pressed', String(newTheme === 'dark'));
    });
  }

  const translatableElements = document.querySelectorAll('[data-i18n]');
  translatableElements.forEach(el => {
    const key = el.dataset.i18n;
    if (key && !translations.en[key]) {
      translations.en[key] = el.innerHTML;
    }
  });

  const applyTranslations = (language) => {
    translatableElements.forEach(el => {
      const key = el.dataset.i18n;
      if (!key) return;
      const content = translations[language]?.[key] ?? translations.en[key];
      if (content !== undefined) {
        el.innerHTML = content;
      }
    });
  };

  const languageToggle = document.getElementById('language-toggle');
  const languageToggleLabel = document.getElementById('language-toggle-label');

  const updateLanguageUI = () => {
    document.body.dataset.language = currentLanguage;
    document.documentElement.lang = currentLanguage === 'fr' ? 'fr' : 'en';
    if (languageToggleLabel) {
      languageToggleLabel.textContent = currentLanguage === 'en' ? 'FR' : 'EN';
    }
    if (languageToggle) {
      languageToggle.setAttribute(
        'aria-label',
        currentLanguage === 'en' ? 'Basculer vers le français' : 'Switch to English'
      );
      languageToggle.setAttribute('aria-pressed', String(currentLanguage === 'fr'));
    }
  };

  const setLanguage = (language) => {
    currentLanguage = language;
    localStorage.setItem('language', language);
    applyTranslations(language);
    updateLanguageUI();
    if (nebulaController) {
      nebulaController.refreshLanguage();
    }
  };

  updateLanguageUI();
  applyTranslations('en');
  if (currentLanguage !== 'en') {
    setLanguage(currentLanguage);
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      const nextLanguage = currentLanguage === 'en' ? 'fr' : 'en';
      setLanguage(nextLanguage);
    });
  }

  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => sectionObserver.observe(section));

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

  nebulaController = initNebula();
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
        num.textContent = `${target}${target >= 10 ? '+' : ''}`;
        num.dataset.animated = 'true';
        return;
      }
      num.textContent = current.toString();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function initNebula() {
  const buttonContainer = document.getElementById('nebula-buttons');
  const titleEl = document.getElementById('nebula-title');
  const taglineEl = document.getElementById('nebula-tagline');
  const languagesEl = document.getElementById('nebula-languages');
  const toolsEl = document.getElementById('nebula-tools');
  const focusEl = document.getElementById('nebula-focus');
  const spaceEl = document.getElementById('nebula-space');

  if (!buttonContainer || !titleEl || !taglineEl || !languagesEl || !toolsEl || !focusEl || !spaceEl) {
    return { refreshLanguage: () => {} };
  }

  let activeId = nebulaData[0]?.id;

  const createButtons = () => {
    buttonContainer.innerHTML = '';
    nebulaData.forEach(entry => {
      const btn = document.createElement('button');
      btn.dataset.target = entry.id;
      btn.type = 'button';
      btn.textContent = entry.label[currentLanguage] || entry.label.en;
      buttonContainer.appendChild(btn);
    });
  };

  const populateTags = (container, items) => {
    container.innerHTML = '';
    items.forEach(item => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = item;
      container.appendChild(tag);
    });
  };

  const renderOrbit = (container, orbits) => {
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
  };

  const renderNebula = (id) => {
    const entry = nebulaData.find(item => item.id === id) || nebulaData[0];
    if (!entry) return;
    activeId = entry.id;

    const buttons = Array.from(buttonContainer.querySelectorAll('button'));
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === entry.id);
      const dataEntry = nebulaData.find(item => item.id === btn.dataset.target);
      if (dataEntry) {
        btn.textContent = dataEntry.label[currentLanguage] || dataEntry.label.en;
      }
    });

    titleEl.textContent = entry.title[currentLanguage] || entry.title.en;
    taglineEl.textContent = entry.tagline[currentLanguage] || entry.tagline.en;

    populateTags(languagesEl, entry.languages);
    populateTags(toolsEl, entry.tools);
    populateTags(focusEl, entry.focus[currentLanguage] || entry.focus.en);

    renderOrbit(spaceEl, entry.orbits[currentLanguage] || entry.orbits.en);
  };

  const handleButtonClick = (event) => {
    const target = event.currentTarget.dataset.target;
    renderNebula(target);
  };

  const attachEvents = () => {
    const buttons = Array.from(buttonContainer.querySelectorAll('button'));
    buttons.forEach(btn => {
      btn.removeEventListener('click', handleButtonClick);
      btn.addEventListener('click', handleButtonClick);
    });
  };

  createButtons();
  attachEvents();
  renderNebula(activeId);

  return {
    refreshLanguage: () => {
      createButtons();
      attachEvents();
      renderNebula(activeId);
    }
  };
}

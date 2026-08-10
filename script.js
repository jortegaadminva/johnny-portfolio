/* =========================================================
   Johnny M. Ortega Jr. — portfolio scripts
   Vanilla JS, no dependencies.
   ========================================================= */

(function () {
  'use strict';

  /* -------------------------------------------------------
     1. Tools & platforms
     Primary list = what clients actually care about.
     Technical list = collapsed behind a disclosure button.
     ------------------------------------------------------- */

  const PRIMARY_TOOLS = [
    {
      group: 'E-commerce & marketplace',
      tools: [
        { name: 'Etsy Seller',         initials: 'Et', color: '#F1641E' },
        { name: 'eBay Seller Hub',     initials: 'eB', color: '#E53238' },
        { name: 'WooCommerce',         initials: 'Wc', color: '#7F54B3' },
        { name: 'WordPress',           initials: 'Wp', color: '#21759B' },
        { name: 'ShipStation',         initials: 'Sh', color: '#2C3E50' },
        { name: 'Alura',               initials: 'Al', color: '#2E7D6E' },
        { name: 'EtsyHunt',            initials: 'Eh', color: '#F2711C' },
        { name: '1688',                initials: '16', color: '#FF6A00' },
        { name: 'AliExpress',          initials: 'Ae', color: '#E62E04' },
        { name: 'Elementor',           initials: 'El', color: '#92003B' }
      ],
      secondary: [
        {
          label: 'Additional platform experience',
          tools: [
            { name: 'Amazon Seller Central', initials: 'Am', color: '#232F3E' },
            { name: 'Walmart Marketplace', initials: 'Wm', color: '#0071CE' },
            { name: 'Shopee',              initials: 'Sp', color: '#EE4D2D' },
            { name: 'Lazada',              initials: 'Lz', color: '#0F146D' }
          ]
        }
      ]
    },
    {
      group: 'Operations & productivity',
      tools: [
        { name: 'Microsoft Excel',  initials: 'Ex', color: '#217346' },
        { name: 'Google Sheets',    initials: 'Gs', color: '#0F9D58' },
        { name: 'Google Workspace', initials: 'Gw', color: '#4285F4' },
        { name: 'Microsoft 365',    initials: 'Ms', color: '#D83B01' },
        { name: 'Monday.com',       initials: 'Mo', color: '#FF3D57' },
        { name: 'Trello',           initials: 'Tr', color: '#0079BF' },
        { name: 'Slack',            initials: 'Sl', color: '#4A154B' }
      ],
      secondary: [
        {
          label: 'Additional business tools',
          tools: [
            { name: 'HubSpot CRM',      initials: 'Hs', color: '#FF7A59' },
            { name: 'Zoom',             initials: 'Zm', color: '#2D8CFF' },
            { name: 'Mailchimp',        initials: 'Mc', color: '#FFE01B', dark: true }
          ]
        }
      ]
    },
    {
      group: 'AI & creative',
      tools: [
        { name: 'Canva',              initials: 'Cv', color: '#00C4CC' },
        { name: 'Adobe Photoshop',    initials: 'Ps', color: '#31A8FF' },
        { name: 'ChatGPT',            initials: 'Gp', color: '#10A37F' },
        { name: 'Google AI Studio',   initials: 'Ga', color: '#1A73E8' }
      ],
      secondary: [
        {
          label: 'Additional creative tools',
          tools: [
            { name: 'Adobe Premiere Pro', initials: 'Pr', color: '#00005B' },
            { name: 'CapCut',             initials: 'Cc', color: '#000000' }
          ]
        },
        {
          label: 'Additional AI tools',
          tools: [
            { name: 'Claude',             initials: 'Cl', color: '#D97757' },
            { name: 'Google Gemini',      initials: 'Ge', color: '#8E75B2' },
            { name: 'Microsoft Copilot',  initials: 'Cp', color: '#185ABD' }
          ]
        }
      ]
    }
  ];

  const TECHNICAL_TOOLS = [
    {
      group: 'IT infrastructure & network support',
      tools: [
        { name: 'Windows',     initials: 'Wn', color: '#00A4EF' },
        { name: 'Linux',       initials: 'Lx', color: '#FCC624', dark: true },
        { name: 'RingCentral', initials: 'Rc', color: '#FF7A00' },
        { name: 'pfSense',     initials: 'Pf', color: '#212121' },
        { name: 'OPNsense',    initials: 'Op', color: '#D94F00' }
      ]
    }
  ];

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function buildPill(t, compact) {
    const textColor = t.dark ? 'color:#1F2A24;' : '';
    const liClass = compact ? 'tool-pill tool-pill-compact' : 'tool-pill';
    return '<li class="' + liClass + '">' +
             '<span class="badge" style="background:' + t.color + ';' + textColor + '" aria-hidden="true">' +
               escapeHtml(t.initials) +
             '</span>' +
             '<span class="label">' + escapeHtml(t.name) + '</span>' +
           '</li>';
  }

  function buildToolGroups(data) {
    return data.map(function (group) {
      const pills = group.tools.map(function (t) { return buildPill(t, false); }).join('');

      const secondaryHtml = (group.secondary || []).map(function (sub) {
        const subPills = sub.tools.map(function (t) { return buildPill(t, true); }).join('');
        return '<div class="tool-secondary-group">' +
                 '<p class="tool-secondary-label">' + escapeHtml(sub.label) + '</p>' +
                 '<ul class="tool-row tool-row-secondary">' + subPills + '</ul>' +
               '</div>';
      }).join('');

      return '<div class="tool-group">' +
               '<h3>' + escapeHtml(group.group) + '</h3>' +
               '<ul class="tool-row">' + pills + '</ul>' +
               secondaryHtml +
             '</div>';
    }).join('');
  }

  const toolsRoot = document.getElementById('toolsRoot');
  if (toolsRoot) toolsRoot.innerHTML = buildToolGroups(PRIMARY_TOOLS);

  const techRoot = document.getElementById('techRoot');
  if (techRoot) techRoot.innerHTML = buildToolGroups(TECHNICAL_TOOLS);

  /* -------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------- */

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('open'));
    });

    // Close after choosing a destination
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    // Reset when resizing back up to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && nav.classList.contains('open')) setNav(false);
    });
  }

  /* -------------------------------------------------------
     3. Additional technical skills disclosure
     ------------------------------------------------------- */

  const techToggle = document.getElementById('techToggle');
  const techPanel = document.getElementById('techPanel');

  if (techToggle && techPanel) {
    techToggle.addEventListener('click', function () {
      const open = techToggle.getAttribute('aria-expanded') === 'true';
      techToggle.setAttribute('aria-expanded', String(!open));
      techPanel.hidden = open;
    });
  }

  /* -------------------------------------------------------
     4. Scroll-spy — only for sections the nav points to
     ------------------------------------------------------- */

  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  const watched = navLinks
    .map(function (link) {
      const id = (link.getAttribute('href') || '').replace('#', '');
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (watched.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    watched.forEach(function (section) { spy.observe(section); });
  }

  /* -------------------------------------------------------
     5. Brand logo fallback
     If a CDN icon fails, swap in a text badge instead of
     showing a broken image.
     ------------------------------------------------------- */

  document.querySelectorAll('img.store-logo').forEach(function (img) {
    img.addEventListener('error', function () {
      const text = img.getAttribute('data-fallback');
      if (text) {
        const badge = document.createElement('span');
        badge.className = 'tool-fallback';
        badge.textContent = text;
        img.replaceWith(badge);
      } else {
        img.style.display = 'none';
      }
    });
  });

})();

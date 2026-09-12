// Academic Profile Interactive Logic for Dr. R. Sivakumar

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  renderPublications();
  initContactForm();
  initCopyEmail();
  setupPublicationControls();
  initBackToTop();
});

// Theme Management
function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}

// Publication Filter and Search State
let currentTab = 'all';
let currentSearch = '';
let visibleCount = 15;

function renderPublications() {
  const container = document.getElementById('publications-list');
  const countEl = document.getElementById('pub-count');
  const loadMoreBtn = document.getElementById('load-more-pubs');
  if (!container || !window.PROFESSOR_DATA) return;

  const data = window.PROFESSOR_DATA.publications;
  let allPubs = [];

  // Flatten with category tag
  (data.journals || []).forEach(p => allPubs.push({ ...p, category: 'journal' }));
  (data.conferences || []).forEach(p => allPubs.push({ ...p, category: 'conference' }));
  (data.books || []).forEach(p => allPubs.push({ ...p, category: 'book' }));

  // Filter by Tab
  let filtered = allPubs.filter(p => {
    if (currentTab === 'all') return true;
    return p.category === currentTab;
  });

  // Filter by Search
  if (currentSearch.trim() !== '') {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(p => {
      const rawMatch = (p.raw || '').toLowerCase().includes(q);
      const yearMatch = (p.year || '').toString().includes(q);
      const badgesMatch = (p.badges || []).some(b => b.toLowerCase().includes(q));
      return rawMatch || yearMatch || badgesMatch;
    });
  }

  if (countEl) {
    countEl.textContent = `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} publications`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
        <svg class="w-12 h-12 mx-auto mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-lg font-medium">No publications found matching "${escapeHtml(currentSearch)}"</p>
        <p class="text-sm mt-1">Try clearing the search query or selecting a different tab.</p>
      </div>
    `;
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    return;
  }

  const itemsToShow = filtered.slice(0, visibleCount);

  container.innerHTML = itemsToShow.map((pub) => {
    const isJournal = pub.category === 'journal';
    const isConf = pub.category === 'conference';

    let catBadge = isJournal
      ? '<span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Journal Paper</span>'
      : isConf
      ? '<span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Conference</span>'
      : '<span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">Book / Chapter</span>';

    let badgeHtml = (pub.badges || []).map(b => {
      let bClass = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      if (b.includes('SCI')) bClass = 'badge-sci';
      else if (b.includes('Scopus')) bClass = 'badge-scopus';
      else if (['Springer', 'Elsevier', 'Taylor & Francis'].some(pubName => b.includes(pubName))) bClass = 'badge-publisher';
      return `<span class="px-2 py-0.5 text-xs font-medium rounded-md ${bClass}">${b}</span>`;
    }).join(' ');

    let doiBtn = pub.doi
      ? `<a href="${pub.doi}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"><span>View DOI / Article</span><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`
      : '';

    return `
      <div class="hover-lift p-5 md:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-200">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex flex-wrap items-center gap-2">
            ${catBadge}
            ${badgeHtml}
          </div>
          <span class="px-2.5 py-0.5 text-xs font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            ${pub.year || ''}
          </span>
        </div>
        <p class="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium mb-4">
          ${escapeHtml(pub.raw)}
        </p>
        <div class="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 gap-3">
          <div>${doiBtn}</div>
          <button data-citation="${encodeURIComponent(pub.raw)}" class="copy-btn inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span class="btn-text">Copy Citation</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach copy listeners
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const citation = decodeURIComponent(btn.getAttribute('data-citation'));
      navigator.clipboard.writeText(citation).then(() => {
        const textSpan = btn.querySelector('.btn-text');
        const old = textSpan.textContent;
        textSpan.textContent = 'Copied!';
        btn.classList.add('border-emerald-500', 'text-emerald-600', 'dark:text-emerald-400');
        setTimeout(() => {
          textSpan.textContent = old;
          btn.classList.remove('border-emerald-500', 'text-emerald-600', 'dark:text-emerald-400');
        }, 2000);
      });
    });
  });

  if (loadMoreBtn) {
    if (visibleCount >= filtered.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }
}

// Publication UI Events
function setupPublicationControls() {
  const tabs = document.querySelectorAll('.pub-tab');
  const searchInput = document.getElementById('pub-search');
  const loadMoreBtn = document.getElementById('load-more-pubs');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-blue-600', 'text-white', 'shadow');
        t.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });
      tab.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      tab.classList.add('bg-blue-600', 'text-white', 'shadow');

      currentTab = tab.getAttribute('data-tab');
      visibleCount = 15;
      renderPublications();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      visibleCount = 15;
      renderPublications();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 15;
      renderPublications();
    });
  }
}

// Copy Email Helper
function initCopyEmail() {
  const emailBtns = document.querySelectorAll('.copy-email-btn');
  emailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'sivageoinfo@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const tooltip = btn.querySelector('.copy-tooltip');
        if (tooltip) {
          const original = tooltip.textContent;
          tooltip.textContent = 'Copied!';
          setTimeout(() => {
            tooltip.textContent = original;
          }, 2000);
        } else {
          alert('Email copied: ' + email);
        }
      });
    });
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('contact-alert');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value;
      const email = document.getElementById('sender-email').value;
      const subject = document.getElementById('sender-subject').value || 'Academic Inquiry via Profile Website';
      const message = document.getElementById('sender-message').value;
      const targetEmailEl = document.getElementById('target-email');
      const targetEmail = targetEmailEl ? targetEmailEl.value : 'sivageoinfo@gmail.com';

      const bodyText = `From: ${name} (${email})\n\n${message}`;
      const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?cc=sivakumr@srmist.edu.in&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      if (alertBox) {
        alertBox.classList.remove('hidden');
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 800);
      } else {
        window.location.href = mailtoUrl;
      }
    });
  }
}

// Back to top helper
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

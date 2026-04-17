/* ===========================
   NAVBAR: Scroll + Hamburger
   =========================== */
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open')
    ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open')
    ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

/* ===========================
   SCROLL REVEAL ANIMATION
   =========================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 120);
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===========================
   ACTIVE NAV LINK HIGHLIGHT
   =========================== */
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ===========================
   SMOOTH TYPING TAGLINE
   =========================== */
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = tagline.textContent.trim();
  tagline.textContent = '';
  tagline.style.borderRight = '2px solid #2563eb';
  tagline.style.display = 'inline-block';
  tagline.style.whiteSpace = 'nowrap';

  let i = 0;
  const delay = 800; // Start after hero fade-in

  setTimeout(() => {
    const typeInterval = setInterval(() => {
      tagline.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
        // Blink cursor then remove
        setTimeout(() => {
          tagline.style.borderRight = 'none';
        }, 1500);
      }
    }, 55);
  }, delay);
}

/* ===========================
   SKILL CARD RIPPLE EFFECT
   =========================== */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(37,99,235,0.15);
      width: 80px;
      height: 80px;
      left: ${e.offsetX - 40}px;
      top: ${e.offsetY - 40}px;
      transform: scale(0);
      animation: ripple 0.5s ease-out;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }
  .nav-links a.active {
    color: #2563eb;
  }
  .nav-links a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);
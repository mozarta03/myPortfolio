gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ScrollSmoother);


document.addEventListener("DOMContentLoaded", () => {
  const smoother = ScrollSmoother.create({
    wrapper: ".smooth-wrapper",
    content: ".smooth-content",
    smooth: 2,
    effects: true,
    normalizeScroll: true
  });

  // Get header height for proper offset calculation
  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight + 20 : 80; // Add 20px buffer

  // handle all in-page header links (include contact button)
  const navLinks = document.querySelectorAll('.header .logo-name, .nav-bar .links a, .header .contact a');

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      // ignore non-hash links and plain '#' (used for CV modal)
      if (!href || !href.startsWith('#') || href === '#') return;

      e.preventDefault();

      const targetSection = document.querySelector(href);
      if (targetSection && smoother) {
        smoother.scrollTo(targetSection, { offsetY: headerHeight });
        // Close mobile menu if open
        const checkbox = document.getElementById("check");
        if (checkbox) checkbox.checked = false;
      }
    });
  });

  // Remove the old home button handler since it's now covered above
  // const homeButton = document.querySelector("#home");
  // if (homeButton && smoother) {
  //   homeButton.addEventListener("click", () => {
  //     smoother.scrollTo(".hero", { offsetY: 70 });
  //   });
  // }
});


// Hero section animations on page load
document.addEventListener("DOMContentLoaded", () => {
  const heroTl = gsap.timeline({ defaults: { ease: "back.out", duration: 1 } });

  heroTl
    .from(".hero h3", { opacity: 0, y: -50 })
    .from(".hero h1", { opacity: 0, y: -50 }, "-=0.6")
    .from(".hero p", { opacity: 0, y: -30 }, "-=0.5")
    .from(".btn", { opacity: 0, scale: 0.8 }, "-=0.4")
    .from(".socials", { opacity: 0, y: 20 }, "-=0.3")
    .from(".icons li", { opacity: 0, scale: 0, stagger: 0.2 }, "-=0.2")
    .from(".image-wrapper img", { opacity: 0, x: 100 }, "-=1");
});

// Navigation animations - Desktop only
const mm = gsap.matchMedia();
const navTl = gsap.timeline();

mm.add({
  isDesktop: "(min-width: 621px)",
}, (context) => {
  const { isDesktop } = context.conditions;
  
  if (isDesktop) {
    // Logo animation
    navTl.from(".logo-name", {
      xPercent: -200,
      duration: 0.8,
      ease: "back.out",
    });

    // Navigation links with stagger
    navTl.from(".links li a", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.15
    });

    // Contact button
    navTl.from(".contact", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    });

    // Nav links hover animations
    document.querySelectorAll(".links li a").forEach(link => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          y: -5,
          scale: 1.1,
          color: "var(--golden-orange)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          y: 0,
          scale: 1,
          color: "var(--light-base)",
          duration: 0.3,
          ease: "power2.inOut"
        });
      });
    });

    // Contact button hover animation with error checking
    const contactBtn = document.querySelector(".contact");
    if (contactBtn) {
      contactBtn.addEventListener("mouseenter", () => {
        gsap.to(contactBtn, {
          scale: 1.1,
          backgroundColor: "var(--earthy-tan)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      contactBtn.addEventListener("mouseleave", () => {
        gsap.to(contactBtn, {
          scale: 1,
          backgroundColor: "var(--soft-orange)",
          duration: 0.3,
          ease: "power2.inOut"
        });
      });
    }
  }
});

// About Me section animations
const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-me-title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});

// Initialize and animate About Me SVG
gsap.set(".about-me-svg", { drawSVG: "0% 0%" });

aboutTl
  .to(".about-me-svg", {
    drawSVG: "0% 100%",
    duration: 3.5,
    ease: "power2.inOut"
  })
  .from(".card-container .container", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 1.2,
    ease: "back.out(1.7)"
  }, "-=2.5")
  .from(".about-me-text p", {
    opacity: 0,
    y: 20,
    stagger: 0.25,
    duration: 1,
    ease: "power2.out"
  }, "-=1");

// Speed up reverse animation for About Me
aboutTl.eventCallback("onStart", () => {
  if (aboutTl.reversed()) {
    aboutTl.timeScale(10);
  }
});

aboutTl.eventCallback("onReverseComplete", () => aboutTl.timeScale(1));

document.addEventListener("DOMContentLoaded", () => {
  // About cards hover/focus/press animations
  

  // Skills cards hover/focus/press animations
  const skillCards = document.querySelectorAll('.skills-list .skill');
  skillCards.forEach(card => {
    card.style.transformOrigin = '50% 50%';

    const bgAnim = gsap.to(card, {
      scale: 1.06,
      boxShadow: "0 14px 38px rgba(0,0,0,0.36)",
      duration: 0.28,
      ease: "power2.out",
      paused: true
    });

    const svg = card.querySelector('svg');
    const svgAnim = svg ? gsap.to(svg, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.28, ease: "power2.out", paused: true }) : null;

    card.addEventListener('mouseenter', () => { bgAnim.play(); if (svgAnim) svgAnim.play(); });
    card.addEventListener('mouseleave', () => { bgAnim.reverse(); if (svgAnim) svgAnim.reverse(); });
    card.addEventListener('focus', () => { bgAnim.play(); if (svgAnim) svgAnim.play(); });
    card.addEventListener('blur', () => { bgAnim.reverse(); if (svgAnim) svgAnim.reverse(); });

    card.addEventListener('pointerdown', () => gsap.to(card, { scale: 0.98, duration: 0.08 }));
    card.addEventListener('pointerup',   () => gsap.to(card, { scale: 1.06, duration: 0.12 }));
  });
});

// Skills section animations
const skillsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skills-title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});



// Initialize and animate Skills SVG
gsap.set(".skills-svg", { drawSVG: "0% 0%" });

skillsTl
.to(".skills-svg", {
  drawSVG: "0% 100%",
  duration: 3.5,
  ease: "power2.inOut"
})
.from(".skills-list .skill", {
  opacity: 0,
  y: 20,
  duration: 1,
  ease: "elastic.out",
  stagger: {
    each: 0.2,
    grid: [2, 5],   
    from: "center"
  }
}, "-=2.5" );

// Speed up reverse animation for Skills
skillsTl.eventCallback("onStart", () => {
  if (skillsTl.reversed()) {
    skillsTl.timeScale(10);
  }
});

skillsTl.eventCallback("onReverseComplete", () => skillsTl.timeScale(1));

// Projects section animations
const projectsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".projects-title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});


// Initialize and animate projects SVG
gsap.set(".projects-svg", { drawSVG: "0% 0%" });

projectsTl
  .to(".projects-svg", {
    drawSVG: "0% 100%",
    duration: 3.5,
    ease: "power2.inOut"
  })
  // reveal each project card with stagger as the section animates in
  .from(".my-project", {
    autoAlpha: 0,
    y: 50,
    scale: 0.98,
    stagger: 0.25,
    duration: 0.9,
    ease: "power3.out"
  }, "-=2.5")
  // reveal project images with a clipping mask effect
  .from(".my-project .project-img img", {
    clipPath: "inset(100% 0% 0% 0%)",
    yPercent: 6,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.25
  }, "-=0.9")
;


// Speed up reverse animation for Projects
projectsTl.eventCallback("onStart", () => {
  if (projectsTl.reversed()) {
    projectsTl.timeScale(10);
  }
});

// Add hover / focus interactions for project buttons (and keyboard accessible focus)
document.addEventListener("DOMContentLoaded", () => {
  const projectButtons = document.querySelectorAll(".my-project .see-more");
  projectButtons.forEach(btn => {
    // pointer interactions
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.04,
        backgroundColor: "var(--deep-brown)", // var(--dark-red)
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        duration: 0.28,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        backgroundColor: "var(--golden-orange)", // var(--bright-fiery-red)
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        duration: 0.32,
        ease: "power2.inOut"
      });
    });

    // keyboard focus accessibility
    btn.addEventListener("focus", () => {
      gsap.to(btn, {
        scale: 1.06,
        boxShadow: "0 16px 36px rgba(0,0,0,0.45), 0 0 0 6px rgba(217,177,173,0.12)",
        duration: 0.18,
        ease: "power2.out"
      });
    });

    btn.addEventListener("blur", () => {
      gsap.to(btn, {
        scale: 1,
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
        duration: 0.2,
        ease: "power2.inOut"
      });
    });

    // small click/tap feedback
    btn.addEventListener("pointerdown", () => {
      gsap.to(btn, { scale: 0.98, duration: 0.08, ease: "power1.out" });
    });
    btn.addEventListener("pointerup", () => {
      gsap.to(btn, { scale: 1.03, duration: 0.12, ease: "power1.out" });
      // restore to hover state shortly after (if still hovered)
      setTimeout(() => {
        if (btn.matches(":hover")) {
          gsap.to(btn, { scale: 1.04, duration: 0.12, ease: "power1.out" });
        } else {
          gsap.to(btn, { scale: 1, duration: 0.12, ease: "power1.out" });
        }
      }, 120);
    });
  });
});


// Skills section animations
const experienceTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".experience-title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});



// Initialize and animate Experience SVG
gsap.set(".experience-svg", { drawSVG: "0% 0%" });

experienceTl
.to(".experience-svg", {
  drawSVG: "0% 100%",
  duration: 3.5,
  ease: "power2.inOut"
})
// reveal each project card with stagger as the section animates in
  .from(".experience-item", {
    autoAlpha: 0,
    y: 50,
    scale: 0.98,
    stagger: 0.25,
    duration: 0.9,
    ease: "power3.out"
  }, "-=2.5")

  // reveal project images with a clipping mask effect
  .from(".experience-item img", {
    clipPath: "inset(100% 0% 0% 0%)",
    yPercent: 6,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.25
  }, "-=1.8");

// Speed up reverse animation for Experience
experienceTl.eventCallback("onStart", () => {
  if (experienceTl.reversed()) {
    experienceTl.timeScale(10);
  }
});

// Certificates section animations
const certTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".certificates-title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});

// Initialize and animate Certificates SVG
gsap.set(".certificates-svg", { drawSVG: "0% 0%" });

certTl
  .to(".certificates-svg", {
    drawSVG: "0% 100%",
    duration: 3.5,
    ease: "power2.inOut"
  })
  .from(".certificates-list .certificate", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "elastic.out",
    stagger: {
      each: 0.2,
      grid: [2, 5],
      from: "center"
    }
  }, "-=2.5");

// Speed up reverse animation for Certificates
certTl.eventCallback("onStart", () => {
  if (certTl.reversed()) {
    certTl.timeScale(10);
  }
});

// Timeline SVG draw on scroll
function setTimelineLineEnd() {
  const svg = document.querySelector('.timeline-svg');
  let line = svg?.querySelector('line');
  const bullets = document.querySelectorAll('.timeline-bullet');
  if (!svg || bullets.length === 0) return;

  // Ensure there's a <line> element we can control
  if (!line) {
    line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '2');
    line.setAttribute('x2', '2');
    line.setAttribute('y1', '0');
    line.setAttribute('y2', '0');
    line.setAttribute('stroke', 'var(--storm-gray)');
    line.setAttribute('stroke-width', '4');
    svg.appendChild(line);
  }

  // Get the last bullet's center relative to the SVG (in screen pixels)
  const svgRect = svg.getBoundingClientRect();
  const lastBullet = bullets[bullets.length - 1];
  const bulletRect = lastBullet.getBoundingClientRect();
  const bulletCenterYPx = bulletRect.top - svgRect.top + bulletRect.height / 2;

  // Calculate a small gap so the line stops before reaching the bullet center
  const gapPx = Math.max(8, bulletRect.height / 2 + 4); // at least 8px, or half bullet + border
  const targetYPx = Math.max(0, bulletCenterYPx - gapPx);

  // Convert pixel Y into SVG user coordinate units taking viewBox scaling into account
  const svgClientHeight = svgRect.height || 1;
  const viewBoxHeight = (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.height) ? svg.viewBox.baseVal.height : svgClientHeight;
  const y2InSvgUnits = (targetYPx / svgClientHeight) * viewBoxHeight;

  // Set the line's y2 in SVG user units
  line.setAttribute('y2', y2InSvgUnits);

  // Also update GSAP/ScrollTrigger after changing the line
  try { ScrollTrigger.refresh(); } catch (e) { /* ignore if ScrollTrigger not ready */ }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimelineLineEnd();
  animateTimelineBullets();
  setTimeout(() => {
    setTimelineLineEnd();
    ScrollTrigger.refresh();
  }, 300);
  // Also update on window resize to keep it accurate
  window.addEventListener('resize', () => {
    setTimelineLineEnd();
    ScrollTrigger.refresh();
  });
});

// Set initial y2 to 0 so GSAP can animate from 0 to the correct value
gsap.set(".timeline-svg line", { drawSVG: "0% 0%" });

// create a line tween and keep a reference to its ScrollTrigger
const lineTween = gsap.to(".timeline-svg line", {
  drawSVG: "0% 100%",
  duration: 2,
  ease: "none",
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 70%",
    end: "bottom 80%",
    scrub: true,
    // markers: true, // enable for debugging
  }
});
const lineST = lineTween.scrollTrigger;

// Animate timeline bullets based on the line's progress (works at all breakpoints)
function animateTimelineBullets() {
  const svg = document.querySelector('.timeline-svg');
  const bullets = Array.from(document.querySelectorAll('.timeline-bullet'));
  if (!svg || bullets.length === 0) return;

  const svgRect = svg.getBoundingClientRect();
  const svgHeightPx = svgRect.height || 1;
  // compute bullet position as fraction (0..1) down the SVG
  const bulletData = bullets.map(b => {
    const bRect = b.getBoundingClientRect();
    const centerYPx = (bRect.top - svgRect.top) + (bRect.height / 2);
    const pct = Math.min(1, Math.max(0, centerYPx / svgHeightPx));
    // create paused highlight animation for the bullet
    const anim = gsap.fromTo(b,
      { scale: 0.85, backgroundColor: "var(--deep-brown)", borderColor: "#ffffffff", boxShadow: "0 0 0 4px var(--soft-orange)" },
      { scale: 1.18, backgroundColor: "var(--deep-brown)", borderColor: "var(--deep-brown)", boxShadow: "0 0 0 8px var(--soft-orange)", duration: 0.35, ease: "back.out(2)", paused: true }
    );
    return { el: b, pct, anim };
  });

  // Use a single ScrollTrigger that mirrors the line's start/end and drives bullets via onUpdate
  ScrollTrigger.create({
    trigger: ".timeline",
    start: lineST ? lineST.start : "top 70%",
    end: lineST ? lineST.end : "bottom 80%",
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;
      bulletData.forEach(({ pct, anim }) => {
        if (progress >= pct) anim.play();
        else anim.reverse();
      });
    }
  });
}

// Animate timeline items (content cards) as they enter the viewport
function animateTimelineItems() {
  document.querySelectorAll('.timeline-item').forEach(item => {
    const content = item.querySelector('.content');
    if (!content) return;
    const isLeft = item.classList.contains('left');

    gsap.fromTo(content,
      { autoAlpha: 0, x: isLeft ? 60 : -60, y: 20 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}



// Call after DOM and GSAP setup
document.addEventListener("DOMContentLoaded", () => {
  animateTimelineBullets();
  animateTimelineItems();
  // Ensure ScrollTrigger recalculates positions after images/fonts load
  setTimeout(() => ScrollTrigger.refresh(), 300);
});

    const dlCvBtn = document.querySelector(".hero .btn");
    if (dlCvBtn) {
      dlCvBtn.addEventListener("mouseenter", () => {
        gsap.to(dlCvBtn, {
          scale: 1.1,
          backgroundColor: "var(--golden-orange)", // var(--dark-teal)
          duration: 0.5,
          ease: "power2.out"
        });
      });

      dlCvBtn.addEventListener("mouseleave", () => {
        gsap.to(dlCvBtn, {
          scale: 1,
          backgroundColor: "var(--deep-brown)",
          duration: .5,
          ease: "power2.out"
        });
      });
    }

    // Hero icons: add same-style hover state to each icon (li + svg)
    const heroIconItems = document.querySelectorAll(".hero .icons li");
    if (heroIconItems && heroIconItems.length) {
      heroIconItems.forEach(item => {
        // ensure transform origin so scaling looks centered
        item.style.transformOrigin = "50% 50%";

        item.addEventListener("mouseenter", () => {
          // scale the list item and add a subtle halo/background
          gsap.to(item, {
            scale: 1.12,
            duration: 0.25,
            ease: "power2.out"
          });

          // animate SVG fill if present (keeps original svg centered)
          const svg = item.querySelector("svg");
          if (svg) {
            gsap.to(svg, {
              scale: 1.08,
              transformOrigin: "50% 50%",
              duration: 0.25,
              ease: "power2.out"
            });
            // if svg paths use fill, animate their fill color for visual feedback
            Array.from(svg.querySelectorAll("path, circle, rect")).forEach(el => {
              gsap.to(el, { fill: "var(--golden-orange)", duration: 0.25, ease: "power2.out" });
            });
          }
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            backgroundColor: "transparent",
            boxShadow: "none",
            duration: 0.25,
            ease: "power2.inOut"
          });

          const svg = item.querySelector("svg");
          if (svg) {
            gsap.to(svg, {
              scale: 1,
              transformOrigin: "50% 50%",
              duration: 0.25,
              ease: "power2.inOut"
            });
            Array.from(svg.querySelectorAll("path, circle, rect")).forEach(el => {
              // restore to CSS or default -- keep it consistent with site's social color
              gsap.to(el, { fill: "var(--deep-brown)", duration: 0.25, ease: "power2.inOut" });
            });
          }
        });
      });
    }

// Skills section animations
const getInTouchTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".get-in-touch-title",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
  }
});



// Initialize and animate Get In Touch SVG
gsap.set(".get-in-touch-svg", { drawSVG: "0% 0%" });

getInTouchTl
.to(".get-in-touch-svg", {
  drawSVG: "0% 100%",
  duration: 3.5,
  ease: "power2.inOut"
});

// Speed up reverse animation for Get In Touch
getInTouchTl.eventCallback("onStart", () => {
  if (getInTouchTl.reversed()) {
    getInTouchTl.timeScale(10);
  }
});

getInTouchTl.eventCallback("onReverseComplete", () => getInTouchTl.timeScale(1));


/* GSAP: Get In Touch content animation
   - Reveal title, svg (already handled), contact cards, and form fields
   - Uses ScrollTrigger to play when footer enters view
*/
(function animateGetInTouchContent() {
  // safety checks
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // set sensible initial states
  gsap.set([
    ".get-in-touch-title",
    ".footer h3",
    ".contact-item",
    ".form-container",
    ".form-container label",
    ".form-container input",
    ".form-container textarea",
    ".form-container button"
  ], { autoAlpha: 0, y: 30 });

  const ftTl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.7 },
    scrollTrigger: {
      trigger: ".footer-wrapper, .footer",
      start: "top 85%",
      end: "bottom 60%",
      toggleActions: "play none none reverse",
      // markers: true,
    }
  });

  // title + svg (svg draw is handled by getInTouchTl) — small stagger for visual polish
  ftTl
    .to(".get-in-touch-title", { autoAlpha: 1, y: 0, duration: 0.6 })
    .to(".footer h3", { autoAlpha: 1, y: 0 }, "-=0.35");

  // reveal contact cards with stagger from left/right based on layout
  ftTl.to(".contact-item", {
    autoAlpha: 1,
    y: 0,
    stagger: { each: 0.12, from: "center" },
    duration: 0.6
  }, "-=0.35");

  // reveal form container and its fields with micro-stagger
  ftTl.to(".form-container", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.35")
      .to(".form-container label, .form-container input, .form-container textarea, .form-container button", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.35,
        ease: "power2.out"
      }, "-=0.25");

  // subtle pulse on submit button once revealed
  ftTl.to(".form-container button", { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, "+=0.05");

  // speed up reverse for snappy collapse
  ftTl.eventCallback("onReverseComplete", () => ftTl.timeScale(1));
  ftTl.eventCallback("onStart", () => { if (ftTl.reversed()) ftTl.timeScale(10); });
})();

// Open CV modal (called by the DOWNLOAD CV link)
function openCVModal(event) {
  if (event && typeof event.preventDefault === 'function') event.preventDefault();
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.style.display = 'block';
  // prevent background scrolling while modal is open
  document.body.style.overflow = 'hidden';
  // focus the first input for accessibility
  const firstInput = modal.querySelector('input, textarea, button');
  if (firstInput) firstInput.focus();
}

function closeCVModal() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  modal.style.display = 'none';
  // restore background scrolling
  document.body.style.overflow = '';
  // optionally reset form focus
  const trigger = document.querySelector('.hero .btn');
  if (trigger) trigger.focus();
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('cvModal');
  if (event.target === modal) {
    closeCVModal();
  }
}

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('cvModal');
    if (modal && modal.style.display === 'block') {
      closeCVModal();
    }
  }
});

// Make the CV modal draggable (pointer events: works for mouse & touch)
(function initCvModalDrag() {
  const modal = document.getElementById('cvModal');
  if (!modal) return;
  const dlg = modal.querySelector('.modal-content');
  if (!dlg) return;

  // Ensure we don't accidentally select text while dragging
  dlg.style.userSelect = 'none';

  let dragging = false;
  let pointerId = null;
  let startX = 0, startY = 0;
  let origLeft = 0, origTop = 0;

  function getNumericPosition(el) {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }

  dlg.addEventListener('pointerdown', (ev) => {
    // don't start drag when interacting with form controls or the close button
    if (ev.target.closest('input, textarea, button, a, label, .close')) return;

    ev.preventDefault();
    dragging = true;
    pointerId = ev.pointerId;
    dlg.setPointerCapture(pointerId);
    dlg.classList.add('grabbing');

    const pos = getNumericPosition(dlg);
    origLeft = pos.left;
    origTop = pos.top;
    startX = ev.clientX;
    startY = ev.clientY;

    // If dlg was centered via transform, remove transform so left/top px are meaningful
    // compute absolute left/top in px if transform is set
    const cs = getComputedStyle(dlg);
    if (cs.transform && cs.transform !== 'none') {
      // keep visual where it is, then translate to explicit left/top
      const rect = dlg.getBoundingClientRect();
      dlg.style.transform = 'none';
      dlg.style.left = `${rect.left}px`;
      dlg.style.top = `${rect.top}px`;
    }
  });

  dlg.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== pointerId) return;
    ev.preventDefault();
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    const newLeft = origLeft + dx;
    const newTop = origTop + dy;

    // keep modal within the viewport bounds (simple clamp)
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const r = dlg.getBoundingClientRect();
    const w = r.width;
    const h = r.height;
    const minLeft = 8;
    const minTop = 8;
    const maxLeft = vw - w - 8;
    const maxTop = vh - h - 8;

    dlg.style.left = `${Math.min(maxLeft, Math.max(minLeft, newLeft))}px`;
    dlg.style.top = `${Math.min(maxTop, Math.max(minTop, newTop))}px`;
  });

  function endDrag(ev) {
    if (!dragging) return;
    if (ev && ev.pointerId && ev.pointerId !== pointerId) return;
    dragging = false;
    try { dlg.releasePointerCapture(pointerId); } catch (e) { /* ignore */ }
    pointerId = null;
    dlg.classList.remove('grabbing');
  }

  dlg.addEventListener('pointerup', endDrag);
  dlg.addEventListener('pointercancel', endDrag);
  window.addEventListener('blur', endDrag);

  // When modal opens, center it if it hasn't been moved yet
  const obs = new MutationObserver(() => {
    if (modal.style.display === 'block') {
      // if .left or .top not explicitly set yet (centered state), center
      if (!dlg.style.left && !dlg.style.top) {
        dlg.style.left = '50%';
        dlg.style.top = '50%';
        dlg.style.transform = 'translate(-50%, -50%)';
      }
    }
  });
  obs.observe(modal, { attributes: true, childList: false, subtree: false });
})();

// Add EmailJS script to your HTML first
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialize EmailJS (replace with your actual public key)
emailjs.init("Y4YrjzJCGaqveD7Gs");

// Replace the existing form submission handler
document.getElementById('cvRequestForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;
  const message = document.getElementById('message').value;
  
  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Send email using EmailJS
  emailjs.send("service_0nmhzie", "template_auxlgt6", {
    from_name: userName,        // Now captures actual name
    from_email: userEmail,
    message: message,
    to_email: "fbanawork@gmail.com"
  })
  .then(function(response) {
    console.log('Email sent successfully!', response.status, response.text);
    closeCVModal();
    alert('Thank you! Your request has been sent successfully. Please check your email inbox shortly for the CV.');
    
    // Reset form
    document.getElementById('cvRequestForm').reset();
  })
  .catch(function(error) {
    console.error('EmailJS error:', error);
    alert('Failed to send request. Please try again or contact me directly at fbanawork@gmail.com');
  })
  .finally(function() {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
});

// Footer contact form -> use EmailJS (same service/template as CV request)
// Replace "service_0nmhzie" / "template_auxlgt6" with your actual service/template if different.
(function attachFooterContactHandler(){
  const form = document.getElementById('footerContactForm');
  if (!form || typeof emailjs === 'undefined') return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('footerName')?.value?.trim() || '';
    const email = document.getElementById('footerEmail')?.value?.trim() || '';
    const message = document.getElementById('footerMessage')?.value?.trim() || '';

    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn ? submitBtn.textContent : null;
    if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }

    try {
      await emailjs.send("service_0nmhzie", "template_auxlgt6", {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "fbanawork@gmail.com"
      });

      // optional: open CV modal after successful contact (comment out if not desired)
      // openCVModal();

      alert('Message sent — thank you! I will reply shortly.');

      form.reset();
    } catch (err) {
      console.error('Footer EmailJS error:', err);
      alert('Sending failed. Please try again or email directly at fbanawork@gmail.com');
    } finally {
      if (submitBtn) { submitBtn.textContent = origText; submitBtn.disabled = false; }
    }
  });
})();


"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for internal anchor links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetID);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Handle "Learn More" CTA button (if present)
  const ctaLearnBtn = document.getElementById("cta-learn");
  if (ctaLearnBtn) {
    ctaLearnBtn.addEventListener("click", function () {
      window.location.href = "education.html";
    });
  }

  // Mobile navigation toggle (optional: requires a #nav-toggle button in your HTML)
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.querySelector(".nav-links");
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", function () {
      navLinksContainer.classList.toggle("active");
    });
  }

  // Intersection Observer for lazy-loading animations
  const animateElements = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    animateElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: immediately show elements if IntersectionObserver is not supported
    animateElements.forEach((el) => el.classList.add("animated"));
  }

  // Log page load (can be used for debugging or analytics)
  console.log("Green Hydrogen PtX page loaded.");
});
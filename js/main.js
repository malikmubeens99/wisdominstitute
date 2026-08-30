/**
 * WISDOM INSTITUTE — Core Interaction Logic
 * Lightweight, zero-dependency, WCAG-compliant micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  }

  // 2. Accessible FAQ Accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close all answers in the group
      faqQuestions.forEach(otherBtn => {
        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherBtn.nextElementSibling) {
          otherBtn.nextElementSibling.classList.remove('show');
        }
      });

      // Toggle clicked item
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('show');
      }
    });
  });

  // 3. Free Trial Form Submission Handler
  const trialForm = document.getElementById('free-trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('student-name')?.value || '';
      const whatsapp = document.getElementById('whatsapp-number')?.value || '';
      const program = document.getElementById('program-choice')?.value || '';

      // Form validation & direct fallback redirection to official WhatsApp desk
      const defaultMessage = `Assalamu Alaikum, I would like to book the 3 free trial Quran classes for ${encodeURIComponent(name)}. Program: ${encodeURIComponent(program)}. WhatsApp: ${encodeURIComponent(whatsapp)}.`;
      const whatsappUrl = `https://wa.me/923004516944?text=${defaultMessage}`;

      // User feedback & redirect
      const submitBtn = trialForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Redirecting to Admissions WhatsApp...';
      }

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 600);
    });
  }
});

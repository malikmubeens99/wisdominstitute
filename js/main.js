document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      faqQuestions.forEach(otherBtn => {
        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.classList.remove('show');
      });
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('show');
      }
    });
  });

  // Multi-step Form Submission
  const bookingForm = document.getElementById('multi-step-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Booking...';
      }

      fetch(bookingForm.action, {
        method: 'POST',
        body: new FormData(bookingForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(() => {
        bookingForm.style.display = 'none';
        const progressEl = document.querySelector('.step-progress');
        if (progressEl) progressEl.style.display = 'none';
        const successEl = document.getElementById('success-screen');
        if (successEl) successEl.style.display = 'block';
      })
      .catch(() => {
        bookingForm.style.display = 'none';
        const progressEl = document.querySelector('.step-progress');
        if (progressEl) progressEl.style.display = 'none';
        const successEl = document.getElementById('success-screen');
        if (successEl) successEl.style.display = 'block';
      });
    });
  }
});

// Multi-step Form Next/Prev Handlers
function updateProgress(step) {
  const labels = [
    "Step 1 of 3 — Learner details",
    "Step 2 of 3 — Program & Schedule",
    "Step 3 of 3 — Contact details"
  ];
  const labelEl = document.getElementById('step-indicator-text');
  if (labelEl) labelEl.innerText = labels[step - 1];

  const b1 = document.getElementById('bar-1');
  const b2 = document.getElementById('bar-2');
  const b3 = document.getElementById('bar-3');
  if (b1) b1.classList.toggle('active', step >= 1);
  if (b2) b2.classList.toggle('active', step >= 2);
  if (b3) b3.classList.toggle('active', step >= 3);
}

function nextStep(current) {
  if (current === 1) {
    const ageEl = document.getElementById('learner_age');
    if (ageEl && !ageEl.value.trim()) {
      alert('Please specify student age.');
      return;
    }
  }
  if (current === 2) {
    const tzEl = document.getElementById('country_timezone');
    if (tzEl && !tzEl.value.trim()) {
      alert('Please enter your country/timezone.');
      return;
    }
  }

  const currStep = document.getElementById(`step-${current}`);
  const nextStepEl = document.getElementById(`step-${current + 1}`);
  if (currStep && nextStepEl) {
    currStep.classList.remove('active');
    nextStepEl.classList.add('active');
    updateProgress(current + 1);
  }
}

function prevStep(current) {
  const currStep = document.getElementById(`step-${current}`);
  const prevStepEl = document.getElementById(`step-${current - 1}`);
  if (currStep && prevStepEl) {
    currStep.classList.remove('active');
    prevStepEl.classList.add('active');
    updateProgress(current - 1);
  }
}

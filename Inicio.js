window.addEventListener('DOMContentLoaded', (event) => {
    const sr = ScrollReveal();
  
    sr.reveal('.image-text', {
      delay: 200,
      duration: 1000,
      distance: '20px',
      origin: 'bottom',
      viewFactor: 0.5,
      reset: true,
      useDelay: 'always',
      mobile: false,
      beforeReveal: (domEl) => {
        domEl.classList.add('fade-in');
      },
      afterReset: (domEl) => {
        domEl.classList.remove('fade-in');
      },
    });

    sr.reveal('.text-container', {
        delay: 200,
        duration: 1000,
        distance: '20px',
        origin: 'bottom',
        viewFactor: 0.1,
        reset: true,
        useDelay: 'always',
        mobile: false,
        beforeReveal: (domEl) => {
          domEl.classList.add('fade-in');
        },
        afterReset: (domEl) => {
          domEl.classList.remove('fade-in');
        },
      });

  });
  
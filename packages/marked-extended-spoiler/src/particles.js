'use strict';

/**
 * Create particles effect for the spoiler container.
 * @param {string} spoilerId - The ID of the spoiler container.
 * @param {string} animationDuration - The duration of the animation.
 */
export function createParticles(spoilerId, animationDuration) {
  // Validate if document is defined
  if (typeof document === 'undefined') return;

  // eslint-disable-next-line no-undef
  const container = document.getElementById(spoilerId);
  const particlesContainer = container.querySelector('.spoiler-particles');

  // Number of particles to generate
  const particleCount = 15;

  // Create particles dynamically
  for (let i = 0; i < particleCount; i++) {
    // eslint-disable-next-line no-undef
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Set random position and delay for each particle
    const size = Math.random() * 10 + 5; // Random size between 5px and 15px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 2}s`; // Random animation delay

    particlesContainer.appendChild(particle);
  }

  // Add particle animation CSS
  // eslint-disable-next-line no-undef
  const style = document.createElement('style');
  style.innerHTML = `
#${spoilerId}:hover {
    & .spoiler-content {
        opacity: 1 !important; /* Show content on hover */
        pointer-events: auto !important; /* Enable pointer events on hover */
        transition: opacity ${animationDuration} ease;
    }

    & .spoiler-overlay, & .spoiler-particles {
        opacity: 0 !important; /* Hide particles on hover */
        transition: opacity ${animationDuration} ease;
    }
}

#${spoilerId} {
  &.spoiler-container {
    border-radius: 4px;
    position: relative; 
    display: inline-block; 
    overflow: hidden; 
    height: auto; 
    width: 100%;
    
    & .spoiler-content {
      padding: 0.5rem;
      position: relative; 
      transition: opacity ${animationDuration} ease; 
      pointer-events: none;
      
      & img {
        width: 100%;
      }
    }
    
    & .spoiler-overlay {
      opacity: 1; 
      visibility: visible; 
      transition: opacity ${animationDuration} ease, visibility 0s ease; /* Smooth fade in */
    }
    
    & .spoiler-particles {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       pointer-events: none;
       background: transparent;
       z-index: 1;
       opacity: 1;
       visibility: visible;
       transition: opacity ${animationDuration} ease, visibility 0s ${animationDuration}; /* Smooth transition */
    
       & .particle {
           position: absolute;
           background-color: rgba(255, 255, 255, 0.8);
           border-radius: 50%;
           animation: particle-animation 2s infinite ease-in-out;
       }
    }
  }
} 

@keyframes particle-animation {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    50% {
        transform: translate(50px, 50px) scale(0.5);
        opacity: 0.6;
    }
    100% {
        transform: translate(-50px, -50px) scale(1);
        opacity: 0;
    }
}
`;

  // eslint-disable-next-line no-undef
  document.head.appendChild(style);
}

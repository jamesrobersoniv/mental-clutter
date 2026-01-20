// Preserve Mixcloud iframe across page navigations
// Keep iframe in DOM and never touch it - only update other content
(function() {
  'use strict';
  
  // Get reference to Mixcloud container - NEVER remove this from DOM
  const mixcloudContainer = document.querySelector('.site-mixcloud');
  
  if (!mixcloudContainer) {
    return; // No Mixcloud player on this page
  }

  // Ensure Mixcloud is positioned fixed so it stays on screen
  // (Should already be set in CSS, but ensure it)
  mixcloudContainer.style.position = 'fixed';
  mixcloudContainer.style.zIndex = '1000';

  // Intercept link clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    
    // Skip if not a link or external link
    if (!link || link.target === '_blank' || link.hasAttribute('data-no-ajax')) {
      return;
    }

    // Skip anchors and special protocols
    if (link.href.includes('#') || 
        link.href.startsWith('mailto:') || 
        link.href.startsWith('tel:') ||
        link.href.startsWith('javascript:')) {
      return;
    }

    // Check if it's an internal link
    try {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }
    } catch(e) {
      return;
    }

    // Prevent default navigation
    e.preventDefault();
    
    // Fetch the new page
    fetch(link.href, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.text())
    .then(html => {
      // Parse the new page
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Get the main content from the new page
      const newMain = doc.querySelector('main.site-main') || doc.querySelector('main');
      const oldMain = document.querySelector('main.site-main') || document.querySelector('main');
      
      // Get header if it exists
      const newHeader = doc.querySelector('header.site-header');
      const oldHeader = document.querySelector('header.site-header');
      
      if (newMain && oldMain) {
        // Remove any Mixcloud container that might be in the new HTML
        // (we want to keep our existing one)
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = newMain.innerHTML;
        const newMixcloud = tempContainer.querySelector('.site-mixcloud');
        if (newMixcloud) {
          newMixcloud.remove();
        }
        
        // Replace main content (Mixcloud stays untouched in DOM)
        oldMain.innerHTML = tempContainer.innerHTML;
        
        // Replace header if it exists
        if (newHeader && oldHeader) {
          oldHeader.innerHTML = newHeader.innerHTML;
        }
        
        // Update page title
        const newTitle = doc.querySelector('title');
        if (newTitle) {
          document.title = newTitle.textContent;
        }
        
        // Update URL
        window.history.pushState({}, '', link.href);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('page:loaded', { detail: { url: link.href } }));
      }
    })
    .catch(err => {
      console.error('Navigation error:', err);
      // Fallback to normal navigation
      window.location.href = link.href;
    });
  });

  // Handle browser back/forward - reload is necessary for full state
  window.addEventListener('popstate', function(e) {
    window.location.reload();
  });
})();

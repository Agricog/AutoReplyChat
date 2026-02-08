(function() {
  var currentScript = document.currentScript || document.querySelector('script[src*="embed.js"]');
  var botId = currentScript ? currentScript.getAttribute('data-bot-id') : null;
  
  if (!botId) {
    console.error('AutoReplyChat: data-bot-id attribute is required');
    return;
  }
  
  fetch('https://api.autoreplychat.com/api/bots/' + botId + '/settings')
    .then(function(response) { return response.json(); })
    .then(function(settings) {
      createWidget(botId, settings);
    })
    .catch(function(error) {
      console.error('AutoReplyChat: Failed to load bot settings', error);
      createWidget(botId, {});
    });
  
  function createWidget(botId, settings) {
    var buttonStyle = settings.buttonStyle || 'circle';
    var buttonPosition = settings.buttonPosition || 'right';
    var buttonSize = settings.buttonSize || 60;
    var chatBubbleBg = settings.chatBubbleBg || '#3b82f6';
    var headerColor = settings.headerColor || '#3b82f6';
    var textColor = settings.textColor || '#ffffff';
    var barMessage = settings.barMessage || 'Chat Now';
    
    function isMobile() {
      return window.innerWidth <= 500;
    }
    
    // Inject responsive styles
    var style = document.createElement('style');
    style.textContent = '#autoreply-chat-iframe-container{display:none;width:380px;height:550px;margin-bottom:16px;}' +
      '#autoreply-chat-close-btn{display:none;}' +
      '@media(max-width:500px){' +
        '#autoreply-chat-iframe-container{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;margin:0!important;z-index:10000!important;border-radius:0!important;}' +
        '#autoreply-chat-iframe-container iframe{border-radius:0!important;}' +
        '#autoreply-chat-close-btn.is-open{display:flex!important;position:fixed!important;top:10px!important;right:10px!important;z-index:10002!important;width:44px!important;height:44px!important;align-items:center!important;justify-content:center!important;border-radius:50%!important;border:none!important;cursor:pointer!important;box-shadow:0 2px 8px rgba(0,0,0,0.2)!important;}' +
      '}';
    document.head.appendChild(style);
    
    // Create container
    var container = document.createElement('div');
    container.id = 'autoreply-chat-container';
    container.style.cssText = 'position: fixed; bottom: 24px; ' + buttonPosition + ': 24px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    
    // Create chat button
    var button = document.createElement('div');
    button.id = 'autoreply-chat-button';
    
    if (buttonStyle === 'bar') {
      button.style.cssText = 'background: ' + chatBubbleBg + '; color: white; padding: 12px 20px; border-radius: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px; transition: transform 0.2s, opacity 0.2s;';
      button.innerHTML = '<svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><span style="font-weight: 500;">' + barMessage + '</span>';
    } else {
      button.style.cssText = 'background: ' + chatBubbleBg + '; width: ' + buttonSize + 'px; height: ' + buttonSize + 'px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; transition: transform 0.2s, opacity 0.2s; position: relative; z-index: 10001;';
      var iconSize = Math.round(buttonSize * 0.4);
      button.innerHTML = '<svg width="' + iconSize + '" height="' + iconSize + '" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    }
    
    button.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
    button.onmouseout = function() { this.style.transform = 'scale(1)'; };
    
    // Create mobile close button (sits outside iframe, on top of it)
    var closeBtn = document.createElement('button');
    closeBtn.id = 'autoreply-chat-close-btn';
    closeBtn.setAttribute('aria-label', 'Close chat');
    closeBtn.style.backgroundColor = headerColor;
    closeBtn.innerHTML = '<svg width="24" height="24" fill="' + textColor + '" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    
    // Create iframe container
    var iframeContainer = document.createElement('div');
    iframeContainer.id = 'autoreply-chat-iframe-container';
    
    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://autoreplychat.com/chat/' + botId;
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.15);';
    iframe.allow = 'microphone';
    
    iframeContainer.appendChild(iframe);
    
    // Close chat function
    function closeChat() {
      isOpen = false;
      iframeContainer.style.display = 'none';
      closeBtn.classList.remove('is-open');
      button.style.display = 'flex';
      if (buttonStyle === 'bar') {
        button.innerHTML = '<svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><span style="font-weight: 500;">' + barMessage + '</span>';
      } else {
        button.innerHTML = '<svg width="' + iconSize + '" height="' + iconSize + '" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
      }
    }
    
    // Open chat function
    function openChat() {
      isOpen = true;
      iframeContainer.style.display = 'block';
      if (isMobile()) {
        closeBtn.classList.add('is-open');
        button.style.display = 'none';
      } else {
        if (buttonStyle === 'bar') {
          button.innerHTML = '<svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg><span style="font-weight: 500;">Close</span>';
        } else {
          button.innerHTML = '<svg width="' + iconSize + '" height="' + iconSize + '" fill="white" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
        }
      }
    }
    
    // Toggle function
    var isOpen = false;
    button.onclick = function() {
      if (isOpen) {
        closeChat();
      } else {
        openChat();
      }
    };
    
    closeBtn.onclick = function() {
      closeChat();
    };
    
    container.appendChild(iframeContainer);
    container.appendChild(button);
    document.body.appendChild(container);
    document.body.appendChild(closeBtn);
  }
})();

(function() {
  // Get bot ID from script tag
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var botId = currentScript.getAttribute('data-bot-id');
  
  if (!botId) {
    console.error('AutoReplyChat: Missing data-bot-id attribute');
    return;
  }
  
  // Create iframe container
  var container = document.createElement('div');
  container.id = 'autoreply-chat-container';
  container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 999999;';
  
  // Create chat button
  var button = document.createElement('div');
  button.id = 'autoreply-chat-button';
  button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>';
  button.style.cssText = 'width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25); transition: transform 0.2s;';
  button.onmouseover = function() { this.style.transform = 'scale(1.1)'; };
  button.onmouseout = function() { this.style.transform = 'scale(1)'; };
  
  // Create iframe (hidden initially)
  var iframe = document.createElement('iframe');
  iframe.id = 'autoreply-chat-iframe';
  iframe.src = 'https://autoreplychat.com/chat/' + botId;
  iframe.style.cssText = 'display: none; width: 380px; height: 550px; border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.25); margin-bottom: 10px;';
  iframe.setAttribute('allow', 'microphone');
  
  // Toggle chat
  var isOpen = false;
  button.onclick = function() {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    button.innerHTML = isOpen 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>';
  };
  
  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);
})();

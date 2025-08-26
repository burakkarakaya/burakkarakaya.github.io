// WebChat JavaScript for Yapar Bilişim

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements
    var toggle = document.getElementById('webchat-toggle');
    var panel = document.getElementById('webchat-panel');
    var closeBtn = document.getElementById('webchat-close');
    var input = document.getElementById('webchat-input');
    var send = document.getElementById('webchat-send');
    var list = document.getElementById('webchat-messages');
    var quick = document.getElementById('webchat-quick');
    var unread = document.getElementById('webchat-unread');
    var openFromHeaderBtn = document.getElementById('whatsapp-btn');

    function isOpen(){ 
        return panel && !panel.classList.contains('pointer-events-none'); 
    }
    
    function openChat(){
        if (!panel) return;
        panel.classList.remove('opacity-0','pointer-events-none','translate-y-2','scale-95');
        setTimeout(function(){ if (input) input.focus(); }, 50);
        if (unread) unread.classList.add('hidden');
    }
    
    function closeChat(){ 
        if (panel) panel.classList.add('opacity-0','pointer-events-none','translate-y-2','scale-95'); 
    }
    
    function toggleChat(){ 
        isOpen() ? closeChat() : openChat(); 
    }

    // Add event listeners
    if (toggle) {
        toggle.addEventListener('click', toggleChat);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }
    
    if (openFromHeaderBtn) {
        openFromHeaderBtn.addEventListener('click', function(e){ 
            e.preventDefault(); 
            openChat(); 
        });
    }

    var STORAGE_KEY = 'WEBCHAT_LOG_V2';
    
    function loadLog(){ 
        try { 
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); 
        } catch(_) { 
            return []; 
        } 
    }
    
    function saveLog(items){ 
        try { 
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); 
        } catch(_) {} 
    }
    
    function appendMessage(text, who){
        if (!list) return;
        
        var wrap = document.createElement('div');
        var bubble = document.createElement('div');
        bubble.textContent = text;
        
        if (who === 'user') {
            wrap.className = 'flex justify-end';
            bubble.className = 'max-w-[80%] rounded-2xl px-3 py-2 bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white shadow';
        } else if (who === 'agent') {
            wrap.className = 'flex justify-start';
            bubble.className = 'max-w-[80%] rounded-2xl px-3 py-2 bg-white border shadow-sm';
        } else {
            wrap.className = 'flex justify-center';
            bubble.className = 'text-xs text-gray-500';
        }
        
        wrap.appendChild(bubble);
        list.appendChild(wrap);
        
        // Smooth scroll to bottom
        setTimeout(function() {
            list.scrollTop = list.scrollHeight;
        }, 10);
    }
    
    function appendStatus(text){ 
        appendMessage(text, 'status'); 
    }

    function showTyping(show){
        var id = 'webchat-typing';
        var el = document.getElementById(id);
        
        if (show) {
            if (el) return;
            var row = document.createElement('div');
            row.id = id;
            row.className = 'flex justify-start';
            var bubble = document.createElement('div');
            bubble.className = 'max-w-[80%] rounded-2xl px-3 py-2 bg-white border shadow-sm flex items-center gap-1 text-gray-500';
            
            for (var i=0;i<3;i++){ 
                var d=document.createElement('span'); 
                d.className='typing-dot inline-block w-1.5 h-1.5 bg-gray-400 rounded-full'; 
                bubble.appendChild(d); 
            }
            
            row.appendChild(bubble);
            if (list) list.appendChild(row);
            if (list) list.scrollTop = list.scrollHeight;
        } else if (el) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }

    // Load chat history
    var history = loadLog();
    history.forEach(function(it){ appendMessage(it.text, it.who); });

    async function sendToEndpoint(text){
        // Optional: send to endpoint if configured
        var endpoint = document.body.getAttribute('data-chat-endpoint') || '';
        if (!endpoint) return false;
        try {
            var payload = { text: text, when: Date.now(), path: location.pathname, page: document.title };
            var r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            return r.ok;
        } catch(_) { return false; }
    }

    async function handleSend(text){
        appendMessage(text, 'user');
        var newLog = loadLog();
        newLog.push({ text: text, who: 'user', ts: Date.now() });
        saveLog(newLog);
        showTyping(true);
        var ok = await sendToEndpoint(text);
        setTimeout(function(){ showTyping(false); }, 600);
        if (ok) appendStatus('Mesaj iletildi.'); else appendStatus('Mesaj kaydedildi. (İletim yapılandırılmadı)');
    }

    // Add send button event listener
    if (send) {
        send.addEventListener('click', function(){
            var text = (input && input.value || '').trim();
            if (!text) return;
            input.value = '';
            handleSend(text);
        });
    }
    
    // Add input keydown event listener
    if (input) {
        input.addEventListener('keydown', function(e){ 
            if (e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); 
                if (send) send.click(); 
            } 
        });
    }

    // Add quick action button event listeners
    if (quick) {
        quick.querySelectorAll('button').forEach(function(b){ 
            b.addEventListener('click', function(){ 
                var t=b.textContent.trim(); 
                if (!t) return; 
                input.value = t; 
                input.focus(); 
            }); 
        });
    }

    // Override appendMessage to show unread indicator
    var origAppend = appendMessage;
    appendMessage = function(text, who){ 
        origAppend(text, who); 
        if (!isOpen() && unread) unread.classList.remove('hidden'); 
    };

    // Test: Add a welcome message after a short delay
    setTimeout(function() {
        appendMessage('Merhaba! Size nasıl yardımcı olabilirim?', 'agent');
    }, 1000);
}); 
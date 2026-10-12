/**
 * AdBlockBypass Shield - Anti-Circumvention, Anti-Popunder, Click-Shield & First-Party Ad Defuser
 * Injected in MAIN world at document_start to run before all web page scripts.
 */
(() => {
  'use strict';

  // 0. Safety Guard for React / Next.js / Vue Virtual DOM reconciliation
  // Prevents "NotFoundError: The node to be removed is not a child of this node" crashes
  try {
    const origRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(child) {
      if (child && child.parentNode !== this) {
        return child;
      }
      return origRemoveChild.apply(this, arguments);
    };

    const origInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        return this.appendChild(newNode);
      }
      return origInsertBefore.apply(this, arguments);
    };
  } catch(e) {}

  // 0.5 Popunder Event Listener Guardian
  // Blocks scripts from hijacking click/mousedown with popunder timers (like xnhau webGate)
  try {
    const origAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if ((type === 'click' || type === 'mousedown' || type === 'pointerdown') && typeof listener === 'function') {
        try {
          const fnStr = Function.prototype.toString.call(listener);
          if (/lastPopunderTime|openUntil|acquirecardedsullen|badlandlispyippee|POPUNDER_INTERVAL|__PPU_SESSION_/i.test(fnStr)) {
            console.warn('[AdBlockShield] Neutralized popunder event listener:', type);
            return;
          }
        } catch(err) {}
      }
      return origAddEventListener.apply(this, arguments);
    };
  } catch(e) {}

  // Safe DOM hiding utility — NEVER call node.remove() on React-managed nodes!
  function hideSafely(node) {
    if (!node || !node.style) return;
    try {
      node.style.setProperty('display', 'none', 'important');
      node.style.setProperty('visibility', 'hidden', 'important');
      node.style.setProperty('pointer-events', 'none', 'important');
      node.style.setProperty('opacity', '0', 'important');
      node.style.setProperty('z-index', '-99999', 'important');
      node.style.setProperty('position', 'absolute', 'important');
      node.style.setProperty('width', '0px', 'important');
      node.style.setProperty('height', '0px', 'important');
      node.style.setProperty('overflow', 'hidden', 'important');
      node.setAttribute('aria-hidden', 'true');
    } catch(e) {}
  }

  // 1. Site-Specific VIP / Ad-Free LocalStorage Flags
  // Defuses site-native ad hooks like chophim.app useShouldShowBanners & useShouldShowAds, and xnhau lastPopunderTime
  try {
    const forever = String(Date.now() + 315360000000); // 10 years in future
    window.localStorage.setItem('chophim:banner-blocked-until', forever);
    window.localStorage.setItem('chophim:popup-ad-dismissed-until', forever);
    window.localStorage.setItem('banner-blocked-until', forever);
    window.localStorage.setItem('popup-ad-dismissed-until', forever);
    window.localStorage.setItem('lastPopunderTime', forever);
    window.localStorage.setItem('xnPopSeen', '999999');
    window.localStorage.setItem('__PPU_ppucnt', '999999');
    window.dispatchEvent(new Event('chophim:banner-blocked'));
    window.dispatchEvent(new Event('chophim:popup-ads-dismissed'));
  } catch(e) {}

  // 2. Comprehensive Spam / Gambling / Ad Patterns
  const SPAM_PATTERNS = [
    /\b\d{1,3}bet\w*/i, // 11bet, 789bet, 88bet, 188bet...
    /\b789b\w*/i,       // 789b668.me...
    /\b(cm88|hb88|ok88|mb66|sumvip|sumpro|sumclub|78win|fc88|qq88|hi88|s8|i9|i9bet|iwin|b52|sunwin|go88|rikvip|kubet|thabet|shbet|new88|jun88|fb88|w88|bk8|dafabet|m88|fun88|v9bet)\w*/i,
    /\b(keonhacai|nhacai|soikeo|tylekeo|bongda|cacuoc|casino|nohu|taixiu|xocdia|banca|slot)\b/i,
    /\b(linkroyal|workers\.dev\/chophim|tinyurl\.com|bit\.ly|hpasoj|154\.82\.)/i,
    /(linkvertise|ouo\.io|ouo\.press|megaurl|shorturl|1short|traffic|adbull|shrinke|exe\.io)/i,
    /(adsterra|popads|propellerads|clickadu|yllix|exoclick|trafficstars|juicyads|hilltopads|popcash|acquirecardedsullen|badlandlispyippee|astonishlandmass)/i,
    /(delivery|syndication|revenue|onclick|popunder|clickserve)/i,
    /\/ads\/(cat-|pop-|.*banner|.*gif|.*mp4|78win|78-new)/i,
    /quang[\s_-]*cao/i,
    /track(er|ing)?\./i
  ];

  function isSpamUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    if (trimmed === '' || trimmed === 'about:blank' || trimmed.startsWith('javascript:')) {
      return false;
    }
    for (const pat of SPAM_PATTERNS) {
      if (pat.test(trimmed)) return true;
    }
    return false;
  }

  // 3. Early CSS Injection for Instant Hiding of First-Party & Floating Ads
  function injectAntiAdStyles() {
    try {
      const style = document.createElement('style');
      style.textContent = `
        /* First-party ad media & links on streaming sites */
        img[src*="/ads/"],
        video[src*="/ads/"],
        source[src*="/ads/"],
        img[src*="cm88"],
        video[src*="cm88"],
        source[src*="cm88"],
        a[href*="/ads/"],
        a[href*="cm88"],
        a[href*="789b"],
        a[href*="11bet"],
        a[href*="fc88"],
        a[href*="qq88"],
        a[href*="hi88"],
        a[href*="78win"],
        a[href*="linkroyal"],
        a[href*="tinyurl.com/"],
        a[href*="bit.ly/"],
        a[href*="hpasoj"],
        a[href*="154.82."],
        a[href*="bet88"],
        a[href*="kubet"],
        a[href*="shbet"],
        a[href*="fb88"],
        a[href*="w88"],
        a[href*="new88"],
        a[href*="jun88"],
        /* Modal popups & banners by ID / attributes */
        [id*="-fixed-bottom-slot"],
        [id*="-bottom-banner"],
        [id*="demo-"][id*="-banner-"],
        [id*="demo-"][id*="-popup-"],
        [id*="banner_floating"],
        [aria-label*="quang cao" i],
        [aria-label*="quảng cáo" i],
        [aria-label*="Mo quang cao" i],
        section[aria-label="Demo popup quang cao"],
        div.fixed.inset-0.z-\\[90\\],
        div[id*="ad-bottom-fixed"],
        div[class*="ad_fixed_bottom"],
        div[class*="floating-banner"],
        div[id*="floating-banner"],
        .video-ad-wrap,
        .fxMidWrap:has(a[href*="cm88"]),
        .fxMidWrap:has(a[href*="qq88"]),
        .fxMidWrap:has(a[href*="hi88"]),
        .spot:has(a[href*="cm88"]),
        .spot:has(.video-ad-wrap),
        .spot:has(video.fxMid),
        /* Parent containers wrapping ad anchors */
        div:has(> a[href*="cm88"]),
        div:has(a[href*="cm88"]),
        div:has(> a[href*="789b"]),
        div:has(> a[href*="linkroyal"]),
        div:has(> a[href*="tinyurl.com"]),
        div:has(> a[href*="bit.ly"]),
        div:has(> a[href*="11bet"]),
        div:has(> a[href*="fc88"]),
        div:has(> a[href*="qq88"]),
        div:has(> a[href*="hi88"]),
        div:has(> a[href*="78win"]),
        div:has(> a[href*="hpasoj"]),
        div:has(> img[src*="/ads/"]),
        div:has(> video[src*="/ads/"]),
        div:has(> video:has(source[src*="/ads/"])),
        div:has(> video:has(source[src*="cm88"])) {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
          height: 0 !important;
          min-height: 0 !important;
          max-height: 0 !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          opacity: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
        }
      `;
      (document.head || document.documentElement).appendChild(style);
    } catch(e) {}
  }
  if (document.documentElement) injectAntiAdStyles();
  else document.addEventListener('DOMContentLoaded', injectAntiAdStyles, { once: true });

  // 4. Monkey-patch window.open (Kill popunders & spam redirects)
  const realOpen = window.open;
  window.open = function(url, target, features) {
    if (url && typeof url === 'string') {
      if (isSpamUrl(url)) {
        console.warn('[AdBlockShield] Blocked popunder window.open to:', url);
        return null;
      }
      try {
        if (url.startsWith('http')) {
          const u = new URL(url, location.href);
          if (u.hostname !== location.hostname) {
            const isStreamingSite = /xnhau|chophim|phim|tube|sex|porn|hentai|anime/i.test(location.hostname);
            if (isStreamingSite || isSpamUrl(u.hostname) || isSpamUrl(u.href)) {
              console.warn('[AdBlockShield] Blocked external window.open from streaming site to:', url);
              return null;
            }
          }
        }
      } catch(e) {}
    }
    if (!url || url === 'about:blank') {
      const win = realOpen.call(window, 'about:blank', target, features);
      if (win) {
        try {
          Object.defineProperty(win, 'location', {
            get() { return window.location; },
            set(newUrl) {
              if (isSpamUrl(newUrl)) {
                console.warn('[AdBlockShield] Blocked deferred popup redirect to:', newUrl);
                try { win.close(); } catch(e) {}
              } else {
                try {
                  const u = new URL(newUrl, location.href);
                  if (u.hostname !== location.hostname && (/xnhau|chophim|phim|tube|sex|porn|hentai|anime/i.test(location.hostname) || isSpamUrl(u.hostname))) {
                    console.warn('[AdBlockShield] Blocked deferred external popup to:', newUrl);
                    try { win.close(); } catch(e) {}
                    return;
                  }
                } catch(e) {}
                win.location.href = newUrl;
              }
            }
          });
        } catch(e) {}
      }
      return win;
    }
    return realOpen.apply(this, arguments);
  };

  // 5. Monkey-patch HTMLAnchorElement.prototype.click (Kill synthetic clicks)
  const realAnchorClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function() {
    const href = this.href || '';
    if (isSpamUrl(href)) {
      console.warn('[AdBlockShield] Blocked programmatic click on spam anchor:', href);
      return;
    }
    if (this.target === '_blank' && href.startsWith('http')) {
      try {
        const u = new URL(href);
        if (u.hostname !== location.hostname && isSpamUrl(u.hostname)) {
          console.warn('[AdBlockShield] Blocked synthetic click to external ad:', href);
          return;
        }
      } catch(e) {}
    }
    return realAnchorClick.apply(this, arguments);
  };

  // 6. Capture Phase Click Guardian: Prevent Click-Hijacking on Window/Document
  document.addEventListener('click', (e) => {
    let el = e.target;
    while (el && el !== document.documentElement) {
      if (el.tagName === 'A' && el.href) {
        if (isSpamUrl(el.href)) {
          console.warn('[AdBlockShield] Neutralized click on spam link:', el.href);
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return;
        }
      }
      el = el.parentElement;
    }
  }, true);

  // 7. Anti-Adblock Defuser (Fake standard honeypot objects)
  try {
    Object.defineProperties(window, {
      canRunAds: { value: true, writable: false, configurable: true },
      isAdBlocked: { value: false, writable: false, configurable: true },
      adblock: { value: false, writable: false, configurable: true },
      adblockEnabled: { value: false, writable: false, configurable: true },
      adsBlocked: { value: false, writable: false, configurable: true },
      showAds: { value: true, writable: false, configurable: true }
    });

    const noopFn = () => {};
    const fakeDetector = {
      check: noopFn,
      clearEvent: noopFn,
      on: (isDetected, cb) => {
        if (!isDetected && typeof cb === 'function') {
          try { cb(); } catch(e) {}
        }
      },
      onDetected: noopFn,
      onNotDetected: (cb) => {
        if (typeof cb === 'function') {
          try { cb(); } catch(e) {}
        }
      }
    };
    window.fuckAdBlock = fakeDetector;
    window.blockAdBlock = fakeDetector;
    window.FuckAdBlock = function() { return fakeDetector; };
    window.BlockAdBlock = function() { return fakeDetector; };
  } catch(e) {}

  // 8. Continuous DOM Cleaner: Target First-Party Ad Components & Overlays Safely
  function cleanAdsAndOverlays() {
    // A. Clean ad images, videos, and their containers
    document.querySelectorAll('img[src*="/ads/"], video[src*="/ads/"], img[src*="cm88"], video[src*="cm88"], source[src*="cm88"], source[src*="/ads/"]').forEach(media => {
      const target = media.tagName === 'SOURCE' ? (media.parentElement || media) : media;
      hideSafely(target);
      let p = target.parentElement;
      if (p && (p.tagName === 'A' || p.tagName === 'DIV' || p.tagName === 'SECTION')) {
        hideSafely(p);
        if (p.parentElement && p.parentElement.children.length === 1) {
          hideSafely(p.parentElement);
        }
      }
      const wrap = target.closest && target.closest('.video-ad-wrap, .fxMidWrap');
      if (wrap) hideSafely(wrap);
    });

    // B. Clean ad links by href
    document.querySelectorAll('a').forEach(a => {
      const href = a.href || '';
      if (isSpamUrl(href)) {
        hideSafely(a);
        if (a.parentElement && a.parentElement.children.length === 1) {
          hideSafely(a.parentElement);
        }
        const wrap = a.closest && a.closest('.video-ad-wrap, .fxMidWrap');
        if (wrap) hideSafely(wrap);
      }
    });

    // C. Clean ad slots by ID & aria-label
    document.querySelectorAll('[id*="bottom-slot"], [id*="bottom-banner"], [id*="banner-728x90"], .video-ad-wrap, [aria-label*="quang cao" i], [aria-label*="quảng cáo" i]').forEach(el => {
      hideSafely(el);
    });

    // D. Clean transparent click shields
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    document.querySelectorAll('div, a, span, section').forEach(node => {
      if (node === document.body || node === document.documentElement) return;
      if (node.hasAttribute('data-ab-shield-checked')) return;
      node.setAttribute('data-ab-shield-checked', '1');

      try {
        const style = window.getComputedStyle(node);
        const pos = style.position;
        if (pos !== 'fixed' && pos !== 'absolute') return;

        const z = parseInt(style.zIndex, 10);
        if (isNaN(z) || z < 100) return;

        if (node.querySelector('video') || node.tagName === 'VIDEO') return;

        const rect = node.getBoundingClientRect();
        const isBig = rect.width >= vw * 0.5 && rect.height >= vh * 0.4;
        const opacity = parseFloat(style.opacity);
        const text = (node.innerText || '').trim();

        if (text.length > 20 && !SPAM_PATTERNS.some(p => p.test(text))) return;
        if (node.querySelector('input, form, button[type="submit"]')) return;

        const isTrulyTransparent = opacity === 0 || (opacity <= 0.05 && text.length === 0 && node.children.length === 0);
        const isSpamLink = node.tagName === 'A' && isSpamUrl(node.href);

        if (isSpamLink || (isTrulyTransparent && z >= 1000)) {
          hideSafely(node);
        }
      } catch(e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanAdsAndOverlays, { once: true });
  } else {
    cleanAdsAndOverlays();
  }

  const observer = new MutationObserver(() => {
    cleanAdsAndOverlays();
  });

  const startObserver = () => {
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      }, { once: true });
    }
  };
  startObserver();

  console.log('[AdBlockShield] Active: First-Party Ads, Overlays & Popunders Neutralized.');
})();
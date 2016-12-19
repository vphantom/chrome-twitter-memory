/*! watcher
 * <https://github.com/vphantom/chrome-twitter-memory>
 * Copyright 2016 Stéphane Lavergne
 * Free software under MIT License: <https://opensource.org/licenses/MIT> */

'use strict';

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(clickNewTweets);

/**
 * Click "View XX new tweets" automatically
 *
 * @return {void}
 */
function clickNewTweets() {
  var button = null;

  if (document.body.scrollTop === 0) {
    button = document.querySelector('.js-new-tweets-bar');
    if (button !== null) {
      button.click();
    }
  }
}

/**
 * Initial setup
 *
 * @return {void}
 */
function startObserving() {
  // Check for new tweets immediately
  clickNewTweets();

  // Start observing
  observer.observe(document, {
    childList: true,
    subtree  : true
  });
}

// Let things settle down before getting going
window.setTimeout(startObserving, 10000);

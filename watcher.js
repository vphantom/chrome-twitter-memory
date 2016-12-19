/*! watcher
 * <https://github.com/vphantom/chrome-twitter-memory>
 * Copyright 2016 Stéphane Lavergne
 * Free software under MIT License: <https://opensource.org/licenses/MIT> */

'use strict';

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(clickNewTweets);

/**
 * Is element fully within viewport?
 *
 * See: http://stackoverflow.com/a/7557433
 *
 * @param {object} el DOM Node
 *
 * @return {bool} Whether it is fully visible
 */
function elementInViewport(el) {
  var r = el.getBoundingClientRect();

  return (
    r.top >= 0
    && r.left >= 0
    && r.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && r.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


/**
 * Click "View XX new tweets" automatically
 *
 * @return {void}
 */
function clickNewTweets() {
  var button = null;
  var i = 0;
  var tweets = document.querySelectorAll('ol.stream-items > li');
  var oldestTweet = null;

  for (i = 0; i < tweets.length; i++) {
    if (elementInViewport(tweets[i])) {
      oldestTweet = tweets[i];
    } else if (oldestTweet !== null) {
      break;
    }
  }

  // FUTURE: Here we would note its data-item-id attribute in sync storage

  // Click for new tweets
  button = document.querySelector('.js-new-tweets-bar');
  if (button !== null) {
    button.click();

    // If we clicked, restore tweet element's scroll position
    oldestTweet.scrollIntoView(false);
    window.scrollBy(0, 10);  // Encountered off-by-one without some padding

    // Because some content takes time to load, dare to correct after 2 seconds
    window.setTimeout(function() {
      oldestTweet.scrollIntoView(false);
      window.scrollBy(0, 10);
    }, 2000);
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
window.setTimeout(startObserving, 5000);

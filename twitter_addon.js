/*! twitter_addon
 * <https://github.com/vphantom/chrome-twitter-memory>
 * Copyright 2016 Stéphane Lavergne
 * Free software under MIT License: <https://opensource.org/licenses/MIT> */

'use strict';

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = null;
var seenTweet = null;
var seenTweetTop = null;
var uselessHeartbeats = 0;
var scrollInterval = null;
var interactive = true;

/**
 * Is element fully within viewport?
 *
 * See: http://stackoverflow.com/a/7557433
 *
 * @param {object} el DOM Node
 *
 * @return {bool} Whether it is fully visible
 */
function inViewport(el) {
  var r = el.getBoundingClientRect();

  return (
    r.top >= 0
    && r.left >= 0
    && r.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && r.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


/**
 * Take note of most recent fully visible tweet
 *
 * @return {void}
 */
function updateSeenTweet() {
  'use strict';
  var tweets = document.querySelectorAll('ol.stream-items > li');
  var i = 0;
  var r = null;

  for (i = 0; i < tweets.length; i++) {
    if (inViewport(tweets[i])) {
      seenTweet = tweets[i];
      break;
    }
  }

  if (seenTweet !== null) {
    r = seenTweet.getBoundingClientRect();
    seenTweetTop = r.top;
  }
}


/**
 * Restore last seen tweet's vertical position
 *
 * @return {void}
 */
function scrollToSeenTweet() {
  var r = null;

  if (seenTweet === null || seenTweetTop === null) {
    if (scrollInterval !== null) {
      stopScrolling();
    }
    return;
  }

  if (document.body.contains(seenTweet)) {
    r = seenTweet.getBoundingClientRect();
    if (r.top === seenTweetTop) {
      uselessHeartbeats++;
    } else {
      uselessHeartbeats = 0;
      window.scrollBy(0, (r.top - seenTweetTop));
    }
  } else {
    seenTweet = null;
    stopScrolling();
  }

  if (uselessHeartbeats >= 15) {
    stopScrolling();
  }
}


/**
 * Scroll actively until 1.5s of stability
 *
 * @return {void}
 */
function scrollActively() {
  uselessHeartbeats = 0;
  scrollInterval = setInterval(scrollToSeenTweet, 42);
}


/**
 * Stop scrolling actively
 *
 * @return {void}
 */
function stopScrolling() {
  clearInterval(scrollInterval);
  scrollInterval = null;
  seenTweetTop = null;
}


/**
 * Click "View XX new tweets" automatically
 *
 * @param {array} mutations Array of MutationRecord
 *
 * @return {void}
 */
function handleMutations(mutations) {
  var newTweets = false;

  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      // Is the node a new tweet?
      if (node.nodeType === 1
          && node.matches('ol.stream-items > li.stream-item')
        ) {
        newTweets = true;
      }

      // Is the node a new View button?
      if (node.nodeType === 1 && node.classList.contains('js-new-tweets-bar')) {
        if (interactive && inViewport(node)) {
          updateSeenTweet();
          node.click();
          scrollActively();
        } else {
          interactive = false;
          node.addEventListener('mousedown', function() {
            interactive = true;
            updateSeenTweet();
            scrollActively();
          });
        }
      }
    });
  });

  if (newTweets) {
    setTimeout(scrollToSeenTweet, 0);
  }
}


/**
 * Initial setup
 *
 * @return {void}
 */
function startObserving() {
  observer = new MutationObserver(handleMutations);
  observer.observe(document, {
    childList: true,
    subtree  : true
  });
}

// Let things settle down before getting going
window.setTimeout(startObserving, 5000);

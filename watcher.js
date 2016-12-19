/*! watcher
 * <https://github.com/vphantom/chrome-twitter-memory>
 * Copyright 2016 Stéphane Lavergne
 * Free software under MIT License: <https://opensource.org/licenses/MIT> */

'use strict';

/**
 * Click "View XX new tweets" automatically
 *
 * This part inspired by https://github.com/mthie/refresh-for-twitter
 *
 * @return {void}
 */
function clickNewTweets() {
  var bars;

  if (document.readyState !== 'interactive' && document.body.scrollTop === 0) {
    bars = document.getElementsByClassName('js-new-tweets-bar');
    if (bars.length > 0) {
      bars[0].click();
    }
  }
  window.setTimeout(clickNewTweets, 2000);
}

window.setTimeout(clickNewTweets, 10000);

/* global chrome */

'use strict';

function handleTab(tabId, changeInfo, tab) {
  var a = document.createElement('a');

  a.href = tab.url;
  if (a.hostname === 'twitter.com') {
    chrome.pageAction.show(tabId);
  }
}

chrome.tabs.onUpdated.addListener(handleTab);
chrome.tabs.onHighlighted.addListener(handleTab);

# Twitter Memory

Timeline refresh and memory for Twitter

* Every 2 seconds (after an initial 10), checks for Twitter's "View XX new tweets" button and clicks it whenever it appears.

* When loading new tweets, the currently lowest tweet fully into view is kept into view, thus minimizing scrolling so you can continue reading where you left off.

* When you first load Twitter, your last known most recent viewed tweet is scrolled down to, for up to 5 refreshes (as if you had pressed `Page Down` until it comes into view), so you can continue reading where you left off.

* The last tweet you saw is synchronized across all your Chrome browsers with this extension installed, so you can for example close Twitter on your Chromebook and continue on your desktop.

## Current Status

I am currently developing the initial release.  So far:

* [x] Wait 10 seconds to activate
* [x] Re-check every 2 seconds
* [ ] Refactor: event-driven instead of every 2 seconds
* [ ] Discover oldest visible tweet during checks
* [ ] Save and synchronize oldest visible tweet ID during checks
* [ ] Scroll to last position shortly after simulating click
* [ ] Scroll to last position up to 5x when page is loaded

## Acknowledgements

The initial concept for clicking the "View XX new tweets" button programmatically was inspired by Martin Thielecke's [Refresh for Twitter extension](https://github.com/mthie/refresh-for-twitter).  Twitter Memory was written from scratch in order to use a more modern coding style, avoid jQuery and implement the synced timeline memory.

## MIT License

Copyright (c) 2016 Stephane Lavergne <https://github.com/vphantom>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const initializedRoots = new WeakSet();

function initBlogsPage(root = document) {
  if (!root || initializedRoots.has(root)) {
    return;
  }

  const topicItems = Array.from(root.querySelectorAll('.topic-item'));
  const topicPages = Array.from(root.querySelectorAll('.topics-page'));
  const articleViews = Array.from(root.querySelectorAll('.article-view'));
  const topicsTrack = root.querySelector('#topicsTrack');
  const pageText = root.querySelector('#topicPage');
  const nextBtn = root.querySelector('#topicNext');
  const prevBtn = root.querySelector('#topicPrev');
  const articlePane = root.querySelector('.article-pane');

  if (!topicItems.length || !topicsTrack || !pageText || !nextBtn || !prevBtn) {
    return;
  }

  initializedRoots.add(root);

  let activeItemIndex = 0;
  let scrollTimer = null;

  function pageWidth() {
    return topicsTrack.clientWidth;
  }

  function getCurrentPageIndex() {
    if (!topicPages.length || pageWidth() <= 0) return 0;
    return Math.max(0, Math.min(Math.round(topicsTrack.scrollLeft / pageWidth()), topicPages.length - 1));
  }

  function getPageIndexForItem(item) {
    const page = item.closest('.topics-page');
    return Math.max(0, topicPages.indexOf(page));
  }

  function showArticle(articleKey) {
    articleViews.forEach((view) => {
      view.classList.toggle('active', view.dataset.article === articleKey);
    });
  }

  function setActiveItem(index, shouldScroll = true) {
    activeItemIndex = Math.max(0, Math.min(index, topicItems.length - 1));

    topicItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === activeItemIndex);
    });

    const selectedItem = topicItems[activeItemIndex];
    if (!selectedItem) return;

    showArticle(selectedItem.dataset.article);

    if (shouldScroll) {
      const pageIndex = getPageIndexForItem(selectedItem);
      topicsTrack.scrollTo({
        left: pageIndex * pageWidth(),
        behavior: 'smooth',
      });
    }

    const indicatorPage = getPageIndexForItem(selectedItem) + 1;
    pageText.textContent = `${indicatorPage} / ${Math.max(topicPages.length, 1)}`;
  }

  prevBtn.addEventListener('click', () => {
    const currentPage = getCurrentPageIndex();
    const target = Math.max(0, currentPage - 1);
    topicsTrack.scrollTo({ left: target * pageWidth(), behavior: 'smooth' });
    pageText.textContent = `${target + 1} / ${Math.max(topicPages.length, 1)}`;
  });

  nextBtn.addEventListener('click', () => {
    const currentPage = getCurrentPageIndex();
    const target = Math.min(topicPages.length - 1, currentPage + 1);
    topicsTrack.scrollTo({ left: target * pageWidth(), behavior: 'smooth' });
    pageText.textContent = `${target + 1} / ${Math.max(topicPages.length, 1)}`;
  });

  topicItems.forEach((item, index) => {
    item.addEventListener('click', () => setActiveItem(index));
  });

  topicsTrack.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const pageIndex = getCurrentPageIndex();
      pageText.textContent = `${pageIndex + 1} / ${Math.max(topicPages.length, 1)}`;
    }, 80);
  });

  if (articlePane) {
    const shouldTrapArticleScroll = () => !window.matchMedia('(max-width: 960px)').matches;

    articlePane.addEventListener('wheel', (event) => {
      if (shouldTrapArticleScroll()) {
        event.stopPropagation();
      }
    }, { passive: true });

    articlePane.addEventListener('touchmove', (event) => {
      if (shouldTrapArticleScroll()) {
        event.stopPropagation();
      }
    }, { passive: true });
  }

  window.addEventListener('resize', () => {
    setActiveItem(activeItemIndex);
  });

  setActiveItem(0);
}

window.initBlogsPage = initBlogsPage;

if (new URLSearchParams(window.location.search).get('embed') === '1') {
  document.body.classList.add('embed-mode');
}

initBlogsPage(document);

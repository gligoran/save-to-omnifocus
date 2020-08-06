const contextMenuId = 'save-to-omnifocus';

chrome.contextMenus.create({
  id: contextMenuId,
  title: 'Save to OmniFocus',
  contexts: ['page', 'selection', 'link']
});

function saveToOmniFocus(task) {
  const url = task.name
    ? `omnifocus:///add?name=${encodeURIComponent(task.name)}&note=${encodeURIComponent(task.note)}`
    : `omnifocus:///add?name=${encodeURIComponent(task.note)}`;

  chrome.tabs.create({
    url,
    active: false
  });
}

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(
    tab.tabId,
    { file: 'tabinfo.js' },
    function (result) {
      if (result && result.length) {
        saveToOmniFocus(result[0]);
      } else {
        saveToOmniFocus({
          name: window.getSelection().toString() || document.title,
          note: window.location.toString()
        });
      }
    }
  );
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === contextMenuId) {
    const task = {
      name: info.selectionText || tab.title,
      note: info.linkUrl || info.pageUrl
    };
    saveToOmniFocus(task);
  }
});

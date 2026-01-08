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

chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ['tabinfo.js']
    },
    function (results) {
      if (results && results.length && results[0].result) {
        saveToOmniFocus(results[0].result);
      } else {
        saveToOmniFocus({
          name: tab.title,
          note: tab.url
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

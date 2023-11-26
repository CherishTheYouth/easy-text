import { Storage } from "@plasmohq/storage"
import type { Template } from './Types'
import { forEach, find } from 'lodash-unified'

export {}

const storage = new Storage({
  area: 'local'
})

chrome.runtime.onInstalled.addListener(async () => {
  const storedTemplates = await storage.get('easy-text') as unknown as [Template]
  console.log('chrome', chrome, storedTemplates)
  if (storedTemplates) {
    forEach(storedTemplates, (template: Template) => {
      const { name, content } = template
      chrome.contextMenus.create({
        id: name,
        title: name,
        type: 'normal',
        contexts: ['editable']
      })
    })
  }
});

storage.watch({
  'easy-text': (s) => {
    forEach(s.newValue, (template: Template) => {
      const { name, content } = template
      chrome.contextMenus.create({
        id: name,
        title: name,
        type: 'normal',
        contexts: ['editable']
      })
    })
  }
})

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (item, tab) => {
  console.log('item', item, tab)
  const storedTemplates = await storage.get('easy-text')
  if (storedTemplates) {
    const message = find(storedTemplates, (template) => template.name === item.menuItemId)?.content
    await chrome.tabs.sendMessage(tab.id, message);
  }
});

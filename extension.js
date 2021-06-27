window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

// Create context menu
browser.contextMenus.create({
    id: 'dutch-waze-kit',
    title: "Dutch Waze Kit",
    contexts: ["page"]
});

browser.contextMenus.create({
    id: 'dwk-open-in-bag',
    title: "Openen in BAG",
    parentId: 'dutch-waze-kit'
});

browser.contextMenus.create({
    id: 'dwk-open-in-melvin',
    title: "Openen in Melvin",
    parentId: 'dutch-waze-kit'
});

browser.contextMenus.create({
    id: 'dwk-open-in-ruimtelijke-plannen',
    title: "Openen in Ruimtelijke Plannen",
    parentId: 'dutch-waze-kit'
});

browser.contextMenus.create({
    id: 'dwk-open-in-google-maps',
    title: "Openen in Google Maps",
    parentId: 'dutch-waze-kit'
});

browser.contextMenus.create({
    id: 'dwk-open-in-mapillary',
    title: "Openen in Mapillary",
    parentId: 'dutch-waze-kit'
});

// browser.contextMenus.create({
//     type: 'separator',
//     parentId: 'dutch-waze-kit'
// });

// Called when the user clicks on a context menu item
browser.contextMenus.onClicked.addListener(function(info, tab) {
    switch(info.menuItemId) {
        case 'dwk-open-in-bag': {
            browser.tabs.sendMessage(tab.id, { text: 'open-in-bag' });
            break;
        }
        case 'dwk-open-in-melvin': {
            browser.tabs.sendMessage(tab.id, { text: 'open-in-melvin' });
            break;
        }
        case 'dwk-open-in-ruimtelijke-plannen': {
            browser.tabs.sendMessage(tab.id, { text: 'open-in-ruimtelijke-plannen' });
            break;
        }
        case 'dwk-open-in-google-maps': {
            browser.tabs.sendMessage(tab.id, { text: 'open-in-google-maps' });
            break;
        }
        case 'dwk-open-in-mapillary': {
            browser.tabs.sendMessage(tab.id, { text: 'open-in-mapillary' });
            break;
        }
    }
});

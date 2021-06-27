let openClosureInMelvin = {
    enabled: true,

    init() {
        document.addEventListener('click',(e) => {
            if(e.target && e.target.classList.contains('closures-tab')) {
                this.addMenuItems();
            }
        });
    },

    addMenuItems() {
        document.querySelectorAll('.closure-item').forEach((closure) => {
            let closureTitle = closure.querySelector('.closure-title').innerText;

            let melvinID = this.getMelvinIDFromClosureTitle(closureTitle);

            // No melvin ID can be found
            if(melvinID == null) return;

            // The menu item already exists
            if(closure.querySelector('.open-in-melvin') !== null) return;

            let menu = closure.querySelector('wz-menu');

            let menuItem = document.createElement('a');
            menuItem.innerText = 'Open in Melvin';
            menuItem.className = 'dwk-closure-item open-in-melvin';
            menuItem.addEventListener('click', () => {
                window.open('https://melvin.ndw.nu/public/situation;id=' + melvinID, '_blank');
            });

            menu.appendChild(menuItem);
        });
    },

    getMelvinIDFromClosureTitle(title) {
        let match = title.match(/melvin ([0-9]+)/i);

        if(match == null) return null;

        return parseInt(match[1]);
    }
};

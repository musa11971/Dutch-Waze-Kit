let dwkContextMenu = {
    enabled: true,

    btnEl: null,
    contextMenuEl: null,

    init() {
        this.btnEl = document.createElement('button');
        this.btnEl.classList.add('dwk-cm-trigger');
        this.btnEl.style.backgroundImage = 'url(' + dwk.getFileURL('img/icon@128.png') + ')';

        this.contextMenuEl = document.createElement('ul');
        this.contextMenuEl.classList.add('dwk-cm');

        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-bag">Openen in BAG</button></li>`;
        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-melvin">Openen in Melvin</button></li>`;
        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-ruimtelijke-plannen">Openen in Ruimtelijke Plannen</button></li>`;
        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-satelliet-data-portaal">Openen in Satelliet Data Portaal</button></li>`;
        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-google-maps">Openen in Google Maps</button></li>`;
        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-mapillary">Openen in Mapillary</button></li>`;
        this.contextMenuEl.innerHTML += `<li><button type="button" data-action="dwk-open-in-wegstatus">Openen in Wegstatus</button></li>`;

        this.btnEl.appendChild(this.contextMenuEl);
        document.body.appendChild(this.btnEl);

        this.initEventListeners();
    },

    toggleContextMenu() {
        this.contextMenuEl.classList.toggle('is-open');
    },

    hideContextMenu() {
        this.contextMenuEl.classList.remove('is-open');
    },

    initEventListeners() {
        this.btnEl.addEventListener('click', this.toggleContextMenu.bind(this));

        this.contextMenuEl.addEventListener('click', (e) => {
            switch(e.target.dataset.action) {
                case 'dwk-open-in-bag' : return openInBAG.openBAGViewer();
                case 'dwk-open-in-melvin' : return openInMelvin.openMelvin();
                case 'dwk-open-in-ruimtelijke-plannen' : return openInRuimtelijkePlannen.openRuimtelijkePlannen();
                case 'dwk-open-in-satelliet-data-portaal' : return openInSatellietDataPortaal.openSatellietDataPortaal();
                case 'dwk-open-in-google-maps' : return openInGoogleMaps.openGoogleMaps();
                case 'dwk-open-in-mapillary' : return openInMapillary.openMapillary();
                case 'dwk-open-in-wegstatus' : return openInWegstatus.openWegstatus();
                default : return;
            }
        });

        // Close the context menu when pressing the escape key
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === 'escape') {
                this.hideContextMenu();
            }
        });

        // Close the context menu when clicking outside of it
        window.addEventListener('click', (e) => {
            if (!this.btnEl.contains(e.target)) {
                this.hideContextMenu();
            }
        });
    }
};

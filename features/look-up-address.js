let lookUpAddress = {
    enabled: true,

    lastAddressValue: null,
    googleButton: null,
    mapsButton: null,
    visible: false,
    changeCheckTimer: null,

    addressSelector: '.tab-content span.full-address',

    init() {
        CreationObserver().forElement(this.addressSelector, (created) => {
            if(created) {
                this.addLookUpButtons();
            }
            else {
                this.destroy();
            }
        });
    },

    addLookUpButtons() {
        if(this.lookUpButtonsAdded()) return;

        this.updateAddressValue();

        // Add the buttons
        let googleButton = document.createElement('a');
        googleButton.className = 'dwk-look-up-address-button';
        googleButton.style.backgroundImage = 'url(' + dwk.getFileURL('img/google.png') + ')';
        googleButton.title = 'Adres opzoeken op Google';
        googleButton.target = '_blank';

        let mapsButton = document.createElement('a');
        mapsButton.className = 'dwk-look-up-address-button';
        mapsButton.style.backgroundImage = 'url(' + dwk.getFileURL('img/maps.png') + ')';
        mapsButton.title = 'Adres opzoeken op Google Maps';
        mapsButton.target = '_blank';

        googleButton.addEventListener('mouseenter', this.updateURLs.bind(this));
        mapsButton.addEventListener('mouseenter', this.updateURLs.bind(this));

        let parent = document.querySelector(this.addressSelector).parentElement;
        parent.style.position = 'relative';
        parent.append(googleButton);
        parent.append(mapsButton);

        // Make both buttons the same size
        googleButton.style.height = (parent.clientHeight / 2) + 'px';
        mapsButton.style.height = (parent.clientHeight / 2) + 'px';

        // Offset the maps button so that they are not stacked
        mapsButton.style.top = (parent.clientHeight / 2) + 'px';

        this.googleButton = googleButton;
        this.mapsButton = mapsButton;

        // Start the timer to check if the value changed
        this.changeCheckTimer = setInterval(this.checkIfAddressChanged.bind(this), 1000);

        dwk.log('Added address look up buttons.');
    },

    destroy() {
        clearInterval(this.changeCheckTimer);
        this.changeCheckTimer = null;
    },

    checkIfAddressChanged() {
        let oldValue = this.lastAddressValue;

        this.updateAddressValue();

        // The address changed
        if(oldValue !== this.lastAddressValue) {
            dwk.log('Address changed to ' + this.lastAddressValue + '!');

            this.addLookUpButtons();
            return
        }

        this.updateURLs();
    },

    updateAddressValue() {
        this.lastAddressValue = document.querySelector(this.addressSelector).innerText;
    },

    // Checks whether the look up buttons were added
    lookUpButtonsAdded() {
        return document.querySelector('.dwk-look-up-address-button') !== null;
    },

    // Updates the URLs to match the address
    updateURLs() {
        this.googleButton.href = 'https://www.google.com/search?q=' + this.lastAddressValue;
        this.mapsButton.href = 'https://www.google.com/maps/search/' + this.lastAddressValue;
    }
};

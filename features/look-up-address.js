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

        document.querySelector(this.addressSelector).parentElement.append(googleButton);
        document.querySelector(this.addressSelector).parentElement.append(mapsButton);

        // Make both buttons the same size
        googleButton.style.width = (googleButton.clientHeight + 4) + 'px';
        mapsButton.style.width = (googleButton.clientHeight + 4) + 'px';
        mapsButton.style.height = googleButton.clientHeight + 'px';

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

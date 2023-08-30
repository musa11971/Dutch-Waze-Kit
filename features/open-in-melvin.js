let openInMelvin = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-melvin')
                this.openMelvin();
        });
    },

    openMelvin() {
        // Get coordinates
        let coordinates = dwk.getCurrentMapCoordinates();

        // Create and open URL
        let url = 'https://melvin.ndw.nu/public?sw=' + coordinates.y + ',' + coordinates.x + '&ne=' + coordinates.y + ',' + coordinates.x;
        window.open(url, '_blank');
    }
};

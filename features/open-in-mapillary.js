let openInMapillary = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-mapillary')
                this.openMapillary();
        });
    },

    openMapillary() {
        // Get coordinates
        let coordinates = dwk.getCurrentMapCoordinates();

        // Create and open URL
        let url = 'https://www.mapillary.com/app/?lat=' + coordinates.y + '&lng=' + coordinates.x + '&z=15';
        window.open(url, '_blank');
    }
};

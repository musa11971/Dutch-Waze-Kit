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

        // Find correct zoom level
        let zoom = dwk.getCurrentMapZoomLevel();

        zoom = dwk.convertZoomLevel(zoom, dwk.zoomLevels.waze, dwk.zoomLevels.mapillary);

        // Create and open URL
        let url = 'https://www.mapillary.com/app/?lat=' + coordinates.y + '&lng=' + coordinates.x + '&z=' + zoom;
        window.open(url, '_blank');
    }
};

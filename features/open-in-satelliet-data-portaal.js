let openInSatellietDataPortaal = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-satelliet-data-portaal')
                this.openSatellietDataPortaal();
        });
    },

    openSatellietDataPortaal() {
        // Get coordinates
        let coordinates = dwk.getCurrentMapCoordinates();

        // Find correct zoom level
        let zoom = dwk.getCurrentMapZoomLevel();

        zoom = dwk.convertZoomLevel(zoom, dwk.zoomLevels.waze, dwk.zoomLevels.satellietDataPortaal);

        // Create and open URL
        let url = 'https://viewer.satellietdataportaal.nl/@' + coordinates.y + ',' + coordinates.x + ',' + zoom;
        window.open(url, '_blank');
    }
};

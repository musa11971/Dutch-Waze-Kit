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
        let url = 'https://www.satellietdataportaal.nl/?base=brtachtergrondkaart&loc=' + coordinates.y + '%2C' + coordinates.x + '%2C' + zoom + 'z&overlay=mos-0';
        window.open(url, '_blank');
    }
};

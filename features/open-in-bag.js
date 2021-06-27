let openInBAG = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-bag')
                this.openBAGViewer();
        });
    },

    openBAGViewer() {
        // Transform coordinates
        let transformedCoordinates = proj4('EPSG:4326', 'EPSG:28992', dwk.getCurrentMapCoordinates());

        // Find correct zoom level
        let zoom = dwk.getCurrentMapZoomLevel();

        if(zoom > 7) zoom = 7;

        // Create and open URL
        let url = 'https://bagviewer.kadaster.nl/lvbag/bag-viewer/index.html#?geometry.x=' + transformedCoordinates.x + '&geometry.y=' + transformedCoordinates.y + '&zoomlevel=' + zoom;
        window.open(url, '_blank');
    }
};

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

        // Create and open URL
        let url = 'https://bagviewer.kadaster.nl/lvbag/bag-viewer/?geometry.x=' + transformedCoordinates.x + '&geometry.y=' + transformedCoordinates.y + '&zoomlevel=13.776830703977048';
        window.open(url, '_blank');
    }
};

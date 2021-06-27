let openInRuimtelijkePlannen = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-ruimtelijke-plannen')
                this.openRuimtelijkePlannen();
        });
    },

    openRuimtelijkePlannen() {
        // Transform coordinates
        let transformedCoordinates = proj4('EPSG:4326', 'EPSG:28992', dwk.getCurrentMapCoordinates());

        // Create and open URL
        let url = 'https://www.ruimtelijkeplannen.nl/viewer/view?x=' + transformedCoordinates.x + '&y=' + transformedCoordinates.y;
        window.open(url, '_blank');
    }
};

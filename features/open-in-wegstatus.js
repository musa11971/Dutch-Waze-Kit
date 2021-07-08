let openInWegstatus = {
    enabled: true,

    init() {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.text === 'open-in-wegstatus')
                this.openWegstatus();
        });
    },

    openWegstatus() {
        // Transform coordinates
        let coordinates = dwk.getCurrentMapCoordinates();
        coordinates.y = coordinates.y.toString().replace('.', 'd');
        coordinates.x = coordinates.x.toString().replace('.', 'd');

        // Find correct zoom level
        let zoom = dwk.getCurrentMapZoomLevel();

        if(zoom > 7) zoom = 7;

        // Create and open URL
        let url = 'https://www.wegstatus.nl/dashboardnl/lat=' + coordinates.y + '|lon=' + coordinates.x;
        window.open(url, '_blank');
    }
};

let dwkPreferences = {
    enabled: true,

    sidePanelElement: null,

    init() {
        // Observe the side panel preferences for when it becomes active
        this.sidePanelElement = document.getElementById('sidepanel-prefs');

        ClassObserver().forElement(this.sidePanelElement, 'active', (present) => {
            if(present) {
                this.createPreferences();
            }
            else {
                this.destroyPreferences();
            }
        });
    },

    // Create the preferences
    createPreferences() {
        if(this.preferencesAreCreated())
            return;

        let dwkPreferences = document.createElement('div');
        dwkPreferences.id = 'dwk-preferences';

        // Create title
        let title = document.createElement('h4');
        title.innerText = 'Dutch Waze Kit';
        dwkPreferences.append(title);

        // Create feature list
        let featureList = this.createFeatureList();
        dwkPreferences.append(featureList);

        // Create version label
        let version = document.createElement('span');
        version.innerText = '🔧 versie ' + dwk.version + ' - ontwikkeld door Mewsa.';
        version.title = 'Klik om debug informatie te kopieren';
        version.className = 'dwk-version';
        version.addEventListener('click', this.copyDebugInfo.bind(this));

        dwkPreferences.append(version);

        // Append the preferences
        this.sidePanelElement.append(dwkPreferences);

        dwk.log('Preferences created.');
    },

    // Removes the preferences
    destroyPreferences() {
        if(!this.preferencesAreCreated())
            return;

        document.getElementById('dwk-preferences').remove();
        dwk.log('Preferences destroyed.');
    },

    // Checks whether the preferences are created
    preferencesAreCreated() {
        return document.getElementById('dwk-preferences') !== null;
    },

    // Creates the feature list element
    createFeatureList() {
        let div = document.createElement('div');

        // Functions text span
        let span = document.createElement('span');
        span.innerText = 'Functionaliteiten:';
        div.appendChild(span);

        // Create the list
        let list = document.createElement('ul');

        dwk.features.forEach((feature) => {
            if(feature.hidden) return;

            let listItem = document.createElement('li');

            // Checkbox disabled because features are currently always enabled
            /*let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = feature.feature.enabled;

            if(!feature.canBeDisabled) {
                checkbox.disabled = true;
                checkbox.title = 'Deze functionaliteit kan momenteel niet worden uitgeschakeld.';
            }

            listItem.appendChild(checkbox);
            */

            let featureName = document.createElement('span');
            featureName.innerText = ' ' + feature.name + ' ';

            listItem.appendChild(featureName);

            if(feature.description != null) {
                let featureHelp = document.createElement('span');
                featureHelp.innerHTML = '[ ? ]';
                featureHelp.title = feature.description;
                featureHelp.className = 'dwk-feature-description';
                listItem.appendChild(featureHelp);
            }

            list.appendChild(listItem);
        });

        div.appendChild(list);

        return div;
    },

    // Copy debug info to clipboard
    copyDebugInfo() {
        let logText = dwk.logHistory.join("\r\n");
        dwk.copyToClipboard(logText);

        dwk.toast('success', 'Debug informatie is gekopieerd.');
    }
};

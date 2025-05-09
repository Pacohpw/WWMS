console.log('displayDetails.js: Loaded');

function displayPieChartForAgeAndGender(key, value, dataContainer) {
    console.log(`displayPieChartForAgeAndGender: Rendering ${key}`, value);
    try {
        if (!dataContainer) {
            console.error('dataContainer is null or undefined');
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.id = `chart-${key}`;
        canvas.className = 'pie-chart';
        dataContainer.appendChild(canvas);

        const labels = Object.keys(value);
        const data = Object.values(value);

        if (!window.Chart) {
            console.error('Chart.js is not loaded');
            return;
        }

        new Chart(canvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'],
                    borderColor: '#ffffff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: key.replace('_', ' ').toUpperCase(), color: '#ffffff' }
                }
            }
        });
        console.log(`displayPieChartForAgeAndGender: Successfully rendered ${key}`);
    } catch (error) {
        console.error(`displayPieChartForAgeAndGender: Error rendering ${key}`, error);
    }
}

function displayCountryData(countryData, panel, countryName, dataContainer) {
    console.log('displayCountryData: Starting', countryData);
    try {
        if (!dataContainer) {
            console.error('displayCountryData: dataContainer is null or undefined');
            return;
        }
        // Create a list for fields
        const dataList = document.createElement('ul');
        dataList.className = 'other-data';

        // Fields to visualize as pie charts
        const pieChartFields = ['age_distribution', 'gender_ratio'];
        console.log('1');

        // Handle each field
        for (const [key, value] of Object.entries(countryData)) {
            if (key === 'name') {
                console.log('Skipping name');
                continue;
            }

            // Render pie charts for age_distribution and gender_ratio
            if (pieChartFields.includes(key) && typeof value === 'object' && value !== null) {
                displayPieChartForAgeAndGender(key, value, dataContainer);
            }

            // Display all fields (including age_distribution and gender_ratio) in the list
            const li = document.createElement('li');
            const displayValue = typeof value === 'object' && value !== null
                ? JSON.stringify(value, null, 2)
                : value ?? 'N/A';
            li.textContent = `${key}: ${displayValue}`;
            dataList.appendChild(li);
        }

        // Append the list of fields
        if (dataList.children.length > 0) {
            console.log('Appending fields list');
            dataContainer.appendChild(dataList);
        }

        // Show the panel
        console.log('Showing panel');
        panel.classList.add('visible');
        console.log('displayCountryData: Completed');
    } catch (error) {
        console.error('displayCountryData: Error', error);
    }
}
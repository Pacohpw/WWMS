function displayCountryData(countryData) {
    const panel = document.getElementById('country-panel');
    const countryName = document.getElementById('country-name');
    const dataList = document.getElementById('country-data');

    // Set country name
    countryName.textContent = countryData.name || 'Unknown Country';

    // Clear previous data
    dataList.innerHTML = '';

    // Display all fields
    for (const [key, value] of Object.entries(countryData)) {
        if (key !== 'name' && key !== 'age_distribution' && key !== 'gender_ratio' && key !== 'social_media_usage' && key !== 'literacy_rate') {
            const li = document.createElement('li');
            const keySpan = document.createElement('span');
            keySpan.className = 'data-key';
            keySpan.textContent = `${key}:`;
            li.appendChild(keySpan);

            if (typeof value === 'object' && value !== null) {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                summary.innerHTML = ` View ${key.replace(/_/g, ' ')}`;
                details.appendChild(summary);

                const table = document.createElement('table');
                table.className = 'data-table';
                
                // Create table header
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                headerRow.innerHTML = '<th>Category</th><th>Details</th>';
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Create table body
                const tbody = document.createElement('tbody');
                for (const [nestedKey, nestedValue] of Object.entries(value)) {
                    const row = document.createElement('tr');
                    const keyCell = document.createElement('td');
                    const valueCell = document.createElement('td');

                    keyCell.textContent = nestedKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    
                    if (Array.isArray(nestedValue)) {
                        valueCell.innerHTML = nestedValue.map(item => 
                            `<span class="array-value">${item}</span>`
                        ).join(' ');
                    } else if (typeof nestedValue === 'number') {
                        valueCell.innerHTML = `<span class="number-value">${nestedValue.toLocaleString()}</span>`;
                    } else if (typeof nestedValue === 'object' && nestedValue !== null) {
                        valueCell.textContent = JSON.stringify(nestedValue, null, 2);
                    } else {
                        valueCell.textContent = nestedValue;
                    }

                    row.appendChild(keyCell);
                    row.appendChild(valueCell);
                    tbody.appendChild(row);
                }
                table.appendChild(tbody);
                details.appendChild(table);
                li.appendChild(details);
                }else {
                // Handle primitive values and arrays
                const valueSpan = document.createElement('span');
                valueSpan.className = 'data-value';
                
                if (Array.isArray(value)) {
                    valueSpan.innerHTML = value.map(item => 
                        `<span class="array-value">${item}</span>`
                    ).join(' ');
                } else if (typeof value === 'number') {
                    valueSpan.innerHTML = `<span class="number-value">${value.toLocaleString()}</span>`;
                } else {
                    valueSpan.textContent = ` ${value ?? 'N/A'}`;
                }
                
                li.appendChild(valueSpan);
            }
            
            dataList.appendChild(li);
        }
    }

    // Render pie charts
    renderPieChart('age_distribution', countryData.age_distribution, 'Age Distribution');
    const literacyRateData = {
        'Literate': countryData.literacy_rate,
        'Illiterate': 100 - countryData.literacy_rate
    };
    renderPieChart('literacy_rate', literacyRateData, 'Literacy Rate');
    renderPieChart('gender_ratio', countryData.gender_ratio, 'Gender Ratio');
    renderPieChart('social_media_usage', { 'Social Media': countryData.social_media_usage.Distribution }, 'Social Media Usage');

    // Show the panel
    panel.classList.add('visible');
}

let charts = {};

// Function to render pie charts
function renderPieChart(chartId, data, title) {
    const ctx = document.getElementById(chartId).getContext('2d');

    if (charts[chartId]) {
        charts[chartId].destroy();
    }

    const total = Object.values(data).reduce((a, b) => a + b, 0);
    const modifiedData = { ...data }; 

    
    if (total < 100) {
        modifiedData[""] = 100 - total; 
    }

    const chartData = {
        labels: Object.keys(modifiedData),
        datasets: [{
            data: Object.values(modifiedData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#000000'],
        }]
    };

        charts[chartId] = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                },
            }
        }
    });
}

function displayCountryData(countryData) {
    const panel = document.getElementById('country-panel');
    const countryName = document.getElementById('country-name');
    const dataList = document.getElementById('country-data');

    // Set country name
    countryName.textContent = countryData.name || 'Unknown Country';

    // Clear previous data
    dataList.innerHTML = '';

    // Display all fields
    Object.entries(countryData).forEach(([key, value]) => {
        if (!['name', 'age_distribution', 'gender_ratio', 'social_media_usage', 'literacy_rate'].includes(key)) {
            const li = createDataItem(key, value);
            dataList.appendChild(li);
        }
    });

    renderCharts(countryData);

    panel.classList.add('visible');
}

function createDataItem(key, value) {
    const li = document.createElement('li');
    const keySpan = document.createElement('span');
    keySpan.className = 'data-key';
    keySpan.textContent = `${key}:`;
    li.appendChild(keySpan);

    if (isObject(value)) {
        const details = createDetailsSection(key, value);
        li.appendChild(details);
    } else {
        const valueSpan = createValueSpan(value);
        li.appendChild(valueSpan);
    }

    return li;
}

function createValueSpan(value) {
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
    
    return valueSpan;
}

function createDetailsSection(key, value) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.innerHTML = ` View ${key.replace(/_/g, ' ')}`;
    details.appendChild(summary);

    // Pass different titles 
    const titles = {
        terrain_features: ['Feature', 'Details'],
        rare_resources: ['Resource', 'Million barrels <br> 100 million tons'],
        cultural_features: ['Cultural Aspect', 'Details'],
        social_groups: ['Group', 'Details']
    };
    
    const tableTitles = titles[key] || ['Category', 'Details'];
    const table = createDataTable(value, tableTitles);
    details.appendChild(table);
    
    return details;
}

function createDataTable(value, titles) {
    const table = document.createElement('table');
    table.className = 'data-table';

    // Create table header 
    const thead = createTableHeader(titles);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        const row = document.createElement('tr');
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');

        keyCell.textContent = formatKey(nestedKey);
        valueCell.innerHTML = formatValue(nestedValue);
        
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
}

function createTableHeader(titles) {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    titles.forEach(title => {
        const th = document.createElement('th');
        th.innerHTML = title;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    return thead;
}

function formatKey(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatValue(value) {
    if (Array.isArray(value)) {
        return value.map(item => `<span class="array-value">${item}</span>`).join(' ');
    } else if (typeof value === 'number') {
        return `<span class="number-value">${value.toLocaleString()}</span>`;
    } else if (isObject(value)) {
        return JSON.stringify(value, null, 2);
    } else {
        return value ?? 'N/A';
    }
}

function isObject(value) {
    return typeof value === 'object' && value !== null;
}

function renderCharts(countryData) {
    renderPieChart('age_distribution', countryData.age_distribution, 'Age Distribution');
    
    const literacyRateData = {
        'Literate': Number(countryData.literacy_rate),
        'Illiterate': 100 - Number(countryData.literacy_rate)
    };
    renderPieChart('literacy_rate', literacyRateData, 'Literacy Rate');
    renderPieChart('gender_ratio', countryData.gender_ratio, 'Gender Ratio');
    renderPieChart('social_media_usage', { 'Social Media': countryData.social_media_usage.Distribution }, 'Social Media Usage');
}

let charts = {};

function renderPieChart(chartId, data, title) {
    const ctx = document.getElementById(chartId).getContext('2d');

    if (charts[chartId]) {
        charts[chartId].destroy();
    }

    const total = Object.values(data).reduce((a, b) => a + b, 0);
    const modifiedData = total < 100 ? { ...data, "": 100 - total } : { ...data };
    
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

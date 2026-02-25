// PMR Dashboard - Interactive Functionality for SAWTST LLC
// Built for Costpoint integration (APIs will be added later)

let currentFormData = {};
let financialChart = null;
let slideFinancialChart = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeTabs();
    initializeFormCalculations();
    initializeCharts();
    initializeSlideNavigation();
    setupEventListeners();
    
    // Show integration modal on first load (demo purposes)
    setTimeout(() => {
        document.getElementById('integrationModal').style.display = 'block';
    }, 2000);
});

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Form Calculations
function initializeFormCalculations() {
    const fundedValue = document.getElementById('fundedValue');
    const billedToDate = document.getElementById('billedToDate');
    const remainingFunds = document.getElementById('remainingFunds');
    const authorizedHeadcount = document.getElementById('authorizedHeadcount');
    const currentHeadcount = document.getElementById('currentHeadcount');
    const vacancies = document.getElementById('vacancies');
    
    // Auto-calculate remaining funds
    [fundedValue, billedToDate].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                const funded = parseFloat(fundedValue.value) || 0;
                const billed = parseFloat(billedToDate.value) || 0;
                remainingFunds.value = (funded - billed).toFixed(2);
                updateFinancialChart();
            });
        }
    });
    
    // Auto-calculate vacancies
    [authorizedHeadcount, currentHeadcount].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                const authorized = parseInt(authorizedHeadcount.value) || 0;
                const current = parseInt(currentHeadcount.value) || 0;
                vacancies.value = Math.max(0, authorized - current);
            });
        }
    });
    
    // Rating slider update
    const ratingSlider = document.getElementById('customerRating');
    const ratingValue = document.querySelector('.rating-value');
    
    if (ratingSlider && ratingValue) {
        ratingSlider.addEventListener('input', () => {
            ratingValue.textContent = ratingSlider.value;
        });
    }
}

// Charts
function initializeCharts() {
    const ctx = document.getElementById('financialChart');
    const slideCtx = document.getElementById('slideFinancialChart');
    
    if (ctx) {
        financialChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Billed to Date', 'Remaining Funds'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#2d6a2d', '#c9a227'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    if (slideCtx) {
        slideFinancialChart = new Chart(slideCtx, {
            type: 'bar',
            data: {
                labels: ['Funded Value', 'Billed to Date', 'Remaining'],
                datasets: [{
                    label: 'Amount ($)',
                    data: [2500000, 1750000, 750000],
                    backgroundColor: ['#0a1628', '#2d6a2d', '#c9a227']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateFinancialChart() {
    if (!financialChart) return;
    
    const funded = parseFloat(document.getElementById('fundedValue').value) || 0;
    const billed = parseFloat(document.getElementById('billedToDate').value) || 0;
    const remaining = funded - billed;
    
    if (funded > 0) {
        financialChart.data.datasets[0].data = [billed, remaining];
        financialChart.update();
    }
}

// Slide Navigation
function initializeSlideNavigation() {
    const slideNavs = document.querySelectorAll('.slide-nav');
    
    slideNavs.forEach(nav => {
        nav.addEventListener('click', () => {
            const slideNumber = nav.getAttribute('data-slide');
            showSlide(slideNumber);
            
            // Update active nav
            slideNavs.forEach(n => n.classList.remove('active'));
            nav.classList.add('active');
        });
    });
}

function showSlide(slideNumber) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show selected slide
    document.getElementById(`slide-${slideNumber}`).classList.add('active');
}

// Dynamic Table Functions
function addStaffMember() {
    const table = document.getElementById('staffingTable').querySelector('tbody');
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Employee name" class="table-input"></td>
        <td><input type="text" placeholder="Role/Position" class="table-input"></td>
        <td>
            <select class="table-input">
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Transitioning">Transitioning</option>
            </select>
        </td>
        <td>
            <button type="button" class="btn-icon" onclick="removeRow(this)" title="Remove">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
}

function addMilestone() {
    const table = document.getElementById('milestonesTable').querySelector('tbody');
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Milestone description" class="table-input"></td>
        <td><input type="date" class="table-input"></td>
        <td><input type="date" class="table-input"></td>
        <td>
            <select class="table-input">
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
            </select>
        </td>
        <td>
            <button type="button" class="btn-icon" onclick="removeRow(this)" title="Remove">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
}

function addActionItem() {
    const table = document.getElementById('actionItemsTable').querySelector('tbody');
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Action item description" class="table-input"></td>
        <td><input type="text" placeholder="Owner name" class="table-input"></td>
        <td><input type="date" class="table-input"></td>
        <td>
            <select class="table-input">
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
                <option value="Overdue">Overdue</option>
            </select>
        </td>
        <td>
            <button type="button" class="btn-icon" onclick="removeRow(this)" title="Remove">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
}

function removeRow(button) {
    button.closest('tr').remove();
}

// List Management
function addAccomplishment() {
    const input = document.getElementById('accomplishment-input');
    const list = document.getElementById('accomplishments-list');
    
    if (input.value.trim()) {
        addListItem(list, input.value.trim(), 'accomplishment');
        input.value = '';
    }
}

function addRisk() {
    const input = document.getElementById('risk-input');
    const severity = document.getElementById('risk-severity').value;
    const list = document.getElementById('risks-list');
    
    if (input.value.trim()) {
        addListItem(list, input.value.trim(), 'risk', severity);
        input.value = '';
    }
}

function addListItem(container, text, type, severity = '') {
    const item = document.createElement('div');
    item.className = `list-item ${type === 'risk' ? 'risk-' + severity.toLowerCase() : ''}`;
    
    item.innerHTML = `
        <span>${text} ${severity ? `<small class="severity">[${severity}]</small>` : ''}</span>
        <button type="button" class="btn-icon" onclick="removeListItem(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(item);
}

function removeListItem(button) {
    button.closest('.list-item').remove();
}

// Form Actions
function saveDraft() {
    // Collect form data
    const formData = new FormData(document.getElementById('pmr-form'));
    currentFormData = Object.fromEntries(formData);
    
    // Add dynamic data
    currentFormData.staffing = collectTableData('staffingTable');
    currentFormData.milestones = collectTableData('milestonesTable');
    currentFormData.actionItems = collectTableData('actionItemsTable');
    currentFormData.accomplishments = collectListData('accomplishments-list');
    currentFormData.risks = collectListData('risks-list');
    
    // TODO: Send to backend/Costpoint integration
    console.log('Saving draft...', currentFormData);
    
    showNotification('Draft saved successfully!', 'success');
}

function generateSlides() {
    // Save form data first
    saveDraft();
    
    // Populate slide content
    populateSlideData();
    
    // Switch to slides tab
    switchTab('slides');
    
    showNotification('Slides generated successfully!', 'success');
}

function populateSlideData() {
    // Slide 1: Overview
    document.getElementById('slide-contract-name').textContent = 
        document.getElementById('contractName').value || 'Contract Name';
    document.getElementById('slide-contract-number').textContent = 
        document.getElementById('contractNumber').value || 'Contract Number';
    document.getElementById('slide-pm-name').textContent = 
        document.getElementById('pmName').value || 'Program Manager';
    
    const period = document.getElementById('reportingPeriod').value;
    if (period) {
        const date = new Date(period + '-01');
        const formattedPeriod = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        document.getElementById('slide-period').textContent = formattedPeriod;
        
        // Update all slide periods
        document.querySelectorAll('[id^="slide-"][id$="-period"]').forEach(el => {
            el.textContent = formattedPeriod;
        });
    }
    
    // Slide 2: Financial
    const fundedValue = parseFloat(document.getElementById('fundedValue').value) || 0;
    const billedToDate = parseFloat(document.getElementById('billedToDate').value) || 0;
    const remainingFunds = fundedValue - billedToDate;
    const burnRate = parseFloat(document.getElementById('burnRate').value) || 0;
    
    document.getElementById('slide-funded-value').textContent = formatCurrency(fundedValue);
    document.getElementById('slide-billed-date').textContent = formatCurrency(billedToDate);
    document.getElementById('slide-remaining').textContent = formatCurrency(remainingFunds);
    document.getElementById('slide-burn-rate').textContent = formatCurrency(burnRate) + '/mo';
    
    // Update slide chart
    if (slideFinancialChart) {
        slideFinancialChart.data.datasets[0].data = [fundedValue, billedToDate, remainingFunds];
        slideFinancialChart.update();
    }
    
    // Populate other slides dynamically
    populateStaffingSlide();
    populatePerformanceSlide();
    populateScheduleSlide();
    populateActionsSlide();
}

function populateStaffingSlide() {
    const container = document.getElementById('staffing-slide-content');
    const authorized = document.getElementById('authorizedHeadcount').value || '0';
    const current = document.getElementById('currentHeadcount').value || '0';
    const vacancies = document.getElementById('vacancies').value || '0';
    
    container.innerHTML = `
        <div class="financial-metrics">
            <div class="metric">
                <span class="metric-label">Authorized</span>
                <span class="metric-value">${authorized}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Current</span>
                <span class="metric-value">${current}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Vacancies</span>
                <span class="metric-value">${vacancies}</span>
            </div>
        </div>
        <div class="staffing-details">
            <h4>Staff Status</h4>
            ${generateStaffingTable()}
        </div>
    `;
}

function populatePerformanceSlide() {
    const container = document.getElementById('performance-slide-content');
    const accomplishments = collectListData('accomplishments-list');
    const risks = collectListData('risks-list');
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
                <h4 style="color: var(--success); margin-bottom: 1rem;">
                    <i class="fas fa-check-circle"></i> Key Accomplishments
                </h4>
                <ul style="list-style: none; padding: 0;">
                    ${accomplishments.map(item => `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">• ${item}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4 style="color: var(--warning); margin-bottom: 1rem;">
                    <i class="fas fa-exclamation-triangle"></i> Issues & Risks
                </h4>
                <ul style="list-style: none; padding: 0;">
                    ${risks.map(item => `<li style="padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">• ${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function populateScheduleSlide() {
    const container = document.getElementById('schedule-slide-content');
    const milestones = collectTableData('milestonesTable');
    
    container.innerHTML = `
        <div class="milestone-timeline">
            <h4 style="margin-bottom: 1.5rem;">Key Milestones Timeline</h4>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--gray-50);">
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Milestone</th>
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Planned</th>
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Actual/Projected</th>
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${milestones.map(milestone => `
                        <tr>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">${milestone[0] || 'TBD'}</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">${milestone[1] || 'TBD'}</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">${milestone[2] || 'TBD'}</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">
                                <span class="status-badge ${getStatusClass(milestone[3])}">${milestone[3] || 'TBD'}</span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function populateActionsSlide() {
    const container = document.getElementById('actions-slide-content');
    const actionItems = collectTableData('actionItemsTable');
    
    container.innerHTML = `
        <div class="action-items-list">
            <h4 style="margin-bottom: 1.5rem;">Open Action Items</h4>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--gray-50);">
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Action Item</th>
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Owner</th>
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Due Date</th>
                        <th style="padding: 1rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${actionItems.map(action => `
                        <tr>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">${action[0] || 'TBD'}</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">${action[1] || 'TBD'}</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">${action[2] || 'TBD'}</td>
                            <td style="padding: 0.75rem; border-bottom: 1px solid var(--gray-200);">
                                <span class="status-badge ${getStatusClass(action[3])}">${action[3] || 'TBD'}</span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Utility Functions
function collectTableData(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tbody tr');
    const data = [];
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('input, select');
        const rowData = Array.from(cells).map(cell => cell.value);
        if (rowData.some(value => value.trim())) {
            data.push(rowData);
        }
    });
    
    return data;
}

function collectListData(containerId) {
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.list-item');
    return Array.from(items).map(item => {
        const text = item.querySelector('span').childNodes[0].textContent.trim();
        return text;
    });
}

function generateStaffingTable() {
    const staffingData = collectTableData('staffingTable');
    if (staffingData.length === 0) {
        return '<p style="text-align: center; color: var(--gray-500); font-style: italic;">No staff details entered</p>';
    }
    
    return `
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
            <thead>
                <tr style="background: var(--gray-50);">
                    <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Name</th>
                    <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Role</th>
                    <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid var(--gray-200);">Status</th>
                </tr>
            </thead>
            <tbody>
                ${staffingData.map(staff => `
                    <tr>
                        <td style="padding: 0.5rem; border-bottom: 1px solid var(--gray-200);">${staff[0]}</td>
                        <td style="padding: 0.5rem; border-bottom: 1px solid var(--gray-200);">${staff[1]}</td>
                        <td style="padding: 0.5rem; border-bottom: 1px solid var(--gray-200);">
                            <span class="status-badge ${getStatusClass(staff[2])}">${staff[2]}</span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function getStatusClass(status) {
    const statusMap = {
        'On Track': 'approved',
        'At Risk': 'pending', 
        'Delayed': 'draft',
        'Complete': 'approved',
        'In Progress': 'pending',
        'Overdue': 'draft',
        'Active': 'approved'
    };
    return statusMap[status] || 'draft';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--success);
        color: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.background = 'var(--danger)';
    } else if (type === 'warning') {
        notification.style.background = 'var(--warning)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Event Listeners Setup
function setupEventListeners() {
    // Modal close
    const modal = document.getElementById('integrationModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Enter key handlers for list inputs
    document.getElementById('accomplishment-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addAccomplishment();
        }
    });
    
    document.getElementById('risk-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addRisk();
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterProgramsTable(e.target.value);
        });
    }
}

function filterProgramsTable(searchTerm) {
    const table = document.querySelector('.programs-table tbody');
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const match = text.includes(searchTerm.toLowerCase());
        row.style.display = match ? '' : 'none';
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .table-input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--gray-300);
        border-radius: 0.25rem;
        font-size: 0.9rem;
    }
    
    .table-input:focus {
        outline: none;
        border-color: var(--sawtst-green);
        box-shadow: 0 0 0 2px rgba(45, 106, 45, 0.1);
    }
    
    .severity {
        color: var(--gray-500);
        font-weight: normal;
    }
`;
document.head.appendChild(style);

console.log('🏢 PMR Dashboard loaded - Ready for Costpoint integration!');

// Future integration placeholder
window.CostpointAPI = {
    // These will be populated when API files are added to VM
    getContractData: async (contractNumber) => {
        // TODO: Implement when Costpoint API is available
        console.log('Costpoint API: getContractData', contractNumber);
        return null;
    },
    
    getFinancialData: async (contractNumber) => {
        // TODO: Implement when Costpoint API is available
        console.log('Costpoint API: getFinancialData', contractNumber);
        return null;
    },
    
    savePMRData: async (pmrData) => {
        // TODO: Implement when Costpoint API is available
        console.log('Costpoint API: savePMRData', pmrData);
        return null;
    }
};
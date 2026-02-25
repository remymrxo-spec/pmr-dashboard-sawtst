// PMR Dashboard - Fixed Interactive Functionality
// Built for SAWTST LLC - Roshawnda Allen

let currentFormData = {};
let financialChart = null;
let slideFinancialChart = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PMR Dashboard initializing...');
    
    // Initialize all components
    initializeTabs();
    initializeFormCalculations();
    initializeCharts();
    initializeSlideNavigation();
    setupEventListeners();
    
    // Load sample data for demo
    loadSampleData();
    
    console.log('PMR Dashboard loaded successfully!');
});

// Tab Management - Fixed
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    console.log('Switching to tab:', tabId);
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Form Calculations - Fixed
function initializeFormCalculations() {
    console.log('Initializing form calculations...');
    
    const fundedValue = document.getElementById('fundedValue');
    const billedToDate = document.getElementById('billedToDate');
    const remainingFunds = document.getElementById('remainingFunds');
    const authorizedHeadcount = document.getElementById('authorizedHeadcount');
    const currentHeadcount = document.getElementById('currentHeadcount');
    const vacancies = document.getElementById('vacancies');
    const ratingSlider = document.getElementById('customerRating');
    const ratingValue = document.querySelector('.rating-value');
    
    // Auto-calculate remaining funds
    function updateFinancials() {
        if (fundedValue && billedToDate && remainingFunds) {
            const funded = parseFloat(fundedValue.value) || 0;
            const billed = parseFloat(billedToDate.value) || 0;
            const remaining = funded - billed;
            remainingFunds.value = remaining.toFixed(2);
            updateFinancialChart();
        }
    }
    
    if (fundedValue) fundedValue.addEventListener('input', updateFinancials);
    if (billedToDate) billedToDate.addEventListener('input', updateFinancials);
    
    // Auto-calculate vacancies
    function updateStaffing() {
        if (authorizedHeadcount && currentHeadcount && vacancies) {
            const authorized = parseInt(authorizedHeadcount.value) || 0;
            const current = parseInt(currentHeadcount.value) || 0;
            vacancies.value = Math.max(0, authorized - current);
        }
    }
    
    if (authorizedHeadcount) authorizedHeadcount.addEventListener('input', updateStaffing);
    if (currentHeadcount) currentHeadcount.addEventListener('input', updateStaffing);
    
    // Rating slider
    if (ratingSlider && ratingValue) {
        ratingSlider.addEventListener('input', function() {
            ratingValue.textContent = this.value;
        });
    }
}

// Charts - Fixed
function initializeCharts() {
    console.log('Initializing charts...');
    
    // Wait a bit for DOM to settle
    setTimeout(() => {
        const ctx = document.getElementById('financialChart');
        const slideCtx = document.getElementById('slideFinancialChart');
        
        if (ctx) {
            try {
                financialChart = new Chart(ctx.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Billed to Date', 'Remaining Funds'],
                        datasets: [{
                            data: [1750000, 750000],
                            backgroundColor: ['#2d6a2d', '#c9a227'],
                            borderWidth: 2,
                            borderColor: '#fff'
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
                                    usePointStyle: true,
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Financial chart created successfully');
            } catch (e) {
                console.error('Error creating financial chart:', e);
            }
        }
        
        if (slideCtx) {
            try {
                slideFinancialChart = new Chart(slideCtx.getContext('2d'), {
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
                                        return '$' + (value / 1000000).toFixed(1) + 'M';
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Slide financial chart created successfully');
            } catch (e) {
                console.error('Error creating slide chart:', e);
            }
        }
    }, 500);
}

function updateFinancialChart() {
    if (!financialChart) return;
    
    const fundedInput = document.getElementById('fundedValue');
    const billedInput = document.getElementById('billedToDate');
    
    if (fundedInput && billedInput) {
        const funded = parseFloat(fundedInput.value) || 0;
        const billed = parseFloat(billedInput.value) || 0;
        const remaining = funded - billed;
        
        if (funded > 0) {
            financialChart.data.datasets[0].data = [billed, remaining];
            financialChart.update();
        }
    }
}

// Slide Navigation - Fixed
function initializeSlideNavigation() {
    const slideNavs = document.querySelectorAll('.slide-nav');
    
    slideNavs.forEach(nav => {
        nav.addEventListener('click', function() {
            const slideNumber = this.getAttribute('data-slide');
            showSlide(slideNumber);
            
            // Update active nav
            slideNavs.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSlide(slideNumber) {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show selected slide
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
}

// Dynamic Table Functions - Fixed
window.addStaffMember = function() {
    console.log('Adding staff member...');
    const table = document.getElementById('staffingTable');
    if (!table) {
        console.error('Staffing table not found');
        return;
    }
    
    const tbody = table.querySelector('tbody');
    if (!tbody) {
        console.error('Table body not found');
        return;
    }
    
    const row = tbody.insertRow();
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
    console.log('Staff member row added');
};

window.addMilestone = function() {
    console.log('Adding milestone...');
    const table = document.getElementById('milestonesTable');
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    const row = tbody.insertRow();
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
};

window.addActionItem = function() {
    console.log('Adding action item...');
    const table = document.getElementById('actionItemsTable');
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    const row = tbody.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Action item description" class="table-input"></td>
        <td><input type="text" placeholder="Owner name" class="table-input"></td>
        <td><input type="date" class="table-input"></td>
        <td>
            <select class="table-input">
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Overdue">Overdue</option>
                <option value="Complete">Complete</option>
            </select>
        </td>
        <td>
            <button type="button" class="btn-icon" onclick="removeRow(this)" title="Remove">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
};

window.removeRow = function(button) {
    console.log('Removing row...');
    const row = button.closest('tr');
    if (row) {
        row.remove();
    }
};

// List Management - Fixed
window.addAccomplishment = function() {
    const input = document.getElementById('accomplishment-input');
    const list = document.getElementById('accomplishments-list');
    
    if (input && input.value.trim() && list) {
        addListItem(list, input.value.trim(), 'accomplishment');
        input.value = '';
    }
};

window.addRisk = function() {
    const input = document.getElementById('risk-input');
    const severity = document.getElementById('risk-severity');
    const list = document.getElementById('risks-list');
    
    if (input && input.value.trim() && list && severity) {
        addListItem(list, input.value.trim(), 'risk', severity.value);
        input.value = '';
    }
};

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

window.removeListItem = function(button) {
    const item = button.closest('.list-item');
    if (item) {
        item.remove();
    }
};

// Form Actions - Fixed
window.saveDraft = function() {
    console.log('Saving draft...');
    
    const form = document.getElementById('pmr-form');
    if (!form) {
        console.error('PMR form not found');
        return;
    }
    
    const formData = new FormData(form);
    currentFormData = Object.fromEntries(formData);
    
    // Add dynamic data
    currentFormData.staffing = collectTableData('staffingTable');
    currentFormData.milestones = collectTableData('milestonesTable');
    currentFormData.actionItems = collectTableData('actionItemsTable');
    currentFormData.accomplishments = collectListData('accomplishments-list');
    currentFormData.risks = collectListData('risks-list');
    
    console.log('Draft data:', currentFormData);
    showNotification('Draft saved successfully!', 'success');
};

window.generateSlides = function() {
    console.log('Generating slides...');
    
    // Save form data first
    saveDraft();
    
    // Populate slide content
    populateSlideData();
    
    // Switch to slides tab
    switchTab('slides');
    
    showNotification('Slides generated successfully!', 'success');
};

function populateSlideData() {
    console.log('Populating slide data...');
    
    // Get form values
    const contractName = document.getElementById('contractName')?.value || 'Sample Contract';
    const contractNumber = document.getElementById('contractNumber')?.value || 'FA8771-20-C-0001';
    const pmName = document.getElementById('pmName')?.value || 'John Smith';
    const reportingPeriod = document.getElementById('reportingPeriod')?.value;
    
    // Update slide content
    const slideContractName = document.getElementById('slide-contract-name');
    const slideContractNumber = document.getElementById('slide-contract-number');
    const slidePmName = document.getElementById('slide-pm-name');
    const slidePeriod = document.getElementById('slide-period');
    
    if (slideContractName) slideContractName.textContent = contractName;
    if (slideContractNumber) slideContractNumber.textContent = contractNumber;
    if (slidePmName) slidePmName.textContent = pmName;
    
    if (reportingPeriod && slidePeriod) {
        const date = new Date(reportingPeriod + '-01');
        const formattedPeriod = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        slidePeriod.textContent = formattedPeriod;
        
        // Update all slide periods
        document.querySelectorAll('[id^="slide-"][id$="-period"]').forEach(el => {
            el.textContent = formattedPeriod;
        });
    }
    
    // Financial data
    const fundedValue = parseFloat(document.getElementById('fundedValue')?.value) || 2500000;
    const billedToDate = parseFloat(document.getElementById('billedToDate')?.value) || 1750000;
    const remainingFunds = fundedValue - billedToDate;
    const burnRate = parseFloat(document.getElementById('burnRate')?.value) || 150000;
    
    const slideFundedValue = document.getElementById('slide-funded-value');
    const slideBilledDate = document.getElementById('slide-billed-date');
    const slideRemaining = document.getElementById('slide-remaining');
    const slideBurnRate = document.getElementById('slide-burn-rate');
    
    if (slideFundedValue) slideFundedValue.textContent = formatCurrency(fundedValue);
    if (slideBilledDate) slideBilledDate.textContent = formatCurrency(billedToDate);
    if (slideRemaining) slideRemaining.textContent = formatCurrency(remainingFunds);
    if (slideBurnRate) slideBurnRate.textContent = formatCurrency(burnRate) + '/mo';
    
    // Update slide chart
    if (slideFinancialChart) {
        slideFinancialChart.data.datasets[0].data = [fundedValue, billedToDate, remainingFunds];
        slideFinancialChart.update();
    }
}

// Utility Functions
function collectTableData(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return [];
    
    const rows = table.querySelectorAll('tbody tr');
    const data = [];
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('input, select');
        const rowData = Array.from(cells).map(cell => cell.value || '');
        if (rowData.some(value => value.trim())) {
            data.push(rowData);
        }
    });
    
    return data;
}

function collectListData(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const items = container.querySelectorAll('.list-item');
    return Array.from(items).map(item => {
        const textNode = item.querySelector('span').firstChild;
        return textNode ? textNode.textContent.trim() : '';
    });
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
    console.log('Notification:', message);
    
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--success, #10b981);
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    if (type === 'error') {
        notification.style.background = 'var(--danger, #ef4444)';
    } else if (type === 'warning') {
        notification.style.background = 'var(--warning, #f59e0b)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Modal handling
    const modal = document.getElementById('integrationModal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Enter key handlers for list inputs
    const accomplishmentInput = document.getElementById('accomplishment-input');
    const riskInput = document.getElementById('risk-input');
    
    if (accomplishmentInput) {
        accomplishmentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addAccomplishment();
            }
        });
    }
    
    if (riskInput) {
        riskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addRisk();
            }
        });
    }
    
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
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const match = text.includes(searchTerm.toLowerCase());
        row.style.display = match ? '' : 'none';
    });
}

// Load Sample Data for Demo
function loadSampleData() {
    console.log('Loading sample data...');
    
    // Set sample form values
    setTimeout(() => {
        const contractName = document.getElementById('contractName');
        const contractNumber = document.getElementById('contractNumber');
        const pmName = document.getElementById('pmName');
        const fundedValue = document.getElementById('fundedValue');
        const billedToDate = document.getElementById('billedToDate');
        const burnRate = document.getElementById('burnRate');
        const authorizedHeadcount = document.getElementById('authorizedHeadcount');
        const currentHeadcount = document.getElementById('currentHeadcount');
        const eac = document.getElementById('eac');
        
        if (contractName) contractName.value = 'DTESS Support Services';
        if (contractNumber) contractNumber.value = 'FA8771-20-C-0001';
        if (pmName) pmName.value = 'Sarah Johnson';
        if (fundedValue) {
            fundedValue.value = '2500000';
            fundedValue.dispatchEvent(new Event('input'));
        }
        if (billedToDate) {
            billedToDate.value = '1750000';
            billedToDate.dispatchEvent(new Event('input'));
        }
        if (burnRate) burnRate.value = '150000';
        if (authorizedHeadcount) {
            authorizedHeadcount.value = '25';
            authorizedHeadcount.dispatchEvent(new Event('input'));
        }
        if (currentHeadcount) {
            currentHeadcount.value = '23';
            currentHeadcount.dispatchEvent(new Event('input'));
        }
        if (eac) eac.value = '2480000';
        
        console.log('Sample data loaded');
    }, 1000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .table-input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--gray-300, #cbd5e1);
        border-radius: 0.25rem;
        font-size: 0.9rem;
    }
    
    .table-input:focus {
        outline: none;
        border-color: var(--sawtst-green, #2d6a2d);
        box-shadow: 0 0 0 2px rgba(45, 106, 45, 0.1);
    }
    
    .severity {
        color: var(--gray-500, #64748b);
        font-weight: normal;
    }
`;

if (document.head) {
    document.head.appendChild(style);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(style);
    });
}

console.log('🏢 PMR Dashboard script loaded - All functions should work now!');
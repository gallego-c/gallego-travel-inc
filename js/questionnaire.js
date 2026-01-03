// ==========================================
// Gallego Travel Inc. - Questionnaire Logic
// ==========================================

// State Management
let currentStep = 1;
const totalSteps = 11;

const formData = {
    identity: '',
    name: '',
    email: '',
    travelTime: '',
    availableDates: [],
    departure: 'Barcelona', // Always Barcelona
    foreignCity: '',
    continent: 'Europe', // Always Europe
    selectedCities: ['paris', 'rome', 'amsterdam', 'london', 'prague', 'vienna', 'lisbon', 'berlin', 'athens', 'dublin'],
    travelers: '',
    adventureType: 'Surprise'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    // Pre-select adventure type
    const adventureBtn = document.querySelector('.adventure-btn');
    if (adventureBtn) {
        adventureBtn.classList.add('selected');
    }
});

// ==========================================
// Navigation Functions
// ==========================================

function nextStep() {
    const currentSlide = document.querySelector(`.question-slide[data-step="${currentStep}"]`);
    
    // Handle conditional flow
    if (currentStep === 5 && formData.departure === 'Barcelona') {
        // Skip foreign city input if departing from Barcelona
        currentStep = 7;
    } else {
        currentStep++;
    }
    
    showStep(currentStep);
}

function prevStep() {
    const prevStepNum = currentStep - 1;
    
    // Handle conditional flow going backwards
    if (currentStep === 7 && formData.departure === 'Barcelona') {
        // Skip foreign city input
        currentStep = 5;
    } else {
        currentStep--;
    }
    
    showStep(currentStep);
}

function showStep(step) {
    // Hide all slides
    document.querySelectorAll('.question-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    const currentSlide = document.querySelector(`.question-slide[data-step="${step}"]`);
    if (currentSlide) {
        currentSlide.classList.add('active');
    }
    
    updateProgress();
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progress.style.width = `${percentage}%`;
}

// ==========================================
// Step 1: Identity Selection
// ==========================================

function selectIdentity(value) {
    formData.identity = value;
    
    // Update button states
    document.querySelectorAll('.question-slide[data-step="1"] .option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });
    
    // Configure step 2 based on selection
    const nameGroup = document.getElementById('name-group');
    const userInfoTitle = document.getElementById('user-info-title');
    
    if (value === 'gerard') {
        nameGroup.style.display = 'none';
        userInfoTitle.textContent = 'Welcome back, Gerard! Confirm your email';
        formData.name = 'Gerard';
    } else {
        nameGroup.style.display = 'block';
        userInfoTitle.textContent = 'Tell us about yourself';
        formData.name = '';
    }
    
    // Enable next button
    document.getElementById('next-1').disabled = false;
}

// ==========================================
// Step 2: User Info Validation
// ==========================================

function validateUserInfo() {
    const email = document.getElementById('user-email').value.trim();
    const name = document.getElementById('user-name').value.trim();
    const nameGroup = document.getElementById('name-group');
    
    formData.email = email;
    
    let isValid = false;
    
    if (formData.identity === 'gerard') {
        // Only email required for Gerard
        isValid = isValidEmail(email);
    } else {
        // Name and email required for random person
        formData.name = name;
        isValid = name.length > 0 && isValidEmail(email);
    }
    
    document.getElementById('next-2').disabled = !isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==========================================
// Step 3: Travel Time Selection
// ==========================================

function selectTravelTime(value) {
    formData.travelTime = value === 'this-month' ? 'This month' : 'Later in the year';
    
    document.querySelectorAll('.question-slide[data-step="3"] .option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });
    
    document.getElementById('next-3').disabled = false;
}

// ==========================================
// Step 4: Available Dates
// ==========================================

function addDateInput() {
    const container = document.getElementById('dates-container');
    const wrapper = document.createElement('div');
    wrapper.className = 'date-input-wrapper';
    wrapper.innerHTML = '<input type="date" class="date-input" oninput="validateDates()">';
    container.appendChild(wrapper);
}

function validateDates() {
    const dateInputs = document.querySelectorAll('.date-input');
    const filledDates = [];
    
    dateInputs.forEach(input => {
        if (input.value) {
            filledDates.push(input.value);
        }
    });
    
    formData.availableDates = filledDates;
    
    const dateCount = document.getElementById('date-count');
    dateCount.textContent = `${filledDates.length} / 5 dates selected`;
    
    if (filledDates.length >= 5) {
        dateCount.style.color = '#4CAF50';
    } else {
        dateCount.style.color = '#888888';
    }
    
    document.getElementById('next-4').disabled = filledDates.length < 5;
}

// ==========================================
// Step 5: Departure Selection
// ==========================================

function selectDeparture(value) {
    document.querySelectorAll('.question-slide[data-step="5"] .option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });
    
    if (value === 'barcelona') {
        formData.departure = 'Barcelona';
    } else {
        formData.departure = 'Foreign (Barcelona anyway)';
    }
    
    document.getElementById('next-5').disabled = false;
}

// ==========================================
// Step 6: Foreign City Input
// ==========================================

function validateForeignCity() {
    const cityInput = document.getElementById('foreign-city');
    const barcelonaMessage = document.getElementById('barcelona-message');
    
    formData.foreignCity = cityInput.value.trim();
    
    if (formData.foreignCity.length > 0) {
        barcelonaMessage.style.display = 'block';
        document.getElementById('next-6').disabled = false;
    } else {
        barcelonaMessage.style.display = 'none';
        document.getElementById('next-6').disabled = true;
    }
}

// ==========================================
// Step 7: Continent Selection
// ==========================================

function selectContinent(value) {
    formData.continent = 'Europe';
    
    document.querySelectorAll('.question-slide[data-step="7"] .option-btn:not(.disabled-option)').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });
    
    document.getElementById('next-7').disabled = false;
}

// ==========================================
// Step 8: City Selection
// ==========================================

function toggleCity(card) {
    const city = card.dataset.city;
    
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        formData.selectedCities = formData.selectedCities.filter(c => c !== city);
    } else {
        card.classList.add('selected');
        formData.selectedCities.push(city);
    }
    
    // Update status icon
    const status = card.querySelector('.city-status');
    if (card.classList.contains('selected')) {
        status.textContent = '✓';
    } else {
        status.textContent = '✗';
    }
}

// ==========================================
// Step 9: Travelers Selection
// ==========================================

function selectTravelers(value) {
    formData.travelers = value;
    
    document.querySelectorAll('.question-slide[data-step="9"] .option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.value === value) {
            btn.classList.add('selected');
        }
    });
    
    const warning = document.getElementById('travelers-warning');
    if (value === '2+') {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }
    
    document.getElementById('next-9').disabled = false;
}

// ==========================================
// Step 10: Adventure Type
// ==========================================

function selectAdventure(value) {
    formData.adventureType = 'Surprise';
    // Already pre-selected, just ensure it stays selected
    document.querySelector('.adventure-btn').classList.add('selected');
}

// ==========================================
// Finish & CSV Generation
// ==========================================

function finishQuestionnaire() {
    // Generate and download CSV
    generateCSV();
    
    // Show final message
    currentStep = 11;
    showStep(11);
}

function generateCSV() {
    // Create CSV content
    const headers = [
        'Name',
        'Email',
        'Identity Type',
        'Travel Time',
        'Available Dates',
        'Departure City',
        'Foreign City Entered',
        'Continent',
        'Selected Cities',
        'Number of Travelers',
        'Adventure Type',
        'Submission Date'
    ];
    
    const values = [
        formData.name,
        formData.email,
        formData.identity,
        formData.travelTime,
        formData.availableDates.join('; '),
        formData.departure,
        formData.foreignCity || 'N/A',
        formData.continent,
        formData.selectedCities.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join('; '),
        formData.travelers,
        formData.adventureType,
        new Date().toISOString()
    ];
    
    // Escape values for CSV
    const escapedValues = values.map(val => {
        if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
            return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
    });
    
    const csvContent = headers.join(',') + '\n' + escapedValues.join(',');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `travel_questionnaire_${formData.name.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Also log to console for debugging
    console.log('Form Data:', formData);
    console.log('CSV Generated:', csvContent);
}

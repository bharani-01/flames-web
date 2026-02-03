// Get DOM elements
const form = document.getElementById('flamesForm');
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const errorDiv = document.getElementById('error');
const resultDiv = document.getElementById('result');
const resultName1 = document.getElementById('resultName1');
const resultName2 = document.getElementById('resultName2');
const resultLetter = document.getElementById('resultLetter');
const resultText = document.getElementById('resultText');
const resultCount = document.getElementById('resultCount');

// FLAMES color mapping
const flamesColors = {
    'F': 'linear-gradient(135deg, #FF6B6B, #ff8787)',
    'L': 'linear-gradient(135deg, #FF1744, #ff4569)',
    'A': 'linear-gradient(135deg, #FF69B4, #ff8ad4)',
    'M': 'linear-gradient(135deg, #9C27B0, #ba54d3)',
    'E': 'linear-gradient(135deg, #FF5722, #ff7849)',
    'S': 'linear-gradient(135deg, #4CAF50, #6fbf73)'
};

// Form submit handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();

    // Hide previous results/errors
    hideError();
    hideResult();

    // Validate inputs
    if (!name1 || !name2) {
        showError('Please enter both names');
        return;
    }

    if (name1.toLowerCase() === name2.toLowerCase()) {
        showError('Please enter different names');
        return;
    }

    try {
        // Call API
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name1, name2 })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        if (data.success) {
            displayResult(data.data);
        } else {
            showError(data.error || 'Failed to calculate FLAMES');
        }
    } catch (error) {
        showError(error.message || 'Failed to connect to server');
    }
});

// Display result
function displayResult(data) {
    resultName1.textContent = data.name1;
    resultName2.textContent = data.name2;
    resultLetter.textContent = data.result;
    resultLetter.style.background = flamesColors[data.result];
    resultText.textContent = data.relationship;
    resultCount.textContent = data.remainingCount;
    
    resultDiv.classList.add('show');
    
    // Scroll to result smoothly
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Show error
function showError(message) {
    errorDiv.textContent = '❌ ' + message;
    errorDiv.classList.add('show');
}

// Hide error
function hideError() {
    errorDiv.classList.remove('show');
}

// Hide result
function hideResult() {
    resultDiv.classList.remove('show');
}

// Clear inputs on focus
name1Input.addEventListener('focus', () => {
    hideError();
});

name2Input.addEventListener('focus', () => {
    hideError();
});

// Add enter key support
name1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        name2Input.focus();
    }
});

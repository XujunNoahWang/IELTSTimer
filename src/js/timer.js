/**
 * Noah's IELTS Timer - Main JavaScript Module
 * A comprehensive timer application for IELTS practice
 */

// Timer state management
let timerState = {
    isRunning: false,
    isPaused: false,
    totalTime: 0,
    remainingTime: 0,
    elapsedTime: 0,
    currentType: '',
    interval: null,
    startTime: null
};

// DOM elements
const elements = {
    body: document.getElementById('mainBody'),
    timerTitle: document.getElementById('timerTitle'),
    remainingCircle: document.getElementById('remainingCircle'),
    completedMask: document.getElementById('completedMask'),
    elapsedTime: document.getElementById('elapsedTime'),
    remainingTime: document.getElementById('remainingTime'),
    pauseResumeText: document.getElementById('pauseResumeText'),
    completionModal: document.getElementById('completionModal'),
    completionMessage: document.getElementById('completionMessage'),
    soundNoticeModal: document.getElementById('soundNoticeModal'),
    modeToggle: document.getElementById('modeToggle'),
    modeIcon: document.getElementById('modeIcon'),
    menuToggle: document.getElementById('menuToggle'),
    menuIcon: document.getElementById('menuIcon'),
    mobileOverlay: document.getElementById('mobileOverlay'),
    mobilePanel: document.getElementById('mobilePanel')
};

// Application state
let isDarkMode = false;
let isMobileMenuOpen = false;
let audioContext = null;
let isAudioInitialized = false;

/**
 * Utility Functions
 */

// Detect WeChat browser
function isWeChat() {
    return /micromessenger/i.test(navigator.userAgent);
}

// Detect iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// Format time display
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Audio Functions
 */

// Initialize audio context on first user interaction
function initializeAudio() {
    if (!isAudioInitialized) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Resume audio context if it's suspended (required for mobile)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            isAudioInitialized = true;
            console.log('Audio context initialized');
        } catch (error) {
            console.log('Audio context initialization failed:', error);
        }
    }
}

// Audio notification
function playBeep(frequency = 800, duration = 200) {
    try {
        // Initialize audio if not already done
        if (!isAudioInitialized) {
            initializeAudio();
        }
        
        // Use the global audio context
        if (audioContext && audioContext.state !== 'closed') {
            // Resume if suspended
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } else {
            // Fallback: try to create a new context
            const fallbackContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = fallbackContext.createOscillator();
            const gainNode = fallbackContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(fallbackContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, fallbackContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, fallbackContext.currentTime + duration / 1000);
            
            oscillator.start(fallbackContext.currentTime);
            oscillator.stop(fallbackContext.currentTime + duration / 1000);
        }
    } catch (error) {
        console.log('Audio not supported:', error);
    }
}

/**
 * Mobile Input Zoom Prevention
 */

// Force zoom out function for mobile browsers
function forceZoomOut(input) {
    // Blur the input first
    input.blur();
    
    // Special handling for WeChat browser
    if (isWeChat()) {
        // WeChat specific zoom out method
        setTimeout(() => {
            const hiddenButton = document.getElementById('hiddenFocusButton');
            if (hiddenButton) {
                // Focus on hidden button to reset zoom
                hiddenButton.focus();
                setTimeout(() => {
                    hiddenButton.blur();
                    document.body.focus();
                    
                    // Force multiple viewport resets
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        const original = viewport.getAttribute('content');
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
                        setTimeout(() => {
                            viewport.setAttribute('content', original);
                        }, 50);
                    }
                }, 100);
            }
        }, 50);
    }
    
    // Multiple attempts to force zoom out
    const forceZoomOutSequence = () => {
        // Method 1: Viewport manipulation
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            const originalContent = viewport.getAttribute('content');
            
            // Temporarily disable zoom
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            
            setTimeout(() => {
                // Force scale reset
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
                
                setTimeout(() => {
                    // Restore original settings
                    viewport.setAttribute('content', originalContent);
                }, 200);
            }, 100);
        }
        
        // Method 2: Force focus change
        document.body.focus();
        
        // Method 3: Scroll manipulation
        const currentScrollY = window.scrollY;
        window.scrollTo(0, 1);
        setTimeout(() => {
            window.scrollTo(0, currentScrollY);
        }, 10);
        
        // Method 4: Force layout recalculation
        document.body.style.zoom = '1';
        document.documentElement.style.zoom = '1';
        
        // Method 5: Trigger multiple events
        ['resize', 'orientationchange', 'scroll'].forEach(eventType => {
            window.dispatchEvent(new Event(eventType));
        });
        
        // Method 6: Force repaint by changing and restoring a style
        const originalTransform = document.body.style.transform;
        document.body.style.transform = 'scale(1)';
        setTimeout(() => {
            document.body.style.transform = originalTransform;
        }, 50);
    };
    
    // Execute immediately and with delays
    forceZoomOutSequence();
    setTimeout(forceZoomOutSequence, 100);
    setTimeout(forceZoomOutSequence, 300);
}

// Prevent input zoom on all number inputs
function setupInputZoomPrevention() {
    const allNumberInputs = document.querySelectorAll('input[type="number"]');
    
    allNumberInputs.forEach(input => {
        // Set font size to prevent zoom
        input.style.fontSize = '16px';
        input.style.webkitTextSizeAdjust = '100%';
        
        // Add focus event listener
        input.addEventListener('focus', function(e) {
            // Prevent zoom by temporarily disabling user scaling
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport && (isIOS() || isWeChat() || window.innerWidth <= 768)) {
                const originalContent = viewport.getAttribute('content');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                
                // Restore viewport after input loses focus
                const restoreViewport = () => {
                    viewport.setAttribute('content', originalContent);
                    input.removeEventListener('blur', restoreViewport);
                };
                
                input.addEventListener('blur', restoreViewport);
            }
        });
        
        // Add additional prevention on touchstart
        input.addEventListener('touchstart', function(e) {
            if (isIOS() || isWeChat()) {
                // Force font size
                this.style.fontSize = '16px';
                this.style.webkitTextSizeAdjust = '100%';
            }
        }, { passive: true });
    });
}

/**
 * Mobile Menu Functions
 */

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        elements.mobileOverlay.classList.add('active');
        elements.mobilePanel.classList.add('active');
        elements.menuToggle.classList.add('active');
        elements.menuIcon.className = 'fas fa-times';
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    isMobileMenuOpen = false;
    elements.mobileOverlay.classList.remove('active');
    elements.mobilePanel.classList.remove('active');
    elements.menuToggle.classList.remove('active');
    elements.menuIcon.className = 'fas fa-bars';
}

/**
 * Timer Display Functions
 */

// Calculate remaining color based on time ratio
function calculateRemainingColor(remainingRatio) {
    if (remainingRatio > 0.5) {
        // Green to yellow transition
        const factor = (remainingRatio - 0.5) * 2;
        const r = Math.round(255 * (1 - factor) + 38 * factor);
        const g = Math.round(193 * (1 - factor) + 166 * factor);
        const b = Math.round(7 * (1 - factor) + 154 * factor);
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        // Yellow to red transition
        const factor = remainingRatio * 2;
        const r = Math.round(220 * (1 - factor) + 255 * factor);
        const g = Math.round(53 * (1 - factor) + 193 * factor);
        const b = Math.round(69 * (1 - factor) + 7 * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }
}

// Update circular progress
function updateCircularProgress(progress) {
    const circumference = 534.07;
    const completedOffset = circumference * progress;
    const remainingRatio = 1 - progress;
    
    elements.completedMask.style.strokeDashoffset = circumference - completedOffset;
    elements.remainingCircle.style.stroke = calculateRemainingColor(remainingRatio);
}

// Update display
function updateDisplay() {
    const progress = timerState.elapsedTime / timerState.totalTime;
    const remainingRatio = 1 - progress;
    
    elements.elapsedTime.textContent = `Elapsed: ${formatTime(timerState.elapsedTime)}`;
    elements.remainingTime.textContent = `Remaining: ${formatTime(timerState.remainingTime)}`;
    
    updateCircularProgress(progress);
    
    // Update pause/resume text
    if (timerState.isRunning && !timerState.isPaused) {
        elements.pauseResumeText.textContent = 'Click to Pause';
        elements.pauseResumeText.style.opacity = '0.7';
    } else if (timerState.isPaused) {
        elements.pauseResumeText.textContent = 'Click to Resume';
        elements.pauseResumeText.style.opacity = '0.9';
    } else {
        // Hide text when not started
        elements.pauseResumeText.textContent = '';
        elements.pauseResumeText.style.opacity = '0';
    }
    
    // Last 10 seconds audio reminder
    if (timerState.remainingTime <= 10 && timerState.remainingTime > 0 && timerState.isRunning && !timerState.isPaused) {
        if (timerState.remainingTime <= 3) {
            playBeep(1000, 100);
        }
    }
}

/**
 * Timer Core Functions
 */

// Timer main loop
function timerTick() {
    if (!timerState.isRunning || timerState.isPaused) return;
    
    const now = Date.now();
    timerState.elapsedTime = Math.floor((now - timerState.startTime) / 1000);
    timerState.remainingTime = Math.max(0, timerState.totalTime - timerState.elapsedTime);
    
    updateDisplay();
    
    if (timerState.remainingTime <= 0) {
        completeTimer();
    }
}

// Start timer
function startTimer(minutes, type) {
    // Initialize audio on user interaction
    initializeAudio();
    
    resetTimer();
    
    timerState.totalTime = minutes * 60;
    timerState.remainingTime = timerState.totalTime;
    timerState.currentType = type;
    timerState.isRunning = true;
    timerState.startTime = Date.now();
    
    elements.timerTitle.textContent = `${type} - ${minutes} min`;
    
    timerState.interval = setInterval(timerTick, 100);
    updateDisplay();
    playBeep(600, 200);
}

// Custom timer
function startCustomTimer(inputId, type, maxMinutes = null) {
    const input = document.getElementById(inputId);
    const minutes = parseInt(input.value);
    
    if (!minutes || minutes <= 0) {
        alert('Please enter a valid time (minutes)');
        return;
    }
    
    if (maxMinutes && minutes > maxMinutes) {
        alert(`Time cannot exceed ${maxMinutes} minutes`);
        return;
    }
    
    // Force zoom out on mobile browsers
    forceZoomOut(input);
    
    startTimer(minutes, type);
    input.value = '';
}

// Custom timer for mobile
function startCustomTimerMobile(inputId, type, maxMinutes = null) {
    const input = document.getElementById(inputId);
    const minutes = parseInt(input.value);
    
    if (!minutes || minutes <= 0) {
        alert('Please enter a valid time (minutes)');
        return;
    }
    
    if (maxMinutes && minutes > maxMinutes) {
        alert(`Time cannot exceed ${maxMinutes} minutes`);
        return;
    }
    
    // Force zoom out on mobile browsers
    forceZoomOut(input);
    
    startTimer(minutes, type);
    input.value = '';
    closeMobileMenu();
}

// Toggle timer by clicking circle
function toggleTimerByClick() {
    if (!timerState.isRunning) return;
    
    // Initialize audio on user interaction
    initializeAudio();
    
    if (timerState.isPaused) {
        // Resume timer
        timerState.isPaused = false;
        // Reset start time considering elapsed time
        timerState.startTime = Date.now() - (timerState.elapsedTime * 1000);
        timerState.interval = setInterval(timerTick, 100);
        playBeep(600, 150);
    } else {
        // Pause timer
        timerState.isPaused = true;
        clearInterval(timerState.interval);
        playBeep(400, 150);
    }
    
    updateDisplay();
}

// Reset timer
function resetTimer() {
    clearInterval(timerState.interval);
    
    timerState = {
        isRunning: false,
        isPaused: false,
        totalTime: 0,
        remainingTime: 0,
        elapsedTime: 0,
        currentType: '',
        interval: null,
        startTime: null
    };
    
    elements.timerTitle.textContent = 'Ready to Start';
    elements.elapsedTime.textContent = 'Elapsed: 00:00';
    elements.remainingTime.textContent = 'Remaining: 00:00';
    elements.completedMask.style.strokeDashoffset = '534.07';
    elements.remainingCircle.style.strokeDashoffset = '0';
    elements.remainingCircle.style.stroke = '#26a69a';
    
    elements.pauseResumeText.textContent = '';
    elements.pauseResumeText.style.opacity = '0';
}

// Complete timer
function completeTimer() {
    clearInterval(timerState.interval);
    timerState.isRunning = false;
    timerState.remainingTime = 0;
    timerState.elapsedTime = timerState.totalTime;
    
    updateDisplay();
    
    elements.completionMessage.textContent = `Congratulations on completing ${timerState.currentType} practice!`;
    elements.completionModal.classList.remove('hidden');
    
    // Always use audio notification
    setTimeout(() => playBeep(800, 200), 0);
    setTimeout(() => playBeep(1000, 200), 200);
    setTimeout(() => playBeep(1200, 300), 400);
    
    elements.timerTitle.textContent = 'Completed!';
}

/**
 * UI Functions
 */

// Show sound notice function
function showSoundNotice() {
    elements.soundNoticeModal.classList.remove('hidden');
}

// Close sound notice function
function closeSoundNotice() {
    elements.soundNoticeModal.classList.add('hidden');
}

// Close modal
function closeModal() {
    elements.completionModal.classList.add('hidden');
    resetTimer();
}

// Toggle day/night mode
function toggleMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        // Night mode - black theme
        elements.body.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)';
        elements.modeIcon.className = 'fas fa-moon text-gray-300';
        elements.modeToggle.style.backgroundColor = '#1a1a1a';
        
        // Update text colors
        document.querySelectorAll('.timer-display-text').forEach(el => {
            el.style.color = '#f7fafc';
        });
        document.querySelectorAll('.main-title, .section-title').forEach(el => {
            el.style.color = '#cbd5e0';
        });
        
        // Update sidebar
        document.querySelectorAll('.sidebar-panel').forEach(el => {
            el.style.background = 'rgba(26, 26, 26, 0.95)';
            el.style.borderRight = '1px solid rgba(255, 255, 255, 0.1)';
        });
        
        // Update menu toggle
        elements.menuToggle.style.background = 'rgba(26, 26, 26, 0.95)';
        elements.menuToggle.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        
        // Update sound notice button for dark mode
        const soundNoticeBtn = document.getElementById('soundNotice');
        if (soundNoticeBtn) {
            soundNoticeBtn.style.background = 'rgba(251, 146, 60, 0.2)';
            soundNoticeBtn.style.borderColor = 'rgba(251, 146, 60, 0.4)';
        }
        
        // Update card backgrounds
        document.querySelectorAll('.glass-card').forEach(el => {
            el.style.background = 'rgba(45, 45, 45, 0.9)';
            el.style.backdropFilter = 'blur(20px)';
            el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        });
        
    } else {
        // Day mode
        elements.body.style.background = 'white';
        elements.modeIcon.className = 'fas fa-sun text-yellow-500';
        elements.modeToggle.style.backgroundColor = 'white';
        
        // Restore original text colors
        document.querySelectorAll('.timer-display-text').forEach(el => {
            el.style.color = '#333';
        });
        document.querySelectorAll('.main-title').forEach(el => {
            el.style.color = '#004d40';
        });
        document.querySelectorAll('.section-title').forEach(el => {
            el.style.color = '#00695c';
        });
        
        // Restore sidebar
        document.querySelectorAll('.sidebar-panel').forEach(el => {
            el.style.background = 'rgba(255, 255, 255, 0.98)';
            el.style.borderRight = '1px solid rgba(0, 150, 136, 0.1)';
        });
        
        // Restore menu toggle
        elements.menuToggle.style.background = 'rgba(255, 255, 255, 0.95)';
        elements.menuToggle.style.borderColor = 'rgba(0, 150, 136, 0.2)';
        
        // Restore sound notice button for light mode
        const soundNoticeBtn = document.getElementById('soundNotice');
        if (soundNoticeBtn) {
            soundNoticeBtn.style.background = '';
            soundNoticeBtn.style.borderColor = '';
        }
        
        // Restore card backgrounds
        document.querySelectorAll('.glass-card').forEach(el => {
            el.style.background = '';
            el.style.backdropFilter = '';
            el.style.border = '';
        });
    }
}

/**
 * Event Listeners and Initialization
 */

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && timerState.isRunning) {
        e.preventDefault();
        toggleTimerByClick();
    } else if (e.code === 'Escape') {
        if (!elements.completionModal.classList.contains('hidden')) {
            closeModal();
        } else if (!elements.soundNoticeModal.classList.contains('hidden')) {
            closeSoundNotice();
        } else if (isMobileMenuOpen) {
            closeMobileMenu();
        }
    }
});

// Page visibility change handling
document.addEventListener('visibilitychange', function() {
    if (document.hidden && timerState.isRunning && !timerState.isPaused) {
        // Record time when page is hidden to prevent timing inaccuracy
        timerState.pausedTime += Date.now() - timerState.startTime - (timerState.elapsedTime * 1000);
    } else if (!document.hidden && timerState.isRunning && !timerState.isPaused) {
        // Restart timing when page is visible
        timerState.startTime = Date.now() - (timerState.elapsedTime * 1000);
    }
});

// Prevent page refresh when timer is running
window.addEventListener('beforeunload', function(e) {
    if (timerState.isRunning) {
        e.preventDefault();
        e.returnValue = 'Timer is running, are you sure you want to leave?';
        return e.returnValue;
    }
});

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    resetTimer();
    
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Setup input zoom prevention
    setupInputZoomPrevention();
    
    // Initialize audio on first user interaction
    const initAudioOnInteraction = () => {
        initializeAudio();
        
        // Remove listeners after first interaction
        document.removeEventListener('touchstart', initAudioOnInteraction);
        document.removeEventListener('click', initAudioOnInteraction);
        document.removeEventListener('keydown', initAudioOnInteraction);
    };
    
    // Add listeners for various interaction types
    document.addEventListener('touchstart', initAudioOnInteraction, { passive: true });
    document.addEventListener('click', initAudioOnInteraction);
    document.addEventListener('keydown', initAudioOnInteraction);
});

// Responsive handling
window.addEventListener('resize', function() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
    }
}); 
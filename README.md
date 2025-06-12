# Noah's IELTS Timer

A lightweight, elegant timer application designed specifically for IELTS practice sessions. Features a beautiful circular progress indicator, day/night mode toggle, and audio notifications.

## Features

### 📚 Reading Practice
- **60 min** - Full exam duration
- **20 min** - Single passage practice
- **18 min** - Quick practice
- **16 min** - Challenge practice
- **Custom time** (up to 60 minutes)

### ✍️ Writing Practice
- **60 min** - Full exam duration
- **40 min** - Task 2 practice
- **20 min** - Task 1 practice
- **15 min** - Quick practice
- **Custom time** (up to 60 minutes)

### 🎤 Speaking Practice
- **2 min** - Part 2 dedicated timer

### ☕ Break Timer
- **2, 5, 10, 15, 20, 30 minutes** - Preset break durations
- **Custom time** - Any duration for breaks

## Interface Features

### 🎨 Visual Design
- **Circular Progress Indicator** - Dynamic color-changing ring that transitions from teal to orange to red as time progresses
- **Glass Morphism Design** - Modern frosted glass effect for control panels
- **Responsive Layout** - Works perfectly on desktop and mobile devices
- **Day/Night Mode** - Toggle between light and dark themes

### 🔊 Audio Notifications
- Start/pause/resume sound effects
- Final 10-second countdown alerts
- Completion celebration sounds

### ⌨️ Keyboard Controls
- **Space Bar** - Pause/resume timer (only when timer is running)
- **Escape** - Close completion modal

### 🖱️ Mouse Controls
- **Click Circle** - Pause/resume timer
- **Click Buttons** - Start new timers (automatically resets current timer)

## How to Use

1. **Open the Application** - Simply open `index.html` in any modern web browser
2. **Select Practice Type** - Choose from Reading, Writing, Speaking, or Break
3. **Choose Duration** - Click preset buttons or enter custom time
4. **Start Timer** - Timer begins immediately with audio confirmation
5. **Control Timer** - Click the circle or press Space to pause/resume
6. **Toggle Theme** - Click sun/moon icon in top-right to switch day/night mode

## Technical Details

- **Single File Application** - Everything contained in one HTML file for easy portability
- **No Dependencies** - Uses only CDN resources (Tailwind CSS, Font Awesome)
- **Modern Browser Support** - Works with Chrome, Firefox, Safari, Edge
- **Lightweight** - Fast loading and minimal resource usage
- **Offline Ready** - Once loaded, works without internet (except for CDN resources)

## File Structure

```
index.html    # Complete application (HTML + CSS + JavaScript)
README.md               # This documentation
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## Installation

No installation required! Simply:

1. Download `index.html`
2. Open it in your web browser
3. Start practicing!

## Features in Detail

### Timer Behavior
- **Automatic Reset** - Starting a new timer automatically resets the current one
- **Pause/Resume** - Click the circle or press Space to control timing
- **Visual Feedback** - "Click to Pause" / "Click to Resume" text appears in circle center
- **Progress Tracking** - Real-time elapsed and remaining time display

### Color System
- **Teal** - Fresh start, plenty of time remaining
- **Orange** - Midway point, time to focus
- **Red** - Final stretch, urgency mode

### Audio System
- **Start Sound** - Confirmation beep when timer begins
- **Pause/Resume** - Different tones for pause and resume actions
- **Final Countdown** - Alert sounds in the last 10 seconds
- **Completion** - Celebratory three-tone sequence

## License

This project is open source and available under the MIT License.

## Author

Created by Xujun (Noah) Wang for IELTS practitioners worldwide. 🌍

---

*Happy practicing! 📚✨* 
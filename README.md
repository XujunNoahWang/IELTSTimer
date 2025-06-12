# Noah's IELTS Timer

A comprehensive, mobile-optimized timer application specifically designed for IELTS practice sessions. Features include customizable timers for all four IELTS skills, audio notifications, and a beautiful responsive interface.

## 🌟 Features

### Core Functionality
- **Multi-skill Support**: Dedicated timers for Reading, Writing, Speaking, and Break sessions
- **Preset Timers**: Quick-start buttons for common IELTS practice durations
- **Custom Timers**: Set any duration within reasonable limits
- **Visual Progress**: Beautiful circular progress indicator with color transitions
- **Audio Notifications**: Sound alerts for timer completion and warnings

### Mobile Optimization
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Touch-friendly Interface**: Large buttons and intuitive gestures
- **Mobile Menu**: Slide-out control panel for mobile devices
- **Zoom Prevention**: Prevents unwanted zooming on mobile input fields
- **Cross-browser Compatibility**: Works on iOS Safari, Android Chrome, and WeChat browser

### User Experience
- **Click Controls**: Click timer circle to pause/resume, double-click to stop
- **Keyboard Shortcuts**: Space to pause/resume, ESC to close modals
- **Day/Night Mode**: Toggle between light and dark themes
- **Sound Settings Guide**: Helpful instructions for audio setup
- **Completion Celebrations**: Animated completion notifications

## 🚀 Live Demo

Visit the live application: [https://noahs-ielts-timer.vercel.app/](https://noahs-ielts-timer.vercel.app/)

## 📁 Project Structure

```
IELTSTimer/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── css/
│   │   └── styles.css      # Custom CSS styles
│   └── js/
│       └── timer.js        # JavaScript functionality
├── assets/
│   └── audio/              # Audio files (if any)
├── package.json            # Project configuration
├── README.md              # Project documentation
└── index.html             # Legacy single-file version
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Custom styles with Flexbox and Grid layouts
- **JavaScript (ES6+)**: Modern JavaScript with modules and classes
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library
- **Web Audio API**: For cross-platform audio notifications

## 🏃‍♂️ Getting Started

### Prerequisites
- Python 3.x (for local development server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/XujunNoahWang/IELTSTimer.git
   cd IELTSTimer
   ```

2. **Start the development server**
   ```bash
   npm start
   # or
   python -m http.server 8000 --directory public
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### Alternative Setup
For a simple setup without a server, you can open `public/index.html` directly in your browser, though some features may require a server environment.

## 📱 Usage Guide

### Desktop Usage
1. Select a timer category (Reading, Writing, Speaking, Break)
2. Click a preset time or enter a custom duration
3. Click the circular timer to pause/resume
4. Use keyboard shortcuts for quick control

### Mobile Usage
1. Tap the hamburger menu (☰) to open the control panel
2. Select your desired timer
3. The panel will automatically close when a timer starts
4. Tap the timer circle to pause/resume

### Timer Controls
- **Start**: Click any timer button
- **Pause/Resume**: Click the timer circle or press Space
- **Stop**: Double-click the timer circle or press ESC
- **Sound Settings**: Click the orange notification button (!)

## 🎨 Customization

### Modifying Timer Presets
Edit the timer buttons in `public/index.html`:
```html
<button onclick="startTimer(25, 'Reading')">25 min</button>
```

### Styling Changes
Modify `src/css/styles.css` to customize:
- Colors and themes
- Layout and spacing
- Animations and transitions
- Mobile responsiveness

### Adding Features
Extend functionality in `src/js/timer.js`:
- New timer types
- Additional audio notifications
- Enhanced mobile features
- Data persistence

## 🔧 Development

### Code Structure
- **Modular Design**: Separated HTML, CSS, and JavaScript
- **Clean Architecture**: Well-organized functions and modules
- **Responsive First**: Mobile-first design approach
- **Cross-browser**: Tested on major browsers and platforms

### Best Practices
- Semantic HTML markup
- CSS custom properties for theming
- Modern JavaScript features
- Accessibility considerations
- Performance optimization

## 📊 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 70+ | ✅ Full Support |
| Firefox | 65+ | ✅ Full Support |
| Safari | 12+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| iOS Safari | 10+ | ✅ Full Support |
| Android Chrome | 70+ | ✅ Full Support |
| WeChat Browser | Latest | ✅ Full Support |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Test on multiple devices and browsers
3. Update documentation as needed
4. Ensure mobile compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Font Awesome for the beautiful icons
- The IELTS community for inspiration and feedback
- Vercel for hosting the live demo

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/XujunNoahWang/IELTSTimer/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your browser and device

---

**Happy IELTS practicing! 🎯** 
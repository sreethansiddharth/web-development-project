# Quizly - Interactive Quiz Application

A fully functional React-based quiz application with authentication, multiple subjects, and a modern UI built with Tailwind CSS.

## 🚀 Features

- **User Authentication**: Sign up and sign in functionality with local storage
- **Multiple Subjects**: 10 different quiz categories including Music, Movies, Math, Science, Computer Science, Geography, History, Mythology, Sports, and Miscellaneous
- **Quiz Customization**: Choose number of questions (5, 10, 15, 20) and difficulty level (Easy, Medium, Hard)
- **Interactive Quiz Interface**: Multiple choice questions with real-time scoring
- **User Profile Management**: View and edit user information
- **Reward System**: Earn coins for perfect scores and unlock rewards
- **Responsive Design**: Modern, mobile-friendly interface with glassmorphism effects

## 🛠️ Technical Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS 4 with custom glassmorphism effects
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Open Trivia Database (OpenTDB) for quiz questions
- **Build Tool**: Vite for fast development and building

## 🔧 Recent Fixes & Improvements

### ✅ Fixed Issues
1. **Navbar Component**: 
   - Fixed subject dropdown functionality
   - Proper integration with App component
   - Added all 10 subject categories
   - Fixed profile dropdown and navigation

2. **Quiz Component**: 
   - Corrected prop handling and state management
   - Fixed question display and answer handling
   - Added progress tracking and score display
   - Proper integration with quiz flow

3. **Profile Component**: 
   - Fixed user data editing functionality
   - Added proper form validation
   - Improved UI with Tailwind CSS
   - Fixed data persistence issues

4. **Authentication System**: 
   - Streamlined login/signup flow
   - Fixed user data storage and retrieval
   - Improved form styling and validation

5. **Quiz Flow**: 
   - Fixed subject selection and quiz setup
   - Corrected question fetching from API
   - Added proper quiz completion handling
   - Fixed reward system integration

### 🎨 UI/UX Improvements
- **Converted to Tailwind CSS**: Replaced all inline styles with Tailwind classes
- **Glassmorphism Design**: Modern, translucent UI elements with backdrop blur
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover effects, transitions, and animations
- **Color Scheme**: Consistent blue-purple gradient theme
- **Icon Integration**: Added emojis and visual elements for better UX

### 🏗️ Architecture Improvements
- **Component Structure**: Cleaner, more maintainable component hierarchy
- **State Management**: Simplified state flow and data handling
- **Error Handling**: Better error handling and user feedback
- **Performance**: Optimized re-renders and state updates

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📱 How to Use

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Choose Subject**: Select from 10 available quiz categories
3. **Quiz Setup**: Configure number of questions and difficulty level
4. **Take Quiz**: Answer multiple choice questions and track your progress
5. **View Results**: See your score, earn coins, and unlock rewards
6. **Manage Profile**: Edit your personal information and view statistics

## 🎯 Quiz Categories

- **Music** 🎵 - Test your knowledge of music history and theory
- **Movies** 🎬 - Challenge yourself with film trivia
- **Math** 📐 - Solve mathematical problems and equations
- **Science** 🔬 - Explore scientific concepts and discoveries
- **Computer Science** 💻 - Test your programming and tech knowledge
- **Geography** 🌍 - Learn about countries, capitals, and landmarks
- **History** 📚 - Dive into historical events and figures
- **Mythology** 🏛️ - Discover myths and legends from around the world
- **Sports** ⚽ - Test your sports knowledge and trivia
- **Miscellaneous** 🎲 - Random questions from various categories

## 🏆 Reward System

- **Perfect Score**: Earn 3 coins for getting all questions correct
- **Achievement Unlock**: Unlock special rewards at 250+ coins
- **Progress Tracking**: Monitor your quiz performance and improvement

## 🔒 Data Privacy

- All user data is stored locally in the browser
- No external data collection or tracking
- Secure authentication with local storage

## 🐛 Known Issues

- None currently - all major issues have been resolved!

## 🚀 Future Enhancements

- [ ] Leaderboard system
- [ ] Social sharing
- [ ] Offline quiz mode
- [ ] More quiz categories
- [ ] Advanced analytics
- [ ] Multiplayer quizzes

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ using React and Tailwind CSS**


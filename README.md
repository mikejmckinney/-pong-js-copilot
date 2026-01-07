# Pong Game

A classic Pong game built with HTML5, CSS3, and vanilla JavaScript. Play against a computer opponent in this timeless arcade game.

## Features

- **Two Player Modes**: Control the left paddle while the computer controls the right paddle
- **Dual Control Methods**: Control your paddle with either:
  - Mouse movement (Y-axis)
  - Arrow keys (Up/Down)
- **Intelligent AI**: Computer opponent with adaptive AI difficulty
- **Bouncing Ball**: Realistic ball physics with paddle spin
- **Collision Detection**: 
  - Ball bounces off paddles with angle variation
  - Ball bounces off top and bottom walls
  - Scoring when ball passes opponent
- **Live Scoreboard**: Real-time score tracking for both player and computer
- **Game Controls**:
  - Start/Pause game
  - Reset score

## How to Play

1. Open `index.html` in your web browser
2. Click "Start Game" to begin
3. Move your paddle using:
   - **Mouse**: Move your mouse up and down
   - **Keyboard**: Press ↑ (Up) and ↓ (Down) arrow keys
4. The ball bounces off paddles and walls
5. Score a point when the opponent's ball passes their paddle
6. First to get the most points wins!

## Game Mechanics

- **Ball Physics**: The ball gains speed with each paddle collision (multiplied by 1.05)
- **Paddle Spin**: Where you hit the ball on your paddle affects its vertical direction
- **AI Difficulty**: The computer opponent tracks the ball position and moves strategically
- **Wall Bouncing**: Ball reflects off top and bottom boundaries

## Project Structure

```
.
├── index.html      # Main HTML file with game canvas
├── style.css       # Styling and layout
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## Technical Details

- **Canvas Size**: 800x400 pixels
- **Paddle Dimensions**: 10x80 pixels
- **Ball Radius**: 6 pixels
- **Frame Rate**: 60 FPS (using requestAnimationFrame)
- **Controls**: Keyboard and mouse input handling

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- JavaScript ES6
- CSS3

## License

Free to use and modify.
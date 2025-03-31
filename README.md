# The Legend of Old Monk

The Legend of Old Monk is a 2D fighting game built using HTML, CSS, and JavaScript. The game features a player-controlled character, "Old Monk," and an AI-controlled enemy. Players can move, jump, and attack while battling the enemy in a dynamic environment.

## Features

- **Player Controls**: Move left, right, jump, and attack using keyboard inputs.
- **Enemy AI**: The enemy moves, attacks, and reacts dynamically based on the player's position.
- **Health System**: Both the player and the enemy have health bars that decrease upon taking hits.
- **Timer**: A countdown timer determines the end of the game.
- **Animations**: Smooth sprite animations for various actions like running, jumping, attacking, and taking hits.
- **Game Over Display**: Displays the winner or a tie when the game ends.


## How to Play

1. Clone or download the repository.
2. Open `index.html` in a web browser.
3. Use the following controls to play:
   - **Player Controls**:
     - `A`: Move left
     - `D`: Move right
     - `W`: Jump
     - `Space`: Attack
   - **Enemy Attack**:
     - `Arrow Down`: Trigger enemy attack (for testing purposes)

4. The game ends when:
   - The timer reaches 0.
   - Either the player or the enemy's health reaches 0.

## Installation

No installation is required. Simply open the `index.html` file in any modern web browser to start playing.

## Key Files

- **[index.html](index.html)**: The main HTML file that sets up the game interface.
- **[style.css](style.css)**: The stylesheet for the game (currently empty).
- **[main.js](main.js)**: Contains the main game loop, player and enemy initialization, and event listeners for controls.
- **[JS/class.js](JS/class.js)**: Defines the `Sprite` and `Fighter` classes for handling animations and character behavior.
- **[JS/functionalities.js](JS/functionalities.js)**: Contains utility functions like collision detection, enemy AI logic, and the game timer.

## Assets

- **Background**: `Mount_Fiji (n).jpg`
- **Player Sprites**: Located in `assets/Old_Monk/`
- **Enemy Sprites**: Located in `assets/Enemy/`

## Future Improvements

- Add sound effects for attacks and hits.
- Introduce more levels or environments.
- Add multiplayer support.
- Implement advanced enemy AI.
- Add more animations and character abilities.

## License

This project is for educational purposes and is not licensed for commercial use.

---

Enjoy playing **The Legend of Old Monk**!

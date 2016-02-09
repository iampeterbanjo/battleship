(function() {
	var game = new Game(), gameView;
	game.grid.init();
	/**
	 * Shorthand for document.querySelector
	 * @params {string} selector (css)
	 * @return {Element}
	*/
	function $$(selector) {
		return document.querySelector(selector);
	}

	/**
	 * Shorthand for document.createElement
	 * @params {string} type
	 * @return {Element}
	*/
	function element(type) {
		return document.createElement(type);
	}

	function GameView() {
		/** @member {Element} */
		this.gridElement = $$('.grid');
		/** @member {Element} */
		this.playerScore = $$('#player-score');
		/** @member {Element} */
		this.computerScore = $$('#computer-score');
		/** @member {Player} */
		this.human = game.human();
		/** @member {Player} */
		this.computer = game.computer();
		/** @member {boolean} */
		this.playersTurn = true;
		/** @member {number} */
		this.computerTimeout = 1000;
		this.scores = { player: 0 , computer: 0 };
	}


	GameView.prototype = {
		/**
		 * Starts the game
		 * @constructor
		 */
		init: function() {
			this.drawGrid();
			this.changeState('welcome');
			this.watchTargeting();
			this.watchControls();
			// dev only
			this.drawShips(this.human.getShips());
			this.drawShips(this.computer.getShips());
		}
		/**
		 * Change state of play
		 * @param {string} status
		*/
		, changeState: function(status) {
			var gameStatus = status.toUpperCase()
					, body = $$('body')
					, statusClasses = ['players-turn', 'computers-turn', 'welcome', 'end', 'win', 'lose'];

			statusClasses.map(function(klass) {
				body.classList.remove(klass);
			});

			switch(gameStatus) {
				case 'WELCOME':
					body.classList.add('welcome','players-turn');
					break;
				case 'END':
					body.classList.add('end');
					break;
				case 'PLAYERS_TURN':
					body.classList.add('players-turn');
					break;
				case 'COMPUTERS_TURN':
					body.classList.add('computers-turn');
					break;
				case 'PLAYER_WINS':
					body.classList.add('win', 'end');
					break;
				case 'COMPUTER_WINS':
					body.classList.add('lose', 'end');
					break;
				default:
					break;
			}
		}
		/**
		 * Ends the game
		*/
		, end: function() {
			this.changeState('end');
			this.drawShips(this.human.getShips());
			this.drawShips(this.computer.getShips());
		}
		/**
		 * Draw the Game grid as a table
		*/
		, drawGrid: function() {
			var fragment = document.createDocumentFragment()
					, tr, td, checkbox, span;

			for (var h = 0; h < game.grid.height; h++) {
				tr = element('tr');

				for (var w = 0; w < game.grid.width; w++) {
					td = element('td');
					td.setAttribute('data-coords', game.mapCoordinates({x: w, y: h}));

					checkbox = element('input');
					checkbox.type = 'checkbox';
					checkbox.setAttribute('data-x', w);
					checkbox.setAttribute('data-y', h);

					span = element('span');
					td.appendChild(checkbox);
					td.appendChild(span);
					tr.appendChild(td);
				}

				fragment.appendChild(tr);
			}

			this.gridElement.innerHTML = '';
			this.gridElement.appendChild(fragment);
		}
		, drawShips: function(ships) {
			var coords, pos, ship, element;

			for (var index = 0; index < ships.length; index++) {
				ship = ships[index];
				coords = ship.position.coordinates;

				coords.map(function(item, index) {
					pos = game.mapCoordinates(item);
					element = $$('[data-coords="' + pos + '"]');
					element.classList.add(ship.type);
					element.classList.add(ship.owner);
				});
			}
		}
		/**
		 * Alternate between player and computer
		*/
		, next: function() {
			var me = this;

			this.playersTurn = !this.playersTurn;

			if(!this.playersTurn) {
				me.changeState('COMPUTERS_TURN');

				window.setTimeout(function() {
					me.computersTurn();
				}, me.computerTimeout);
			} else {
				me.changeState('PLAYERS_TURN');
			}
		}
		, checkForWinner: function() {
			if(this.human.areAllShipsDestroyed()) {
				this.changeState('COMPUTER_WINS')
			}

			if(this.computer.areAllShipsDestroyed()) {
				this.changeState('PLAYER_WINS')
			}
		}
		/** Update score board*/
		, updateScores: function() {
			if(this.playersTurn) {
				this.scores.player += 1;
				this.playerScore.innerHTML = this.scores.player;
			} else {
				this.scores.computer += 1;
				this.computerScore.innerHTML = this.scores.player;
			}

			this.checkForWinner();
		}
		/**
		 * How players take shots at coordinates
		 * @param {Coordinates} coordinates
		 * @param {Element} input
		*/
		, aim: function(coordinates, input) {
			var me = this
					, hit = game.grid.target(coordinates);

			input.checked = true;

			if(game.grid.validPoint(coordinates.x)
			&& game.grid.validPoint(coordinates.y) && hit) {
				// alert('boom!');
				input.classList.add('boom');
			} else {
				input.classList.add('miss');
			}

			if(!hit) {
				this.next();
			} else {
				this.updateScores();

				if(!this.playersTurn) {
					window.setTimeout(function() {
						me.computersTurn();
					}, me.computerTimeout);
				}
			}
		}
		/**
		 * Watch for player clicks
		*/
		, watchTargeting: function() {
			var me = this;
			this.gridElement.addEventListener('click', function(event) {
				if(!me.playersTurn) {
					return;
				}

				var input = event.target
						, x = parseInt(input.getAttribute('data-x'), 10)
						, y = parseInt(input.getAttribute('data-y'), 10)
						, coordinates = {x: x, y: y};

				me.aim(coordinates, input);
			});
		}
		/**
		 * The computer guess a ship position
		*/
		, computersTurn: function() {
			var coordinates = this.computer.guess()
					, position = game.mapCoordinates(coordinates)
					, input = $$('[data-coords="' + position + '"] input');

			this.aim(coordinates, input);
		}
		/**
		 * Lets the player change the state of the game
		*/
		, watchControls: function() {
			var me = this;
			$$('.end').addEventListener('click', function(event) {
				me.end();

				event.preventDefault();
			});
			$$('.start').addEventListener('click', function(event) {
				me.init();

				event.preventDefault();
			});
		}
	};

	document.addEventListener('DOMContentLoaded', function() {
		gameView = new GameView();

		gameView.init();
	});
})();
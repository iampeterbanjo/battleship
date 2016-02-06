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
		this.gridElement = $$('.grid');
		this.human = game.human();
		this.computer = game.computer();
		this.playersTurn = true;
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
					, statusClasses = ['players-turn', 'welcome', 'end'];

			statusClasses.map(function(klass) {
				body.classList.remove(klass);
			});

			switch(gameStatus) {
				case 'WELCOME':
					body.classList.add('welcome');
					break;
				case 'END':
					body.classList.add('end');
					break;
				case 'PLAYERS_TURN':
					body.classList.add('players-turn');
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
				}, 500);
			} else {
				me.changeState('PLAYERS_TURN');
			}
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

			if(coordinates.x && coordinates.y && hit) {
				// alert('boom!');
				input.classList.add('boom');
			} else {
				input.classList.add('miss');
			}

			if(!hit) {
				this.next();
			} else if(!this.playersTurn) {
				window.setTimeout(function() {
					me.computersTurn();
				}, 500);
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
			console.log('computers Turn');
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
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
		, watchTargeting: function() {
			this.gridElement.addEventListener('click', function(event) {
				// if(!this.playerTurn) {
				// 	return;
				// }

				var input = event.target
						, x = parseInt(input.getAttribute('data-x'), 10)
						, y = parseInt(input.getAttribute('data-y'), 10)
						, coordinates = {x: x, y: y};

				if(x && y && game.grid.target(coordinates)) {
					// alert('boom!');
					input.classList.add('boom');
				}
			});
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
(function() {
	var game = new Game();
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
		this.playersTurn = true;
	}


	GameView.prototype = {
		/* @constructor */
		init: function() {
			this.watchTargeting();
			this.drawGrid();
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

			this.gridElement.appendChild(fragment);
		}
		, drawPlayerShips: function(ships, view) {
			var coords, pos, ship;

			for (var index = 0; index < ships.length; index++) {
				ship = ships[index];
				coords = ship.position.coordinates;

				coords.map(function(item, index) {
					pos = game.mapCoordinates(item);
					$$('[data-coords="' + pos + '"]').classList.add(ship.type);
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
			})
		}
	};

	document.addEventListener('DOMContentLoaded', function() {
		var gameView = new GameView()
				, human = game.human()
				, computer = game.computer()
				, humanShips = human.getShips()
				, computerShips = computer.getShips();

		gameView.init();

		gameView.drawPlayerShips(humanShips);
		gameView.drawPlayerShips(computerShips);
		gameView.watchTargeting();

	});
})();
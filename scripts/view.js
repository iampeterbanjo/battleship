(function(game) {
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
		this.grid = $$('.grid')
	}

	GameView.prototype = {
		/**
		 * Draw the Game grid as a table
		*/
		draw: function() {
			var fragment = document.createDocumentFragment()
					, tr, td, checkbox;

			for (var h = 0; h < game.grid.height; h++) {
				tr = element('tr');

				for (var w = 0; w < game.grid.width; w++) {
					td = element('td');

					checkbox = element('input');
					checkbox.type = 'checkbox';
					checkbox.setAttribute('data-x', w);
					checkbox.setAttribute('data-y', h);
					checkbox.setAttribute('data-coords', game.mapCoordinates({x: w, y: h}));

					td.appendChild(checkbox);
					tr.appendChild(td);
				}

				fragment.appendChild(tr);
			}

			this.grid.appendChild(fragment);
		}
	};

	document.addEventListener('DOMContentLoaded', function() {
		console.log('ready');

		var gameView = new GameView();
		gameView.draw();
	});
})(new Game());
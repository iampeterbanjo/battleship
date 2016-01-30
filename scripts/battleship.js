var Game = Game || function() {
	var self = this;

	self.grid = {
		width: 10
		, height: 10
		/**
		 * Checks if the proposed location for a ship
		 * fits on the grid
		 * @param {Ship} ship
		 * @param {Object} position
		 * @return {boolean} valid
		 */
		, validPosition: function(ship, position) {
			var valid = false;
			if(position.vertical && position.y + ship.size < this.height) {
				valid = true;
			} else if(!position.vertical && position.x + ship.size < this.width) {
				valid = true;
			}

			return valid;
		}
		/**
		 * Gets a ship at a position if there is one
		 * @param {number} y
		 * @param {number} x
		 */
		, getPosition: function(y, x) {
			return self.board[y][x]
		}
		/**
		 * Sets a ship at a position
		 * @param {Ship} ship
		 * @param {Object} position
		 * @param {number} position.y
		 * @param {number} position.x
		 * @param {boolean} position.vertical
		 */
		, setPosition: function(ship, position) {
			if(this.validPosition(ship, position)) {
				var pos = {
					type: ship.type
					, start: position.y
					, end: position.vertical ? position.y + ship.size : position.x + ship.size
					, damage: ship.damage
				}

				for (var index = 0; index < ship.size; index++) {
					if(position.vertical) {
						self.board[position.y + index][position.x] = pos;
					} else {
						self.board[position.y][position.x + index] = pos;
					}
				}

				ship.position = pos;
			} else {
				throw new Error('invalid position');
			}
		}
		/**
		 * Find a ship on the board given the coordinates
		 * @param {Object} coordinates
		 * @param {number} coordinates.x
		 * @param {number} coordinates.y
		 */
		, locate: function(coordinates) {
			return self.board[coordinates.y][coordinates.x];
		}
		/**
		 * Targets a position on the grid and damages any
		 * ship located there
		 * @param {Object} coordinates
		 * @param {number} coordinates.x
		 * @param {number} coordinates.y
		 */
		, target: function(coordinates) {
			var ship = this.locate(coordinates);
			if(ship) {
				ship.damage.push(coordinates);
			}

			return !!ship;
		}
	}

	// board is an array of [y][x] coordinates
	// because rows will be drawn first
	self.board = new Array(self.grid.height).fill(new Array(self.grid.width).fill(false));

	/**
	 * Gets a random int between min and max
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 */
	self.getRandomInt = function(min, max) {
		if(min > max) {
			min++;
		} else {
			max++;
		}
		return Math.floor(min + Math.random() * (max - min));
	}

	/**
	 * Gets user input in form of [a-j][d] e.g. 'A5'
	 * and translates it to grid coordinates
	 * @params {String} input
	 * @returns {Object} result {x, y}
	 */
	function translate(input) {
		var letter = input.toLowerCase()[0]
				, number = input.slice(1) * 1
				, coordinates = {}
				, chronometer = {
					'a': 0
					, 'b': 1
					, 'c': 2
					, 'd': 3
					, 'e': 4
					, 'f': 5
					, 'g': 6
					, 'h': 7
					, 'i': 8
					, 'j': 9
				};

		if(/[a-j]/.exec(letter) && number > 0 && number <= 10) {
			coordinates.x = chronometer[letter];
			coordinates.y = number;
		} else {
			throw new Error('invalid input');
		}

		return coordinates;
	}

	// SHIPS //
	function Ship(args) {
		this.type = args.type;
		this.size = args.size;
		this.position = 0;
		this.destroyed = false;
		this.damage = [];
	}

	function Destroyer(){
		return new Ship({size: 4, type: 'destroyer'});
	}

	function Battleship() {
		return new Ship({size: 5, type: 'battleship'});
	}

	var ShipFactory = function(type) {
		switch(type) {
			case 'destroyer':
				this.ShipType = Destroyer;
				break;
			case 'battleship':
				this.ShipType = Battleship;
				break;
			default:
				break;
		}

		return this.ShipType();
	}

	function createBattleship() {
		return ShipFactory('battleship');
	}

	function createDestroyer() {
		return ShipFactory('destroyer');
	}

	// PLAYERS //
	function Player() {
		// fill the array or else map wont work
		this.ships = new Array(3).fill(0);
		this.init = function() {
			var position = {
				x: self.getRandomInt(0,4)
				, y: self.getRandomInt(0,4)
				, vertical: !!self.getRandomInt(0,1)
			}

			this.ships = this.ships.map(function(ship, index) {
				if(index === 0) {
					ship = createBattleship();
				} else {
					ship = createDestroyer();
				}
				self.grid.setPosition(ship, position);

				return ship;
			});
		}
		this.getShips = function() {
			return this.ships;
		}
	}

	return {
		human: function() {
			var player = new Player();
			player.init();

			return player;
		}
		, computer: function() {
			var player = new Player();
			player.init();

			return player;
		}
		, grid: self.grid
		, createBattleship: createBattleship
		, createDestroyer: createDestroyer
		, start: function() {

		}
		, translate: translate
	}
}

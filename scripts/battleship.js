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

	/**
	 * board is an array of [y][x] coordinates
	 * because rows will be drawn first
	 * @prop
	 */
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
	 * @param {string} input
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

	/**
	 * Ship
	 * @class
	 * @param {Object} args
	 * @param {string} args.type
	 * @param {number} args.size
	*/
	function Ship(args) {
		/** @member {string} */
		this.type = args.type;
		/** @member {number} */
		this.size = args.size;
		/** @member {number} */
		this.position = 0;
		/** @member {boolean} */
		this.destroyed = false;
		/** @member {Array} */
		this.damage = [];
	}

	/** @private */
	function Destroyer(){
		return new Ship({size: 4, type: 'destroyer'});
	}

	/** @private */
	function Battleship() {
		return new Ship({size: 5, type: 'battleship'});
	}

	/**
	 * Ship Factory
	 * @param {string} type - destroyer or battleship
	 * @returns {Ship}
	*/
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

	/**
	 * Creates Battleships
	 * @returns {Ship} battleship
	*/
	function createBattleship() {
		return ShipFactory('battleship');
	}

	/**
	 * Creates Destroyers
	 * @returns {Ship} destroyer
	*/
	function createDestroyer() {
		return ShipFactory('destroyer');
	}

	/**
	 * Coordinates to access grid point x and y
	 * @class
	 * @param {Object} args
	 * @param {boolean} args.random
	 * @param {number} args.x
	 * @param {number} args.y
	 */
	function Coordinates(args) {
		var options = args || {
					random: false
						, x: false
						, y: false
					};

		/** @member {number} */
		this.x = !!options.random ? self.getRandomInt(0,4) : (options.x || false);
		/** @member {number} */
		this.y = !!options.random ? self.getRandomInt(0,4) : (options.y || false);
	}

	/**
	 * Position Class to place ships with orientation
	 * i.e. Coordinates with vertical property
	 * @class
	 */
	function Position(args) {
		var options = args || {
						random: false
						, vertical: false
					}
				, coordinates = new Coordinates({random: options.random});

		/** @member {number} */
		this.x = coordinates.x;
		/** @member {number} */
		this.y = coordinates.y;
		/** @member {boolean} */
		this.vertical = !!options.random ? !!self.getRandomInt(0,1) : !!options.vertical
	}

	/**
	 * A Player has 1 Battleshp and 2 Destroyers
	*/
	function Player() {
		// fill the array or else map wont work
		/** @member {Ships[]} */
		this.ships = new Array(3).fill(0);
		/** @constructor */
		this.init = function() {
			var position = new Position({random: true});

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
		/**
		 * @returns {Ships} this.ships
		 */
		this.getShips = function() {
			return this.ships;
		}
	}

	return {
		/**
		 * @returns {Player}
		*/
		human: function() {
			var player = new Player();
			player.init();

			return player;
		}
		/**
		 * Computer player can guess
		 * @returns {Player}
		*/
		, computer: function() {
			var player = new Player();
			player.init();

			/** @returns {Coordinates} */
			player.guess = function() {
				return new Coordinates({random: true});
			}

			return player;
		}
		, grid: self.grid
		, createBattleship: createBattleship
		, createDestroyer: createDestroyer
		, translate: translate
	}
}

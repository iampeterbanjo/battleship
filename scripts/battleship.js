var Game = Game || function() {
	var self = this;

	self.grid = {
		width: 10
		, height: 10
		, board: []
		/**
		 * Creates a two dimensional array for the board
		 * using this height and width
		 * @returns {Array} twoDimensions
		*/
		, createTwoDimensionalArray: function() {
			var twoDimensions = new Array(this.height);
			for (var y = 0; y < this.height; y++) {
				twoDimensions[y] = new Array(this.width).fill(false);
			}

			return twoDimensions;
		}
		/** @constructor */
		, init: function() {
			this.board = this.createTwoDimensionalArray();
		}
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
							, coordinates: []
						}
						, newX, newY;

				for (var index = 0; index < ship.size; index++) {
					if(position.vertical) {
						newX = position.x;
						newY = position.y + index;
					} else {
						newX = position.x + index;
						newY = position.y;
					}

					pos.coordinates.push({x: newX, y: newY});
					this.board[newY][newX] = pos;
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
		, getPosition: function(coordinates) {
			return this.board[coordinates.y][coordinates.x];
		}
		/**
		 * Targets a position on the grid and damages any
		 * ship located there
		 * @param {Object} coordinates
		 * @param {number} coordinates.x
		 * @param {number} coordinates.y
		 */
		, target: function(coordinates) {
			var ship = this.getPosition(coordinates);
			if(ship) {
				ship.damage.push(coordinates);
			}

			return !!ship;
		}
	}

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
	 * Converts a string or number point
	 * to string between A-J or number between 0 - 9
	 * @private
	 * @param {string|number} z
	 * @returns {string|number} result
	*/
	self.chronometer = function(z){
		var result
				, stringMap = {
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
				}
				, numberMap = {
					0: 'a'
					, 1: 'b'
					, 2: 'c'
					, 3: 'd'
					, 4: 'e'
					, 5: 'f'
					, 6: 'g'
					, 7: 'h'
					, 8: 'i'
					, 9: 'j'
				};

		if(typeof z == 'string') {
			result = stringMap[z];
		} else {
			result = numberMap[z];
		}

		return result;
	}


	/**
	 * Checks a point is between the range
	 * of the grid
	 * @private
	 * @param {number} point
	 * @returns {boolean}
	*/
	function validPoint(point) {
		return point >= 0 && point < self.grid.width;
	}

	/**
	 * Gets user input in form of [a-j][d] e.g. 'A5'
	 * and maps it to grid coordinates
	 * @param {string} input
	 * @returns {Object} result {x, y}
	 */
	function mapInput(input) {
		var letter = input.toLowerCase()[0]
				, number = input.slice(1) * 1
				, coordinates = {}

		if(/[a-j]/.exec(letter) && validPoint(number)) {
			coordinates.x = self.chronometer(letter);
			coordinates.y = number;
		} else {
			throw new Error('invalid input');
		}

		return coordinates;
	}

	/**
	 * Gets coordinates and maps them to user input e.g.
	 * {x: 0, y: 4} becomes 'A5'
	 * @param {Object} coordinates
	 * @param {number} coordinates.x
	 * @param {number} coordinates.y
	 * @returns {string}
	*/
	function mapCoordinates(coordinates) {
		var x = self.chronometer(coordinates.x)
				, y = coordinates.y
				, result;

		if(x && validPoint(y)) {
			result = x.toUpperCase() + y;
		} else {
			throw new Error('invalid coordinates');
		}

		return result;
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
		/** @member {Array} */
		this.damage = [];
		/** @member {boolean} */
		this.isDestroyed = function(){
			return this.size === this.damage.length;
		}
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
	 * merge two objects
	 * where values in first overwrite second
	 * @param {Object} first
	 * @param {Object} second
	 * @returns {Object} merged
	*/
	function merge(first, second) {
		var merged = first || {};

		for (var key in second) {
			if (second.hasOwnProperty(key)) {
				merged[key] = second[key];
			}
		}

		return merged;
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
		var defaults = {
					random: false
					, x: false
					, y: false
					, vertical: false
					, size: 0
				}
				, options, maxX, maxY
				, limitX = self.grid.width - 1
				, limitY = self.grid.height - 1;

		options = merge(defaults, args);
		// increase range of random int to spread
		// ships out on the board e.g. if vertical 10 < x > -1
		//  else 10 < y > -1
		if(options.random) {
			options.vertical = !!self.getRandomInt(0,1);

			if(options.vertical) {
				maxX = limitX;
				maxY = limitY - options.size;
			} else {
				maxX = limitX - options.size;
				maxY = limitY;
			}
		}

		/** @member {number} */
		this.x = !!options.random ? self.getRandomInt(0,maxX) : options.x;
		/** @member {number} */
		this.y = !!options.random ? self.getRandomInt(0,maxY) : options.y;
		/** @member {boolean} */
		this.vertical = options.vertical;
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
			this.ships = this.ships.map(function(ship, index) {
				if(index === 0) {
					ship = createBattleship();
				} else {
					ship = createDestroyer();
				}

				var position = new Coordinates({random: true, size: ship.size});
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
		, mapCoordinates: mapCoordinates
		, createBattleship: createBattleship
		, createDestroyer: createDestroyer
		, mapInput: mapInput
	}
}

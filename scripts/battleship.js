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
			if(this.validPoint(position.y) && this.validPoint(position.x)) {

				if(position.vertical && (position.y + ship.size) <= this.height) {
					valid = true;
				} else if(!position.vertical && (position.x + ship.size) <= this.width) {
					valid = true;
				}
			}

			return valid;
		}

		/**
		* Checks a point is between the range
		* of the grid
		* @param {number} point
		* @returns {boolean}
		*/
		, validPoint: function(point) {
			return point >= 0 && point < self.grid.width;
		}

		/**
		 * Return all the squares on the grid
		 * the ship of a certain size and orientation
		 * will occupy given the coordinates
		 *
		*/
		, getProjection: function(coordinates) {
				var projection = []
						, newX, newY;

				for (var index = 0; index < coordinates.size; index++) {
					if(coordinates.vertical) {
						newX = coordinates.x;
						newY = coordinates.y + index;
					} else {
						newX = coordinates.x + index;
						newY = coordinates.y;
					}

					projection.push({x: newX, y: newY});
				}

			return projection;
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
			console.dir(ship);
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
	 * Gets user input in form of [a-j][d] e.g. 'A5'
	 * and maps it to grid coordinates
	 * @param {string} input
	 * @returns {Object} result {x, y}
	 */
	function mapInput(input) {
		var letter = input.toLowerCase()[0]
				, number = input.slice(1) * 1
				, coordinates = {}

		if(/[a-j]/.exec(letter) && self.grid.validPoint(number)) {
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

		if(x && self.grid.validPoint(y)) {
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
		/** @member {string} */
		this.owner = '';
		/** @member {boolean} */
		this.isDestroyed = function(){
			return this.size === this.damage.length;
		}
	}

	/** creates a destroyer */
	function Destroyer(){
		return new Ship({size: 4, type: 'destroyer'});
	}

	/** creates a battleship */
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
	 * @param {string} owner
	 * @returns {Ship} battleship
	*/
	function createBattleship(owner) {
		var battleship = ShipFactory('battleship');
		battleship.owner = owner;
		return battleship;
	}

	/**
	 * Creates Destroyers
	 * @param {string} owner
	 * @returns {Ship} destroyer
	*/
	function createDestroyer(owner) {
		var destroyer = ShipFactory('destroyer');
		destroyer.owner = owner;
		return destroyer;
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

	/** get the next quadrant */
	self.quadrant = 0;
	function nextQuadrant() {
		if(self.quadrant === 4) {
			self.quadrant = 1;
		} else {
			self.quadrant += 1;
		}

		return self.quadrant;
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
				, options
				, newX
				, newY
				, edge
				, currentQuadrant = nextQuadrant()
				, limitX = self.grid.width - 1
				, limitY = self.grid.height - 1
				, halfLimitX = Math.floor(limitX / 2)
				, halfLimitY = Math.floor(limitY / 2);

		options = merge(defaults, args);

		if(options.random) {
			options.vertical = !!self.getRandomInt(0,1);

			// to prevent collisions divide the grid
			// into four quadrants and define their edges
			/*
					---------
					| 1 | 2	|
					|--------
					| 3 | 4 |
					---------
			*/
			if(currentQuadrant === 1) {
				edge = {
					x: { min: 0, max: halfLimitX }
					, y: { min: 0, max: halfLimitY }
				}
			} else if(currentQuadrant === 2) {
				edge = {
					x: { min: halfLimitX + 1, max: limitX }
					, y: { min: 0, max: halfLimitX }
				}
			} else if(currentQuadrant === 3) {
				edge = {
					x: { min: 0, max: halfLimitX }
					, y: { min: halfLimitY + 1, max: limitY }
				}
			} else {
				edge = {
					x: { min: halfLimitX + 1, max: limitX }
					, y: { min: halfLimitY + 1, max: limitY }
				}
			}

			// if its vertical x can be random
			// if its horizontal y can be random
			if(options.vertical) {
				newX = self.getRandomInt(edge.x.min, edge.x.max);
				newY = edge.y.min;
			} else {
				newX = edge.x.min;
				newY = self.getRandomInt(edge.y.min, edge.y.max);
			}
		}

		/** @member {number} */
		this.x = !!options.random ? newX : options.x;
		/** @member {number} */
		this.y = !!options.random ? newY : options.y;
		/** @member {boolean} */
		this.vertical = options.vertical;
		this.quadrant = currentQuadrant;
	}

	/**
	 * A Player has 1 Battleshp and 2 Destroyers
	 * @param {string} owner
	*/
	function Player(owner) {
		self.quadrant = self.getRandomInt(1,4);
		// fill the array or else map wont work
		/** @member {Ships[]} */
		this.ships = new Array(3).fill(0);
		/** @constructor */
		this.init = function() {
			this.ships = this.ships.map(function(ship, index) {
				if(index === 0) {
					ship = createBattleship(owner);
				} else {
					ship = createDestroyer(owner);
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
			var player = new Player('friend');
			player.init();

			return player;
		}
		/**
		 * Computer player can guess
		 * @returns {Player}
		*/
		, computer: function() {
			var player = new Player('foe');
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

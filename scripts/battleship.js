var Game = Game || function() {
	var self = this;

	// board is an array of [y][x] coordinates
	self.board = new Array(self.grid.height).fill(new Array(self.grid.width).fill(0));

	self.grid = {
		/**
		 * Checks if the proposed location for a ship
		 * fits on the grid
		 * @param {Ship} ship
		 * @param {Object} position
		 * @return {boolean} valid
		 */
		validPosition: function(ship, position) {
			var valid = false;
			if(position.vertical && position.y + ship.size < self.grid.height) {
				valid = true;
			} else if(!position.vertical && position.x + ship.size < self.grid.width) {
				valid = true;
			}

			return valid;
		}
		/**
		 * Gets a ship at a position if there is one
		 *
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
					, start: position.vertical ? position.y : position.x
					, end: position.vertical ? position.y + ship.size : position.x + ship.size
				}

				for (var index = 0; index < ship.size; index++) {
					if(position.vertical) {
						self.board[position.y + index][position.x] = pos;
					} else {
						self.board[position.y][position.x + index] = pos;
					}
				}
			} else {
				throw new Error('invalid position');
			}
		}
	}

	self.grid.width = 10;
	self.grid.height = 10;

	// SHIPS //
	function Ship(args) {
		this.position = new Array(args.size).fill(0);
		this.type = args.type;
		this.size = args.size;
		/**
		 * Sets the position of a ship
		 * @param {object} x, y, vertical
		 * A ship has a location
		 * A location belongs to the Grid
		 */
		this.setPosition = function(args) {
			this.position = this.position.map(function(loc, index) {
				return loc = {x: args.x, y: args.y + index, vertical: args.vertical};
			});
		};
		this.getPosition = function() {
			return this.position;
		};
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
			this.ships = this.ships.map(function(ship, index) {
				if(index === 0) {
					ship = createBattleship();
				} else {
					ship = createDestroyer();
				}
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

			return player;
		}
		, getGrid: function() {
			return self.grid;
		}
		, createBattleship: createBattleship
		, createDestroyer: createDestroyer
	}
}

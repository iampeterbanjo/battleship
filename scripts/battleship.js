var Game = Game || function() {
	var self = this;

	self.grid = {}
	self.grid.width = 10;
	self.grid.height = 10;

	// SHIPS //
	function Ship(args) {
		this.location = new Array(args.size);
		this.type = args.type;
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

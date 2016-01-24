var Game = Game || function() {
	var self = this;

	self.grid = {}
	self.grid.width = 10;
	self.grid.height = 10;

	function Ship(size) {
		return {
			location: new Array(size)
		};
	}

	function Destroyer(){
		return new Ship(4);
	}

	function Battleship() {
		return new Ship(5);
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

	return {
		player: function() {

		}
		, computer: function() {

		}
		, getGrid: function() {
			return self.grid;
		}
		, createBattleship: function() {
			return ShipFactory('battleship');
		}
		, createDestroyer: function() {
			return ShipFactory('destroyer');
		}
	}
}

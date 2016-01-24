var Game = Game || function() {
	var self = this;

	self.grid = {}
	self.grid.width = 10;
	self.grid.height = 10;

	return {
		player: function() {

		}
		, computer: function() {

		}
		, getGrid: function() {
			return self.grid;
		}
		, createBattleship: function() {
			return {
				location: new Array(5)
			}
		}
		, createDestroyer: function() {
			
		}
	}
}

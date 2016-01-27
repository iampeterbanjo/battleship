describe('Battleships', function() {
	describe('the Game', function() {
		it('should have a human', function() {
			expect(new Game().human).toBeDefined();
		});

		it('should have a computer', function() {
			expect(new Game().computer).toBeDefined();
		});

		it('should have a grid', function() {
			expect(new Game().grid).toBeDefined();
		});

		it('should have a 10x10 grid', function() {
			var grid = new Game().grid;
			expect(grid.width).toBe(10);
			expect(grid.height).toBe(10);
		});

		it('should create battleships', function() {
			expect(new Game().createBattleship).toBeDefined();
		});

		it('should create a battleship on 5 squares', function() {
			var game = new Game()
			expect(game.createBattleship().size).toBe(5);
		});

		it('should create destroyers', function() {
			expect(new Game().createDestroyer).toBeDefined();
		});

		it('should create a destroyer on 4 squares', function() {
			var game = new Game()
					, destroyer = game.createDestroyer();
			expect(destroyer.size).toBe(4);
		});
	}); // The Game

	describe('the Player(s)', function() {
		it('should have ships', function() {
			var human = new Game().human();

			expect(human.getShips).toBeDefined();
		});

		it('should have only 3 ships', function() {
			expect(new Game().human().getShips().length).toBe(3);
		});

		it('should have 1 battleship and 2 destroyers', function() {
			var battleship = [], destroyers = []
					, ships = new Game().human().getShips();

			ships.map(function(ship) {
				if(ship.type === 'destroyer') {
					destroyers.push(ship);
				} else if(ship.type === 'battleship') {
					battleship.push(ship);
				}
			});

			expect(battleship.length).toBe(1);
			expect(destroyers.length).toBe(2);
		});
	});	// the Players

	describe('the Ship(s)', function() {
		it('should have a size', function() {
			expect().toBe(false);
		});
		it('should have a type', function() {
			expect().toBe(false);
		});
	});

	describe('the Grid', function() {
		it('should have a way to get/set a position on the grid', function() {
			expect(new Game().grid.setPosition).toBeDefined();
			expect(new Game().grid.getPosition).toBeDefined();
		});

		it('should set a position', function() {
			expect().toBe(false);
		});
	}); // the Ships
});

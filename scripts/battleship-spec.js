describe('Battleships', function() {
	describe('the Game', function() {
		it('should have a human', function() {
			expect(new Game().human).toBeDefined();
		});

		it('should have a computer', function() {
			expect(new Game().computer).toBeDefined();
		});

		it('should get a grid', function() {
			expect(new Game().getGrid).toBeDefined();
		});

		it('should have a 10x10 grid', function() {
			var grid = new Game().getGrid();
			expect(grid.width).toBe(10);
			expect(grid.height).toBe(10);
		});

		it('should create battleships', function() {
			expect(new Game().createBattleship).toBeDefined();
		});

		it('should create a battleship on 5 squares', function() {
			var game = new Game()
			expect(game.createBattleship().getPosition().length).toBe(5);
		});

		it('should create destroyers', function() {
			expect(new Game().createDestroyer).toBeDefined();
		});

		it('should create a destroyer on 4 squares', function() {
			var game = new Game()
					, destroyer = game.createDestroyer();
			expect(destroyer.getPosition().length).toBe(4);
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

	describe('the Grid', function() {
		it('should have a way to get/set a position on the grid', function() {
			expect(new Game().createDestroyer().setPosition).toBeDefined();
			expect(new Game().createDestroyer().getPosition).toBeDefined();
		});

		it('should set a position', function() {
			var battleship = new Game().createBattleship()
					, position;

			battleship.setPosition({x: 'A', y: 5, vertical: false});
			position = battleship.getPosition();

			expect(position[0].x).toBe('A');
			expect(position[0].y).toBe(5);
		});
	}); // the Ships
});

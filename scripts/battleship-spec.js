describe('Battleships', function() {
	var game;

	beforeEach(function() {
		game = new Game();
	});

	describe('the Game', function() {
		it('should have a human', function() {
			expect(game.human).toBeDefined();
		});

		it('should have a computer', function() {
			expect(game.computer).toBeDefined();
		});

		it('should have a grid', function() {
			expect(new Game().grid).toBeDefined();
		});

		it('should have a 10x10 grid', function() {
			var grid = game.grid;
			expect(grid.width).toBe(10);
			expect(grid.height).toBe(10);
		});

		it('should create battleships', function() {
			expect(game.createBattleship).toBeDefined();
		});

		it('should create a battleship on 5 squares', function() {
			expect(game.createBattleship().size).toBe(5);
		});

		it('should create destroyers', function() {
			expect(game.createDestroyer).toBeDefined();
		});

		it('should create a destroyer on 4 squares', function() {
			var destroyer = game.createDestroyer();
			expect(destroyer.size).toBe(4);
		});
	}); // The Game

	describe('the Player(s)', function() {
		var human;

		beforeEach(function() {
			human = new Game().human();
		});

		it('should have ships', function() {
			expect(human.getShips).toBeDefined();
		});

		it('should have only 3 ships', function() {
			expect(human.getShips().length).toBe(3);
		});

		it('should have 1 battleship and 2 destroyers', function() {
			var battleship = [], destroyers = []
					, ships = human.getShips();

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
		var battleship;

		beforeEach(function() {
			battleship = new Game().createBattleship();
		});

		it('should have a size', function() {
			expect(battleship.size).toBeDefined();
		});
		it('should have a type', function() {
			expect(battleship.type).toBeDefined();
		});
		it('should have an unset position', function() {
			expect(battleship.position).toBe(0);
		});
	});

	describe('the Grid', function() {
		var grid, game;

		beforeEach(function() {
			game = new Game();
			grid = game.grid;
		});

		it('should have a way to get/set a position on the grid', function() {
			expect(grid.setPosition).toBeDefined();
			expect(grid.getPosition).toBeDefined();
		});

		it('should set a position', function() {
			var battleship = game.createBattleship()
					, position = {x: 2, y: 2, vertical: false};

			expect(battleship.position).toBe(0);

			grid.setPosition(battleship, position);

			expect(battleship.position).toEqual({
				start: position.y
				, end: position.x + battleship.size
				, type: battleship.type
			});
		});
	}); // the Ships
});

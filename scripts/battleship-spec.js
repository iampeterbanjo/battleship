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

		it('should not be destroyed', function() {
			expect(battleship.destroyed).toBe(false);
		});

		it('should not be damaged', function() {
			expect(battleship.damage).toEqual([]);
		});
	}); // the Ship(s)

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
				, damage: []
			});
		});

		it('should error for invalid positions', function() {
			var destroyer = game.createDestroyer();
			expect(function() { grid.setPosition(destroyer, {x: 6, y: 0, vertical: false}) }).toThrow(new Error('invalid position'));
			expect(function() { grid.setPosition(destroyer, {x: 6, y: -1, vertical: false}) }).toThrow(new Error('invalid position'));
			expect(function() { grid.setPosition(destroyer, {x: 0, y: 6, vertical: true}) }).toThrow(new Error('invalid position'));
		});

		it('should be able to locate', function() {
			expect(grid.locate).toBeDefined();
		});

		it('should locate a ship given a position', function() {
			var destroyer = game.createDestroyer()
					, position = {x: 2, y: 2, vertical: false};

			grid.setPosition(destroyer, position);

			expect(grid.locate({x: 0, y: 0})).toBe(false);
			expect(grid.locate({x: position.x, y: position.y}).type).toBe('destroyer');
		});

		it('should damage a targeted ship', function() {
			var destroyer = game.createDestroyer()
					, position = {x: 2, y: 2, vertical: false}
					, coordinates = {x: position.x, y: position.y};

			grid.setPosition(destroyer, position);

			expect(grid.target(coordinates)).toBe(true);
			expect(destroyer.damage.length).toBe(1);
			expect(destroyer.damage[0]).toEqual(coordinates);
		});
	}); // the Grid

	describe('the Rules', function() {
		var game;
		beforeEach(function() {
			game = new Game();
		});

		it('should start', function() {
			expect(game.start).toBeDefined();
		});

		it('should start with player\'s ships at random positions', function() {
			var ships = game.computer().getShips();
			expect(ships[0].position).not.toEqual(ships[1].position);
		});

		it('translates player input', function() {
			expect(game.translate('A5')).toEqual({x: 0, y: 5});
			expect(game.translate('j2')).toEqual({x: 9, y: 2});
			expect(function() { game.translate('x5') }).toThrow(new Error('invalid input'));
			expect(function() { game.translate('a15') }).toThrow(new Error('invalid input'));
			expect(function() { game.translate('a15') }).toThrow(new Error('invalid input'));
		});
	});
});

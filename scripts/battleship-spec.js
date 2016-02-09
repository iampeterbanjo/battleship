describe('Battleships', function() {
	var game;

	beforeEach(function() {
		game = new Game();
		game.grid.init();
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
		var human, computer;

		beforeEach(function() {
			game.grid.init();
			human = game.human();
			computer = game.computer();
		});

		it('should have a name', function() {
			expect(human.name).toBeDefined();
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

		it('should have all ships undestroyed', function() {
			var ships = human.getShips();

			expect(human.areAllShipsDestroyed()).toBe(false);
		});

		it('should know if all its ships are destroyed', function() {
			human.getShips().map(function(ship) {
				ship.position.coordinates.map(function(coords) {
					game.grid.target(coords, computer);
				});
			});

			expect(human.areAllShipsDestroyed()).toBe(true);
		});
	});	// the Players

	describe('the Ship(s)', function() {
		var battleship;

		beforeEach(function() {
			battleship = new Game().createBattleship('test');
		});

		it('should have a size', function() {
			expect(battleship.size).toBeDefined();
		});

		it('should have a type', function() {
			expect(battleship.type).toBeDefined();
		});

		it('should have an owner', function() {
			expect(battleship.owner).toBeDefined();
		});

		it('should have an unset position', function() {
			expect(battleship.position).toBe(0);
		});

		it('should not be destroyed', function() {
			expect(battleship.isDestroyed()).toBe(false);
		});

		it('should not be damaged', function() {
			expect(battleship.damage).toEqual([]);
		});
	}); // the Ship(s)

	describe('the Grid', function() {
		var grid, game, human, computer;

		beforeEach(function() {
			game = new Game();
			grid = game.grid;
			grid.init();
			human = game.human();
			computer = game.computer();
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

			expect(battleship.position.end).toEqual(position.x + battleship.size);
			expect(battleship.position.start).toEqual(position.y);
			expect(battleship.position.coordinates[0])
			.toEqual({x: position.x, y: position.y});
		});

		it('should error for invalid positions', function() {
			var destroyer = game.createDestroyer();
			expect(function() { grid.setPosition(destroyer, {x: 7, y: 0, vertical: false}) }).toThrow(new Error('invalid position'));
			expect(function() { grid.setPosition(destroyer, {x: 6, y: -1, vertical: false}) }).toThrow(new Error('invalid position'));
			expect(function() { grid.setPosition(destroyer, {x: 0, y: 7, vertical: true}) }).toThrow(new Error('invalid position'));
		});

		it('should locate a ship given a position', function() {
			var destroyer = game.createDestroyer()
					, position = {x: 2, y: 2, vertical: false};

			grid.setPosition(destroyer, position);

			expect(grid.getPosition({x: 0, y: 0})).toBe(false);
			expect(grid.getPosition({x: position.x, y: position.y}).type).toBe('destroyer');
		});

		it('should damage a targeted ship', function() {
			var destroyer = human.getShips()[1]
					, position = {x: 2, y: 2, vertical: false}
					, coordinates = {x: position.x, y: position.y};

			grid.setPosition(destroyer, position);

			expect(grid.target(coordinates, computer)).toBe(true);
			expect(destroyer.damage.length).toBe(1);
			expect(destroyer.damage[0]).toEqual(coordinates);
		});

		it('should get the projection given coordinates', function() {
			var horizontalProjection = grid.getProjection({x:0, y:0, vertical:false, size:4})
					, verticalProjection = grid.getProjection({x:0, y:0, vertical:true, size:4})
					, expectedHorizontalProjection = [
						{x: 0, y: 0}
						, {x: 1, y: 0}
						, {x: 2, y: 0}
						, {x: 3, y: 0}
					]
					, expectedVerticalProjection = [
						{x: 0, y: 0}
						, {x: 0, y: 1}
						, {x: 0, y: 2}
						, {x: 0, y: 3}
					]

			expect(horizontalProjection).toEqual(expectedHorizontalProjection);
			expect(verticalProjection).toEqual(expectedVerticalProjection);
		});
	}); // the Grid

	describe('the Rules', function() {
		var game, human, computer;

		beforeEach(function() {
			game = new Game();
			game.grid.init();
			human = game.human();
			computer = game.computer();
		});

		it('should start with player\'s ships at random positions', function() {
			var ships = game.computer().getShips();
			expect(ships[0].position).not.toEqual(ships[1].position);
		});

		it('maps player input', function() {
			expect(game.mapInput('A5')).toEqual({x: 0, y: 5});
			expect(game.mapInput('j2')).toEqual({x: 9, y: 2});
			expect(function() { game.mapInput('x5') }).toThrow(new Error('invalid input'));
			expect(function() { game.mapInput('a15') }).toThrow(new Error('invalid input'));
			expect(function() { game.mapInput('a15') }).toThrow(new Error('invalid input'));
		});

		it('maps coordinates', function() {
			expect(game.mapCoordinates({x: 0, y: 4})).toEqual('A4');
			expect(function() { game.mapCoordinates({x: 1, y: 14}) }).toThrow(new Error('invalid coordinates'));
		});

		it('should destroy completely damaged ships', function() {
			var destroyer = human.getShips()[0];

			game.grid.setPosition(destroyer, {x: 0, y: 0, vertical: false});
			for (var index = 0; index < destroyer.size; index++) {
				game.grid.target({x: index, y: 0}, computer);
			}
			expect(destroyer.isDestroyed()).toBe(true);
		});
	}); // the Rules

	describe('the Computer', function() {
		it('can guess a ship\'s coordinates', function() {
			expect(game.computer().guess).toBeDefined();
		});

		it('guesses a ship\'s coordinates', function() {
			var coordinates = game.computer().guess();

			expect(coordinates.x >= 0).toBe(true);
			expect(coordinates.x <= 9).toBe(true);
			expect(coordinates.y >= 0).toBe(true);
			expect(coordinates.y <= 9).toBe(true);
		});
	}); // the Computer
});

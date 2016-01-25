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

		it('should create a battleships', function() {
			expect(new Game().createBattleship).toBeDefined();
		});

		it('should create a battleship on 5 squares', function() {
			var game = new Game()
			expect(game.createBattleship().location.length).toBe(5);
		});

		it('should create destroyers', function() {
			expect(new Game().createDestroyer).toBeDefined();
		});

		it('should create a destroyer on 4 squares', function() {
			var game = new Game()
					, destroyer = game.createDestroyer();
			expect(destroyer.location.length).toBe(4);
		});
	});

	describe('the player(s)', function() {
		it('should ships', function() {
			var human = new Game().human();

			expect(human.getShips).toBeDefined();
		});
	});
});

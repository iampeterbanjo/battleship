describe('the Game', function() {
	it('should have a player', function() {
		expect(new Game().player).toBeDefined()
	});

	it('should have a computer', function() {
		expect(new Game().computer).toBeDefined()
	});

	it('should get a grid', function() {
		expect(new Game().getGrid).toBeDefined()
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
				, battleship = game.createBattleship()
		expect(battleship.location.length).toBe(5)
	});

	it('should create destroyers', function() {
		expect(new Game().createDestroyer).toBeDefined();
	});
});
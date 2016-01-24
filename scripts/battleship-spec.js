describe('battleship', function() {
	it('should have a player', function() {
		expect(new Battleship().player).toBeDefined()
	});

	it('should have a computer', function() {
		expect(new Battleship().computer).toBeDefined()
	});

	it('should get a grid', function() {
		expect(new Battleship().getGrid).toBeDefined()
	});

	it('should have a 10x10 grid', function() {
		var grid = new Battleship().getGrid();
		expect(grid.width).toBe(10);
		expect(grid.height).toBe(10);
	});

	it('should have a battleship', function() {
		expect(new Battleship().getBattleship).toBeDefined();
	});
});
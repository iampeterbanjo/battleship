describe('battleship', function() {
	it('should have a player', function() {
		expect(new Battleship().player).toBeDefined()
	});

	it('should have a computer', function() {
		expect(new Battleship().computer).toBeDefined()
	});
});
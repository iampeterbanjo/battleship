describe("battleship", function() {
	it("should have a player", function() {
		var battleship = new Battleship()
		expect(battleship.player).toBeDefined()
	});
});
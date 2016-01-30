# board

board is an array of [y][x] coordinates
because rows will be drawn first

# getPosition

Gets a ship at a position if there is one

**Parameters**

-   `y` **number** 
-   `x` **number** 

# locate

Find a ship on the board given the coordinates

**Parameters**

-   `coordinates` **Object** 
    -   `coordinates.x` **number** 
    -   `coordinates.y` **number** 

# setPosition

Sets a ship at a position

**Parameters**

-   `ship` **Ship** 
-   `position` **Object** 
    -   `position.y` **number** 
    -   `position.x` **number** 
    -   `position.vertical` **boolean** 

# target

Targets a position on the grid and damages any
ship located there

**Parameters**

-   `coordinates` **Object** 
    -   `coordinates.x` **number** 
    -   `coordinates.y` **number** 

# validPosition

Checks if the proposed location for a ship
fits on the grid

**Parameters**

-   `ship` **Ship** 
-   `position` **Object** 

Returns **boolean** valid

# getRandomInt

Gets a random int between min and max

**Parameters**

-   `min` **number** 
-   `max` **number** 

Returns **number** 

# computer

Computer player can guess

Returns **Player** 

# Coordinates

Coordinates to access grid point x and y

**Parameters**

-   `args` **Object** 
    -   `args.random` **boolean** 
    -   `args.x` **number** 
    -   `args.y` **number** 

# createBattleship

Creates Battleships

Returns **Ship** battleship

# createDestroyer

Creates Destroyers

Returns **Ship** destroyer

# damage

# destroyed

# getShips

Returns **Ships** this.ships

# guess

Returns **Coordinates** 

# human

Returns **Player** 

# init

# Player

A Player has 1 Battleshp and 2 Destroyers

# position

# Position

Position Class to place ships with orientation
i.e. Coordinates with vertical property

**Parameters**

-   `args`  

# Ship

Ship

**Parameters**

-   `args` **Object** 
    -   `args.type` **string** 
    -   `args.size` **number** 

# ShipFactory

Ship Factory

**Parameters**

-   `type` **string** destroyer or battleship

Returns **Ship** 

# ships

# size

# translate

Gets user input in form of [a-j][d] e.g. 'A5'
and translates it to grid coordinates

**Parameters**

-   `input` **string** 

Returns **Object** result {x, y}

# type

# vertical

# x

# x

# y

# y

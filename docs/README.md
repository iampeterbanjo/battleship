# createTwoDimensionalArray

Creates a two dimensional array for the board
using this height and width

Returns **Array** twoDimensions

# getPosition

Find a ship on the board given the coordinates

**Parameters**

-   `coordinates` **Object** 
    -   `coordinates.x` **number** 
    -   `coordinates.y` **number** 

# init

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

**Parameters**

-   `owner` **string** 

Returns **Ship** battleship

# createDestroyer

Creates Destroyers

**Parameters**

-   `owner` **string** 

Returns **Ship** destroyer

# damage

# getShips

Returns **Ships** this.ships

# guess

Returns **Coordinates** 

# human

Returns **Player** 

# init

# isDestroyed

# mapCoordinates

Gets coordinates and maps them to user input e.g.
{x: 0, y: 4} becomes 'A5'

**Parameters**

-   `coordinates` **Object** 
    -   `coordinates.x` **number** 
    -   `coordinates.y` **number** 

Returns **string** 

# mapInput

Gets user input in form of [a-j][d] e.g. 'A5'
and maps it to grid coordinates

**Parameters**

-   `input` **string** 

Returns **Object** result {x, y}

# merge

merge two objects
where values in first overwrite second

**Parameters**

-   `first` **Object** 
-   `second` **Object** 

Returns **Object** merged

# owner

# Player

A Player has 1 Battleshp and 2 Destroyers

**Parameters**

-   `owner` **string** 

# position

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

# type

# vertical

# x

# y

# Coordinates

Coordinates to access grid point x and y

**Parameters**

-   `args`  

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

# Position

Position Class to place ships with orientation
i.e. Coordinates with vertical property

**Parameters**

-   `args`  

# translate

Gets user input in form of [a-j][d] e.g. 'A5'
and translates it to grid coordinates

**Parameters**

-   `input`  

Returns **Object** result {x, y}

# vertical

# x

# x

# y

# y

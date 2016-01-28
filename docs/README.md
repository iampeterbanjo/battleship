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

# validPosition

Checks if the proposed location for a ship
fits on the grid

**Parameters**

-   `ship` **Ship** 
-   `position` **Object** 

Returns **boolean** valid

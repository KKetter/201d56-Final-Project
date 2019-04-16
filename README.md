# 201d56-Final-Project
## Tile Slide
    Motivation: 

## Download/Setup:

[Tile Slide GH Repo](https://github.com/KKetter/201d56-Final-Project.git)
    
[Tile Slide Deployment](www.trustMeThisWorks.com)



## Program Operation:
    Upon opening Tile Slide the user is greeted with a nickname entry field and a start button.

![index-page](../blob/master/img/index.png)

    Once a user has provided a nickname and clicked submit the application generates a 3 x 3 grid with numbers 1-8 and a blank space.

    Scoring begins on game grid load.

![game-grid](../blob/master/img/game.png)

    The user is then trying to reorder the tiles numerically as shown below:
    
                      | 1 -> 2 -> 3 |->
                    ->| 4 -> 5 -> 6 |->
                    ->| 7 -> 8      |
    
    This must be accomplisedh by only moving tiles adjancent to the empty square.

    All working solutions ignore the empty square when checking for box ordering.  

    Two of the possible solutions are shown below

![solution1](../blob/master/img/solution1.png)

![solution2](../blob/master/img/solution2.png)

    After completion the user is directed to a scores page.  
    
    From this page the following options are provided:
        1) Play Again - user nickname is saved to local storage and grid is reinitialized.

        2) New user - user is sent back to nickname entry, scores are retained.

        3) Reset scores - all scores/users from the sessions are deleted and the user is sent back to the start page.

    Additional Pages:
        About Us - providing some developer information and future update plans
    
## Technology Used:
    - HTML5
    - CSS
    - Javascript

## Color Palette:
    - #304F5E Background
    - #F6927C Font color
    - #46B9AB Heading color
    - #CBC556 Tiles

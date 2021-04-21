# Your little painting gallery :art:

This is a group project by [rayguo17](https://github.com/rayguo17) and [pwvli-vio](https://github.com/pwvli-vio). We managed to make a online painting application, user cannot only draw on our paint board as in other painting app, but also, they can safe their work to cloud, and then continue to work on it later, we use [firebase](https://firebase.google.com/) as our backend.
![website Appearance](/assets/images/website_Apperance.png)

## some important feature :pencil:

In this painting app, we have 16 buttons at the bottom, from left to right, they are:

1. pen brush
2. draw an outlined rectangle.
3. draw an outlined circle.
4. draw a straight line.
5. draw a polygons (can choose the number of sides).
6. painting fill Bucket function.
7. clear the sides, (can be undo).
8. eraser.
9. input text.
10. undo.
11. redo.
12. upload image to paint board.
13. download paint board as png file to local disk.
14. save paint to firebase cloud storage.
15. search the painting by name in firebase and paint it in the paint board.

For the last two buttons, they work as explained below:

1. save the paint board to local and cloud storage, user have to input a name as paint board identifier.
 ![Save button demo](/assets/images/save_button.gif) 
 
2. after refreshing website, can still get the safed work from cloud;
![search button demo](/assets/images/get_paint.gif)
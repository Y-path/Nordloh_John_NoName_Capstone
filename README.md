# CP 325.9 (Capstone)

## Description

Genreator(NoName) is a dynamic music application that adapts the styling to the selected artist or genre.  It enables the user to favorite artists 

and post reviews with photos related to artists or concert experiences.  The Spotify API and MongoDB to recieve and store data.

## Technology Used

JavaScript, Node, Express, MongoDB, Mongoose, React, CSS, TailwindCSS, The Spotify API, EmailJS

## Installation and Methods

Files can be opened directly from my Github repository which is located here: https://github.com/Y-path/Nordloh_John_NoName_Capstone.

Access the database and the Spotify API by using my connection string and client ID/SECRET which will be attached to the submission

 of this project.

BACKEND

GET routes

http://localhost:5000/favorites -- gets all favorites

http://localhost:5000/favorites/:id -- gets a specific favorite

http://localhost:5000/reviews -- gets 5 reviews

http://localhost:5000/reviews/:id -- gets a specific review

POST routes

http://localhost:5000/artists -- adds an artist

http://localhost:5000/favorites -- adds an artist to favorites

http://localhost:5000/reviews -- adds a new review

PUT routes

http://localhost:5000/reviews/:id -- updates a review

DELETE routes

http://localhost:5000/favorites/:id -- deletes a specific favorite

http://localhost:5000/reviews/:id -- deletes a specific review

FRONTEND

Refreshing the page loads a random genre and the associated styling.  

Search by genre to load the top 30 artists for that genre.

Search by artist to recieve the top 5 results.

Click on an artist to open the sidebar showing artist details, including a link to their Spotify page.

Within the sidebar you can favorite an artist.

The favorites page allows you to view all of the favorited artists, and remove them with the click of a button.

The reviews page allows you to post a review of an artist and upload a concert photo if desired.

The contact page is a simple form that will send a message to my email address.

## Authors

John Nordloh

## License

This project is not licensed.

## Acknowledgements

https://www.w3schools.com/

https://developer.mozilla.org/

https://stackoverflow.com/

https://www.geeksforgeeks.org/

https://tailwindcss.com/

https://fonts.google.com/

https://www.gradientmagic.com/

Google

Javascript Crash Course - book

Manara (the GOAT)

## Project Status

This project is a work in progress.  I hope to integrate a log in feature that allows the user to save favorites to a unique list.   

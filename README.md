# Eventura

Hey! I developed Eventura, a web application dedicated to the creation and management of events as part of my graduation project. Eventura is built with a modern stack using Laravel for backend management, Inertia.js for front-back communication without page reload, and React for a dynamic and responsive user interface.

The main objective of Eventura is to provide a complete and intuitive solution for music event organizers, whether it is concerts, festivals, private parties, or any other type of musical gathering.

It adopts an architecture based on the concept of "contexts" to organize its code in a modular and coherent way. Each context represents a specific functional area of the application, which allows for grouping related functionalities and maintaining a clear separation of concerns.

## Installation

1. Clone this repository
   `git clone https://github.com/neitsabb/events-tfe`
2. Install dependencies
   `composer install && npm install`
3. Configure .env
4. Run migrations & seeders
   `
php artisan migrate --seed`
5. Go to /login and sign in with example account
   **Email** : test@example.com
   **Password** : password
6. Enjoy

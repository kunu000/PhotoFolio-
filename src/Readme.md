// PhotoFolio is an online photo album react app that allows users to upload, organize, and share their digital photos.

// Functionalities

- PhotoFolio App allow users to maintain images by category in various Albums.
- It provide options for users to save, preview, and download images.
- The application has user-friendly interface and have a visually appealing design that encourages users to explore and use the platform regularly.
  It provide options for users to edit image details.

// Component Structure
The PhotoFolio app is built using 6 components:

- AlbumForm: Displays a form to create a new album in the database

- AlbumsList: Displays a list of albumns fetched from the database

- ImageForm: Displays a form to create and update images in a specific album

- ImagesList: Displays a list of images in a specific album

- Carousel: Displays images in a model window as a carousel

-Navbar: Displays the logo image and text

// Third party
The PhotoFolio app uses the following third-party components:

- react-loader-spinner: provides simple React SVG spinner component which can be implemented for async await operation before data loads to the view.

- react-toastify: Allows you to add notifications to your app with ease.

// API Structure
The firebase API would look like this:

- albums To store all the albums

- images To store all the images associated with a particular album

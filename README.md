# README

## User Profile Search

This project is a simple web application that allows users to search for GitHub profiles and view repositories. The application is built using HTML, CSS, and JavaScript, and it utilizes the GitHub API to fetch user data.

### Features

1. **User Search**: Users can input a GitHub username in the search bar and click the search button to fetch and display the user's repositories.

2. **User Details**: The application displays essential user details, including the user's avatar, name, location, and Twitter handle.

3. **Pagination**: Users can navigate through multiple pages of repositories using the pagination buttons.

### Getting Started

To run the application, follow these steps:

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/utkarshml/Fly.git
    ```

2. Open the `index.html` file in a web browser.

### Usage

1. Open the application in your web browser.

2. Enter a GitHub username in the search bar.

3. Click the search button to fetch and display the user's repositories.

4. Explore the user's details and repositories.

### Code Structure

- **HTML**: The structure of the web page is defined in the `index.html` file.

- **CSS**: Styling is applied using the `style.css` file in the `public/styles` directory. External styles from the [Unicons](https://iconscout.com/unicons) library are also used.

- **JavaScript**: The functionality of the application is implemented in the `fetch.js` file. It handles user input, fetches data from the GitHub API, and dynamically updates the UI.

### External Libraries

- [Unicons](https://iconscout.com/unicons): Used for including icons in the application.

### API Integration

The application uses the GitHub API to fetch user repositories. The API request is triggered when the user clicks the search button, and the fetched data is displayed on the page.

```javascript
const inputValue = document.getElementById("search");
const btn = document.getElementById("searchBtn");

btn.addEventListener("click", (e) => {
   e.preventDefault()
   let value = inputValue.value;
   fetch(`https://api.github.com/users/${value}/repos`)
   .then((data) => {
      if(data.status != 200){
        throw Error()
      }
      else{
        return data.json()
      }
   })
   .then((data) => {
     window.localStorage.setItem("token" , value)
     window.localStorage.setItem("len" , data.length)
     window.location.href = `user.html`
   })
   .catch((err) => {
      alert("User Not Found");
   })
})
```

### Support and Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](#).

### Author

- **Utkarsh** - [GitHub Profile](https://github.com/utkarsh)
  
Feel free to contribute to the project and make it even better!

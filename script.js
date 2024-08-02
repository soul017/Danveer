document.addEventListener("DOMContentLoaded", function () {
  // Navigation buttons
  const navButtons = {
    homeButton: "index.html",
    aboutButton: "about.html",
    contactButton: "contact.html",
    libraryButton: "library.html",
  };

  for (const id in navButtons) {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", function () {
        window.location.href = navButtons[id];
      });
    }
  }

  // Event listener for the Donate buttons
  const donateNowButtons = document.querySelectorAll(".donateButton");
  donateNowButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = "donate.html";
    });
  });

  // Contact form submission
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    const successmsg = document.querySelector("#successMessage");
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (successmsg) {
        successmsg.style.display = "block";
      }
      contactForm.reset();
    });
  }

  // Donate form submission
  const donateForm = document.querySelector(".donate-form");
  if (donateForm) {
    donateForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Form submitted successfully!");
      donateForm.reset();
    });
  }
});

// Function to fetch and display books
async function getbooks() {
  document.getElementById("output").innerHTML = "";
  const query = encodeURIComponent(document.getElementById("input").value);
  try {
    const response = await fetch(
      "http://openlibrary.org/search.json?q=" + query
    );
    const data = await response.json();

    for (let i = 0; i < 10; i++) {
      if (data.docs[i]) {
        const bookContainer = document.createElement("div");
        bookContainer.className = "book-container";

        const title = document.createElement("h2");
        title.className = "book-title";
        title.textContent = data.docs[i].title;
        bookContainer.appendChild(title);

        const author = document.createElement("p");
        author.className = "book-author";
        author.textContent = data.docs[i].author_name
          ? data.docs[i].author_name[0]
          : "Unknown Author";
        bookContainer.appendChild(author);

        const coverImage = document.createElement("img");
        coverImage.className = "book-cover";
        coverImage.src = data.docs[i].isbn
          ? "http://covers.openlibrary.org/b/isbn/" +
            data.docs[i].isbn[0] +
            "-M.jpg"
          : "";
        bookContainer.appendChild(coverImage);

        document.getElementById("output").appendChild(bookContainer);
      }
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
}

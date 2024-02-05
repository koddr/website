import { themeChange } from "theme-change";

// Set theme based on user preference.
if (!localStorage.getItem("theme")) {
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? localStorage.setItem("theme", "dark")
    : localStorage.setItem("theme", "light");
}

// Apply theme on page load.
themeChange();

// Function to get the value of a cookie by name.
const getCookie = (name) => {
  // Encode the cookie name to handle special characters.
  const encodedName = encodeURIComponent(name);

  // Create a regular expression to match the encoded cookie name and its value.
  const regex = new RegExp(
    "(?:^|; )" +
      encodedName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
  );

  // Match the regular expression against the document's cookies.
  const matches = document.cookie.match(regex);

  // If there is a match, return the decoded value of the cookie.
  // Otherwise, return undefined.
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Function to set cookie.
const setCookie = (name, value, options = {}) => {
  // Set the default path option to '/'.
  options = { path: "/", ...options };

  // Convert expires option to UTC string if it's a Date object.
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  // Encode the name and value of the cookie.
  const encodedName = encodeURIComponent(name);
  const encodedValue = encodeURIComponent(value);
  let updatedCookie = `${encodedName}=${encodedValue}`;

  // Loop through each option key and append it to the updated cookie string.
  for (let optionKey in options) {
    if (options.hasOwnProperty(optionKey)) {
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `; ${optionKey}=${optionValue}`;
      } else {
        updatedCookie += `; ${optionKey}`;
      }
    }
  }

  // Set the cookie in the browser.
  document.cookie = updatedCookie;
};

// If cookie 'cc' is undefined, show toast.
if (getCookie("cc") === undefined) {
  // Define banner element and OK button.
  const cookieConfirm = document.querySelector(".cookie-confirm");
  const cookieConfirmButton = document.querySelector(".cookie-confirm-button");

  // Show toast.
  cookieConfirm.classList.remove("hidden");

  // Click on button to hidden banner and set cookie 'cc=1'.
  cookieConfirmButton.addEventListener("click", () => {
    cookieConfirm.classList.add("hidden");
    setCookie("cc", "1", { secure: true, "max-age": 60 * 60 * 24 * 180 });
  });
}

// Set datetime for phone mockup to current.
document
  .querySelectorAll(".current-datetime")
  .forEach(
    (el) =>
      (el.textContent = new Date().toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }))
  );

// Set current year.
document
  .querySelectorAll(".current-year")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

// Remove 'open' attribute from details when clicked to section.
// document.querySelector('section').addEventListener('click', () => {
//     document.querySelector('details.dropdown').removeAttribute('open');
// });

export function formatDate(inputDate) {
  // Convert the input date string to a Date object
  const dateObj = new Date(inputDate);

  // Define the month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract the year, month, and day from the Date object
  const year = dateObj.getFullYear();
  const monthIndex = dateObj.getMonth();
  const day = dateObj.getDate();

  // Format the date as "Month day, Year"
  const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;
  return formattedDate;
}

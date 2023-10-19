export function setCurrentDay() {
    const currentDate = new Date();

    // Define an array to map day names
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Get the current day of the week (0-6)
    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth();
    const currentDayOfMonth = currentDate.getDate();

    // Use the current day to fetch the corresponding day name from the array
    const currentDayName = daysOfWeek[currentDay];
    const currentMonthName = months[currentMonth];

    return `${currentDayName}, ${currentMonthName} ${currentDayOfMonth}`;
}
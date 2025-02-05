// GLOBAL DATES

const currentDate = '2019/09/22';
const weekStartDate = '2019/09/15';

// CLASS INSTANTIATIONS

let currentUser;
let userRepo;
let userHydration;
let userSleep;
let userActivity;
let activityRepo;

// QUERY SELECTORS

const headerDate = document.getElementById('headerDate');
const headerMessage = document.getElementById('headerMessage');

const homeGrid = document.getElementById('homeGrid');
const userInfo = document.getElementById('userInfo');
const userStepGoal = document.getElementById('userStepGoal');
const userAvgStepGoal = document.getElementById('avgStepGoal');

const hydrationGrid = document.getElementById('hydrationGrid');
const dailyWater = document.getElementById('userDailyWater');
const weeklyWater = document.getElementById('userWeeklyWater');
const weeklyHydrationGraph = document.getElementById('userWeeklyHydrationGraph');

const sleepGrid = document.getElementById('sleepGrid');
const userHoursSlept = document.getElementById('userHoursSlept');
const userSleepQuality = document.getElementById('userSleepQuality');
const userAvgHoursSlept = document.getElementById('avgHoursSlept');
const userAvgSleepQuality = document.getElementById('avgSleepQuality');
const weeklyHoursSleptGraph = document.getElementById('userHoursSleptGraph');
const weeklySleepQualityGraph = document.getElementById('userSleepQualityGraph');

const activityGrid  = document.getElementById('activityGrid');
const weeklyActivityGraph = document.getElementById('userWeeklyActivityGraph');
const userDailyStepCount = document.getElementById('userDailyStepCount');
const userDailyDistance = document.getElementById('userDailyDistance');
const userDailyActivity = document.getElementById('userDailyActivity');
const compareUserActivity = document.getElementById('compareUserActivity');

const homeButton = document.getElementById('homeButton');
const hydrationButton = document.getElementById('hydrationButton');
const sleepButton = document.getElementById('sleepButton');
const activityButton = document.getElementById('activityButton');

// EVENT LISTENERS

window.addEventListener('load', loadPage);
homeButton.addEventListener('click', viewHome);
hydrationButton.addEventListener('click', viewHydration);
sleepButton.addEventListener('click', viewSleep);
activityButton.addEventListener('click', viewActivity);

// FUNCTIONS

function loadPage() {
  userRepo = new UserRepository(userData);
  currentUser = new User(userRepo.retrieveUserData(getRandomIndex(userData)));
  userHydration = new UserHydration(currentUser, hydrationData);
  userSleep = new UserSleep(currentUser, sleepData);
  userActivity = new UserActivity(currentUser, activityData, userData);
  sleepRepo = new SleepRepository(sleepData);
  activityRepo = new ActivityRepository(activityData);
  viewHome();
}

function getRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length);
  return index;
}

function dateDisplay(date) {
  const names = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  const nums = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];
  let [ year, month, day ] = date.split('/');
  let monthName;
  nums.forEach(monthNum => {
    if (month === monthNum) {
      monthName = names[nums.indexOf(monthNum)];
    }
  });
  let dateLong = `${monthName} ${day}, ${year}`;

  return dateLong;
}

// home

function displayUserHomeData() {
  currentUser.firstName = currentUser.returnFirstName();
  const avgStepGoal = userRepo.retrieveAvgStepGoal();
  const fullDate = dateDisplay(currentDate);
  headerDate.innerText = `${fullDate}`;
  headerMessage.innerText = `Welcome, ${currentUser.firstName}!`;
  userInfo.innerHTML = `
    <p class='name' id='name'>${currentUser.name}</p>
    <p class='address' id='address'>${currentUser.address}</p>
    <p class='email' id='email'>${currentUser.email}</p>
    <p class='stride' id='stride'>stride length: ${currentUser.stride}
    </p>`;

  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
  userAvgStepGoal.innerText = `${avgStepGoal}`;
}

// hydration

function displayUserHydrationData() {
  const dailyOz = userHydration.retrieveNumOzByDate(currentDate);
  const weeklyOz = userHydration.calculateAvgWeeklyWater(weekStartDate);
  displayHydrationChart();
  headerMessage.innerText = `${currentUser.firstName}'s Hydration Data`;
  weeklyWater.innerText = `You've averaged ${weeklyOz} oz of water during the week of ${dateDisplay(weekStartDate)}`;
  dailyWater.innerText = `${dailyOz} oz`;
}

function displayHydrationChart() {
  const userWeeklyWater = new Chart(weeklyHydrationGraph, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Ounces of Water',
        backgroundColor: 'lightblue',
        data: userHydration.retrieveNumOzByWeek(weekStartDate),
      }],
    },
    options: {
      legend: {
        display: false
      },
    }
  });
}

// sleep

function displayUserSleepData() {
  headerMessage.innerText = `${currentUser.firstName}'s Sleep Data`;

  displayLastDaySleepData();
  displayLastWeekSleepData();
  displayAvgSleepData();
}

function displayLastDaySleepData() {
  const dailyHoursSlept = userSleep.retrievePropByDate(currentDate, 'hoursSlept');
  const dailySleepQuality = userSleep.retrievePropByDate(currentDate, 'sleepQuality');
  userHoursSlept.innerText = `${dailyHoursSlept}`;
  userSleepQuality.innerText = `${dailySleepQuality}`;
}

function displayAvgSleepData() {
  const avgHoursSlept = userSleep.calculatePropAvg('hoursSlept');
  const avgSleepQuality = userSleep.calculatePropAvg('sleepQuality');
  userAvgHoursSlept.innerText = `${avgHoursSlept}`;
  userAvgSleepQuality.innerText = `${avgSleepQuality}`;
}

function displayLastWeekSleepData() {
  const userHoursSlept = userSleep.retrievePropByWeek(weekStartDate, 'hoursSlept');
  const userAvgSleepQuality = userSleep.retrievePropByWeek(weekStartDate, 'sleepQuality');
  displaySleepHoursChart();
  displaySleepQualityChart();
}

function displaySleepHoursChart() {
  const hoursSleptGraph = new Chart(weeklyHoursSleptGraph, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Hours of Sleep',
        backgroundColor: 'lightblue',
        data: userSleep.retrievePropByWeek(weekStartDate, 'hoursSlept'),
      }],
    },
    options: {
      legend: {
        display: false
      },
    }
  });
}

function displaySleepQualityChart() {
  const sleepQualityGraph = new Chart(weeklySleepQualityGraph, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Sleep Quality',
        backgroundColor: 'lightblue',
        data: userSleep.retrievePropByWeek(weekStartDate, 'sleepQuality'),
      }],
    },
    options: {
      legend: {
        display: false
      },
    }
  });
}


// activity

function displayUserActivityData() {
  headerMessage.innerText = `${currentUser.firstName}'s Activity Data`;
  displayDailySteps();
  displayMinutesActive();
  displayWeeklyActivityStats();
  displayDailyStatComparison();
}

function displayDailySteps() {
  const userDailySteps = userActivity.retrievePropByDate(currentDate, 'numSteps');
  const userDistance = userActivity.calculateDailyMilesWalked(currentDate);
  userDailyStepCount.innerText = `${userDailySteps}`;
  userDailyDistance.innerText = `${userDistance}`;
}

function displayMinutesActive() {
  const userMinActive = userActivity.retrievePropByDate(currentDate, 'minutesActive');
  userDailyActivity.innerText = `${userMinActive}`;
}

function displayWeeklyActivityStats() {
  const userWeeklySteps = userActivity.retrievePropLogByWeek('2019/09/15', 'numSteps' )
  const userMinActive = userActivity.retrievePropLogByWeek('2019/09/15', 'minutesActive');
  const userStairsClimbed = userActivity.retrievePropLogByWeek('2019/09/15', 'flightsOfStairs');
  displayActivityChart();
}

function displayActivityChart() {
  const weeklyActivity = new Chart(weeklyActivityGraph, {
    type: 'bar',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'TODAY'],
      datasets: [{
        label: 'Minutes Active',
        backgroundColor: 'lightblue',
        data: userActivity.retrievePropLogByWeek(weekStartDate, 'minutesActive'),
      }],
    },
    options: {
      legend: {
        display: false
      },
    }
  });
}

function displayDailyStatComparison() {
  const userDailySteps = userActivity.retrievePropByDate(currentDate, 'numSteps');
  const userDailyMinActive = userActivity.retrievePropByDate(currentDate, 'minutesActive');
  const userDailyStairs = userActivity.retrievePropByDate(currentDate, 'flightsOfStairs');

  const allUserDailySteps = activityRepo.calculatePropAvgByDate(currentDate, 'numSteps');
  const allUserDailyMinActive = activityRepo.calculatePropAvgByDate(currentDate, 'minutesActive');
  const allUserDailyStairs = activityRepo.calculatePropAvgByDate(currentDate, 'flightsOfStairs');

  const stepComparison = Math.round((userDailySteps / allUserDailySteps) * 100);
  const minComparison = Math.round((userDailyMinActive / allUserDailyMinActive) * 100);
  const stairComparison = Math.round((userDailyStairs / allUserDailyStairs) * 100);

  compareUserActivity.innerText = `
      Steps: ${stepComparison}%
      Min: ${minComparison}%
      Stairs: ${stairComparison}%`;
}

// HTML TOGGLING

function viewHome() {
  displayUserHomeData();
  activateHomeButton();
  homeGrid.classList.remove('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.add('hidden');
  hydrationButton.classList.remove('hydration-button-active');
}

function viewHydration() {
  displayUserHydrationData();
  activateHydrationButton();
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.remove('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.add('hidden');
}

function viewSleep() {
  displayUserSleepData()
  activateSleepButton();
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.remove('hidden');
  activityGrid.classList.add('hidden');
  hydrationButton.classList.remove('hydration-button-active');
}

function viewActivity() {
  displayUserActivityData()
  activateActivityButton();
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.remove('hidden');
  hydrationButton.classList.remove('hydration-button-active');
}

// BUTTON TOGGLING

function activateHomeButton() {
  homeButton.classList.add('active');
  hydrationButton.classList.remove('active');
  sleepButton.classList.remove('active');
  activityButton.classList.remove('active');
  homeButton.innerHTML = '<i class="fas fa-house-user"></i>';
  hydrationButton.innerText = 'Hydration';
  sleepButton.innerText = 'Sleep';
  activityButton.innerText = 'Activity';
}

function activateHydrationButton() {
  homeButton.classList.remove('active');
  hydrationButton.classList.add('active');
  sleepButton.classList.remove('active');
  activityButton.classList.remove('active');
  homeButton.innerText = 'Home';
  hydrationButton.innerHTML = '<i class="fas fa-tint"></i>';
  sleepButton.innerText = 'Sleep';
  activityButton.innerText = 'Activity';
}

function activateSleepButton() {
  homeButton.classList.remove('active');
  hydrationButton.classList.remove('active');
  sleepButton.classList.add('active');
  activityButton.classList.remove('active');
  homeButton.innerText = 'Home';
  hydrationButton.innerText = 'Hydration';
  sleepButton.innerHTML = '<i class="fas fa-bed"></i>';
  activityButton.innerText = 'Activity';
}

function activateActivityButton() {
  homeButton.classList.remove('active');
  hydrationButton.classList.remove('active');
  sleepButton.classList.remove('active');
  activityButton.classList.add('active');
  homeButton.innerText = 'Home';
  hydrationButton.innerText = 'Hydration';
  sleepButton.innerText = 'Sleep';
  activityButton.innerHTML = '<i class="fas fa-hiking"></i>';
}

const User = require('../src/User');
const SleepEntry = require('../src/SleepEntry');
const ActivityEntry = require('../src/ActivityEntry');

class UserRepository {
  constructor() {
    this.userData = [];
    this.sleepData = [];
    this.activityData = [];
    this.avgStepGoal = null;
  }

  // dataset constructors & initial property assignment

  populateUserData(dataset) {
    this.userData = dataset.map(user => new User(user));
  }

  populateSleepData(dataset) {
    this.sleepData = dataset.map(entry => new SleepEntry(entry));
  }

  populateActivityData(dataset) {
    this.activityData = dataset.map(entry => new ActivityEntry(entry));
  }

  retrieveUserData(id) {
    return this.userData[id - 1];
  }

  retrieveAvgStepGoal() {
    const stepGoalArray = this.userData.map(user => user.dailyStepGoal);
    const stepGoalSum = stepGoalArray.reduce((sum, goal) => {
      return sum + goal;
    });

    this.avgStepGoal = Math.round(stepGoalSum / this.userData.length);

    return this.avgStepGoal;
  }

  
  // sleepData methods

  // single user

  calculateAvgHrsSleptByUser(id) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const dailyHrsSlept = userLog.map(entry => entry.hoursSlept);
    const totalHrsSlept = dailyHrsSlept.reduce((sum, hrs) => {
      return sum + hrs;
    });
    const avgHrs = totalHrsSlept / dailyHrsSlept.length;

    return parseFloat(avgHrs.toFixed(1));
  }

  calculateAvgSleepQualityByUser(id) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const dailySleepQuality = userLog.map(entry => entry.sleepQuality);
    const totalSleepQuality = dailySleepQuality.reduce((sum, hrs) => {
      return sum + hrs;
    });
    const avgSleepQuality = totalSleepQuality / dailySleepQuality.length;
    
    return parseFloat(avgSleepQuality.toFixed(1));
  }

  calculateHrsSleptByDate(id, date) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const entry = userLog.find(entry => entry.date === date)
    return entry.hoursSlept;
  }

  calculateSleepQualityByDate(id, date) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const entry = userLog.find(entry => entry.date === date)
    return entry.sleepQuality;
  }
  
  retrieveWeekOfHoursSlept(id, startDate) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);
    const hoursSleptLog = weekLog.map(entry => entry.hoursSlept);

    console.log(avgSleepQuality);

    return hoursSleptLog;
  }
  
  retrieveWeekOfSleepQuality(id, startDate) {
    const userLog = this.sleepData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);
    const sleepQualityLog = weekLog.map(entry => entry.sleepQuality);

    return sleepQualityLog;
  }
  
// all users

  calculateAvgSleepQualityAllUsers() {
    const sleepQualityData = this.sleepData.map(entry => entry.sleepQuality);    
    const total = sleepQualityData.reduce((sum, sleepQuality) => {
      return sum + sleepQuality;
    });
    const avgSleepQuality = Math.round(total / sleepQualityData.length);

    return avgSleepQuality;
  }

  retrieveQualitySleepers(startDate) {
    /* map data, and count the number of users. 
    identify starting index by date match, then
    slice out entries starting with index and 
    spanning the index + the number of users * 7.
    use reduce() on new array to figure out average
    sleep quality for each user and store.
    for any users with avg  > 3,
    store name in new array and return */
    
    // const index = sleeperLog.findIndex(entry => entry.date === startDate);
  }

  identifyBestSleeper() {
    let sleeper = this.sleepData[0];
    this.sleepData.forEach(entry => {
      if (entry.hoursSlept > sleeper.hoursSlept) {
        sleeper = entry;
      }
    });
    const bestSleepers = this.sleepData.filter(entry =>
      entry.hoursSlept === sleeper.hoursSlept);
    
    bestSleepers.forEach(entry => {
      let id = entry.id;
      entry.name = this.userData[id-1].name;
    })

    return bestSleepers;
  }

  // activityData (REFACTOR/MOVE TO `UserRepository.js`)

  calculateDailyMilesWalked(date) {
    /* identify element in this.activityLog by date,
    multiply numSteps by strideLength for distance in feet,
    convert to miles + remainder feet, and return */
  }

  retrieveAvgWeeklyMinutesActive(startDate) {
    /* for each this.activityLog element between
    startDate and startDate + 7, accumulate minutesActive,
    divide by this.activityLog.length, and return */
  }

  evaluateStepGoalSuccess(date) {
    /* identify element in this.activityLog by date,
    evaluate whether numSteps is >= dailyStepGoal,
    return Boolean */
  }

  identifyDatesExceedingStepGoal() {
    /* filter() through activityLog array and evaluate/identify
    dates where numSteps > this.dailyStepGoal */
  }

  retrieveMostFlightsClimbed() {
    /* declare let maxFlights variable and assign value of
    this.activityLog[0].flightsOfStairs, iterate through array and if
    this.activityLog[i].flightsOfStairs > maxFlights,
    maxFlights = this.ActivityArray[i].flightsOfStairs,
    then return maxFlights */
  }

  // activityData methods

  retrieveMinutesActive(id, date) {
    /* retrieve minuteActive property by provided user ID and date */
  }

  calculateAvgStairsClimbedByDate(date) {
    /* filter through activity.js dataset to identify
    all elements with provided date, accumulate value of
    flightsOfStairs for each, divide by number of elements
    within that date, return value */
  }

  calculateAvgStepsByDate(date) {
    /* filter through the activity.js dataset to identify
    all elements with provided date, accumulate value of
    numSteps for each, divide by the number of elements
    within that date, return value */
  }

  calculateAvgMinutesActiveByDate(date) {
    /* iterate through the activity.js dataset,
    and add minutes active from all users on a specific day,
    and divide by the number of users */
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
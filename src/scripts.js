
//querySelectors
var mainPage = document.querySelector('#mainPage');
var headerBanner = document.querySelector('#headerBanner');
var headerMessage = document.querySelector('#headerMessage');

var homeGrid = document.querySelector('#homeGrid');
var userInfo = document.querySelector('#userInfo');
var userName = document.querySelector('#name');
var address = document.querySelector('#address');
var email = document.querySelector('#email');
var stride = document.querySelector('#stride');
var picture = document.querySelector('#picture');
var stepGoal = document.querySelector('#stepGoal');
var userStepGoal = document.querySelector('#userStepGoal');
var avgStepGoal = document.querySelector('#avgStepGoal');

var hydrationGrid = document.querySelector('#hydrationGrid');
var dailyWater = document.querySelector('#dailyWater');
var weeklyWater = document.querySelector('#weeklyWater');

var sleepGrid = document.querySelector('#sleepGrid');
var dailySleep = document.querySelector('#dailySleep');
var weeklySleep = document.querySelector('#weeklySleep');
var qualitySleep = document.querySelector('#qualitySleep');

var activityGrid  = document.querySelector('#activityGrid');
var dailySteps = document.querySelector('#dailySteps');
var dailyActivity = document.querySelector('#dailyActivity');
var weeklySteps = document.querySelector('#weeklySteps');
var compareUsers = document.querySelector('#compareUsers');

var navBar = document.querySelector('#navBar');
var homeButton = document.querySelector('#homeButton');
var hydrationButton = document.querySelector('#hydrationButton');
var sleepButton = document.querySelector('#sleepButton');
var activityButton = document.querySelector('#activityButton');


//variables
//const User = require('../src/User');
//const UserRepository = require('../src/UserRepository');
//const usersData = require('../data/users.js');
let userRepository;
let currentUser;




//Event Listeners
homeButton.addEventListener('click', viewHome);
hydrationButton.addEventListener('click', viewHydration);
sleepButton.addEventListener('click', viewSleep);
activityButton.addEventListener('click', viewActivity);
//window.addEventListener('DOMContentLoaded', loadPage);
window.addEventListener('load', loadPage);


//Functions
function loadPage() {
  userRepository = new UserRepository;
  userRepository.populateUserData(userData);
  userRepository.populateHydrationData(hydrationData);
  userRepository.populateSleepData(sleepData);
  userRepository.populateActivityData(activityData);
  currentUser = userRepository.userData[0];
  console.log(currentUser.name);
  userName.innerText = currentUser.name;
  address.innerText = currentUser.address;
  email.innerText = currentUser.email;
  stride.innerText = currentUser.stride;
  const firstName = currentUser.returnFirstName();
  headerMessage.innerText = ` Welcome ${firstName}`;
  userStepGoal.innerText = `Your goal is ${currentUser.dailyStepGoal} steps`;
  const allUserAvgStepGoal = userRepository.retrieveAvgStepGoal();
  avgStepGoal.innerText = `The average user's goal is ${allUserAvgStepGoal}`;

}


function viewHome() {
  homeGrid.classList.remove('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.add('hidden');
};

function viewHydration() {
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.remove('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.add('hidden');
};

function viewSleep() {
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.remove('hidden');
  activityGrid.classList.add('hidden');
};

function viewActivity() {
  homeGrid.classList.add('hidden');
  hydrationGrid.classList.add('hidden');
  sleepGrid.classList.add('hidden');
  activityGrid.classList.remove('hidden');
};

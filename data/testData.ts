import dotenv from 'dotenv';
dotenv.config();



const baseEmail = process.env.SIGNUP_EMAIL || 'default@gmail.com';
const randomEmail = baseEmail.replace('@gmail.com',`${Math.floor(Math.random() * 10000)}@gmail.com`);


export const signupData = {
  signupUsername: process.env.SIGNUP_USERNAME || 'testUser',
  signupEmail: randomEmail,
  signupPassword: process.env.SIGNUP_PASSWORD || 'testPassword',
  userBirthDay: process.env.USER_BIRTH_DAY || '1',
  userBirthMonth: process.env.USER_BIRTH_MONTH || '1',
  userBirthYear: process.env.USER_BIRTH_YEAR || '1998',
  firstName: process.env.FIRST_NAME || 'name',
  lastName: process.env.LAST_NAME || 'surname',
  company: process.env.COMPANY || 'company',
  address: process.env.ADDRESS || 'testing st 11-11',
  address2: process.env.ADDRESS2 || 'testing st 123',
  country: process.env.COUNTRY || 'United States',
  state: process.env.STATE || 'state',
  city: process.env.CITY || 'city',
  zipcode: process.env.ZIPCODE || '1111',
  mobileNumber: process.env.MOBILE_NUMBER ||'+3706000000000',
};

export const loginData = {
  loginUsername: process.env.LOGIN_USERNAME || 'TestingAccount',
  loginEmail: process.env.LOGIN_EMAIL || 'tesing111@gmail.com',
  validLoginPassword: process.env.VALID_LOGIN_PASSWORD || 'testing123',
  invalidLoginPassword: process.env.INVALID_LOGIN_PASSWORD || 'invalidPassword',
  invalidLoginEmail: process.env.INVALID_LOGIN_EMAIL || 'invaliduser876196233@gmail.com',
};

export const urlData = {
    signupPageURL: 'https://automationexercise.com/signup',
    loginPageURL: 'https://automationexercise.com/login',
    productsPageURL: 'https://automationexercise.com/products',
    homePageURL: 'https://automationexercise.com/', 
}

export const verificationMessages = {
    accountCreated: 'Account created',
    loggedInAs: `Logged in as ${loginData.loginUsername}`,
    productAddedToCart: 'Your product has been added to cart',
    cartIsEmpty: 'Cart is empty',
    orderConfirmation: 'Congratulations! Your order has been confirmed!',
}

export const errorMessages = {
    invalidLogin: 'Your email or password is incorrect',
    emailAlreadyExist: 'Email Address already exist'
}

export const pageTitle = {
  productsPageTitle: 'Automation Exercise - All Products',
  signupAndLoginPageTitle: 'Automation Exercise - Signup / Login',
  signupPageTitle: 'Automation Exercise - Signup',
  loginPageTitle: 'Automation Exercise',
  productDetailsPageTitle: 'Automation Exercise - Product Details',
  cartPageTitle: 'Automation Exercise - Checkout',
}

export const pageHeader = {
  loginFormHeader: 'Login to your account',
  signupFormHeader: 'New User Signup',
  accountInformationHeader: 'ENTER ACCOUNT INFORMATION',
  productsPageHeader: 'All Products',
  homePageHeader: 'Features Items',
}

export const productData = {
  blueTop: { name: 'Blue Top', price: '500' },
  menTshirt: { name: 'Men Tshirt', price: '400' },
  sleevelessDress: { name: 'Sleeveless Dress', price: '1000' },
  stylishDress: { name: 'Stylish Dress', price: '1500' },
  winterTop: { name: 'Winter Top', price: '600' },
  summerWhiteTop: { name: 'Summer White Top', price: '400' },
  madameTop: { name: 'Madame Top For Women', price: '1000' },
  fancyGreenTop: { name: 'Fancy Green Top', price: '700' },
  sleevesPrintedTop: { name: 'Sleeves Printed Top - White', price: '499' },
  halfSleevesTop: { name: 'Half Sleeves Top Schiffli Detailing - Pink', price: '359' },
  frozenTopKids: { name: 'Frozen Tops For Kids', price: '278' },
};

export const paymentData = {
  cardName: process.env.CARD_NAME || 'Test user',
  cardNumber: process.env.CARD_NUMBER || '1111111111111111',
  cardCVC: process.env.CARD_CVC || '111',
  cardExpMonth: process.env.CARD_EXP_MONTH || '11',
  cardExpYear: process.env.CARD_EXP_YEAR || '2111',
};

import Axios from "axios";

//const BASE_URL = "http://35.188.220.243:1337/";
const BASE_URL = "http://139.59.26.142:1337/";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJjcmVhdGVkQXQiOiIyMDIwLTEwLTE3VDA0OjQzOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTEwLTE4VDA3OjAxOjQ1LjAwMFoiLCJpZCI6MTU1LCJkZXZpY2VOYW1lIjoiT25lUGx1cyAzVCIsImRldmljZUlkIjoiMmRiN2FkODAiLCJicmFuZE5hbWUiOiJPbmVQbHVzIiwibW9kZWxOYW1lIjoiT05FUExVUyBBMzAwMyIsIm90cCI6NjYwMSwib3RwQ3JlYXRlZEF0IjoiMjAyMC0xMC0xOFQwNzowMTo0NC4wMDBaIiwiYXV0aEV4cGlyZUF0IjoiMjAyMC0xMC0xN1QwNjoyMjoxMS4wMDBaIiwib3RwRXhwaXJlQXQiOiIyMDIwLTEwLTE4VDA3OjExOjQ0LjAwMFoiLCJkZWxldGVkQXQiOm51bGwsInNob3BJZCI6MTE1fV0sImlhdCI6MTYwMzAwNDUyNSwiZXhwIjoxNjAzNjU5NzI1fQ.MsoOyVLSlEtjzGIWIeHw0b--D9mS_0UUk38voUxGRxk";

const SHOP_LOGIN = "shoplogin";
const GENERATE_OTP = "generateotp";
const SHOP = "shop";

const FETCH_PRODUCTS = "products/115";
const GET_CUSTOMERS = "customers";
const POST_CUSTOMERS = "customer";

const POST_QUOTATION = "quotation";
const POST_QUOTATION_DATA = `${POST_QUOTATION}/products`;

const LOG_OUT = "logoutShop";

let service = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

async function setAuthTokenToService(token) {
  service.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

function generateLoginOTP(login) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(GENERATE_OTP, login, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      if (response.data.status) {
        resolve(); //TODO resolve either the data or message for otp api
      } else {
        reject(response.data.message);
      }
    });
  } catch (error) {
    console.log("request error", error.message);
  }
}

function loginToShop(login) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(SHOP_LOGIN, login, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      if (response.data.status) {
        resolve(); //TODO resolve either the data or message for login api
      } else {
        reject(response.data.message);
      }
    });
  } catch (error) {
    console.log("request error", error.message);
  }
}

function getProductsFromShop() {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.get(FETCH_PRODUCTS, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      if (response.data.status) {
        resolve(response.data.data);
      } else {
        reject(response.data.message);
      }
    });
  } catch (error) {
    console.log("request error", error.message);
  }
}

function logoutFromShop(shopId, deviceId) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(`${LOG_OUT / shopId / deviceId}`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      if (response.data.status) {
        resolve(); //TODO resolve either the data or message for logout
      } else {
        reject(response.data.message);
      }
    });
    console.log(response.data);
  } catch (error) {
    console.log("request error", error.message);
  }
}

export { generateLoginOTP, getProductsFromShop, loginToShop, logoutFromShop };

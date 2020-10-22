import Axios from "axios";

//const BASE_URL = "http://35.188.220.243:1337/";
const BASE_URL = "http://139.59.26.142:1337/";

const AUTH_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJjcmVhdGVkQXQiOiIyMDIwLTEwLTIyVDA0OjU0OjQ2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTEwLTIyVDA0OjU0OjQ2LjAwMFoiLCJpZCI6MTU2LCJkZXZpY2VOYW1lIjoiT25lUGx1cyAzVCIsImRldmljZUlkIjoiMmRiN2FkODAiLCJicmFuZE5hbWUiOiJPbmVQbHVzIiwibW9kZWxOYW1lIjoiT05FUExVUyBBMzAwMyIsIm90cCI6NDA5MCwib3RwQ3JlYXRlZEF0IjoiMjAyMC0xMC0yMlQwNDo1NDo0Ni4wMDBaIiwiYXV0aEV4cGlyZUF0IjpudWxsLCJvdHBFeHBpcmVBdCI6IjIwMjAtMTAtMjJUMDU6MDQ6NDYuMDAwWiIsImRlbGV0ZWRBdCI6bnVsbCwic2hvcElkIjoxMTV9XSwiaWF0IjoxNjAzMzQyNTA4LCJleHAiOjE2MDM5OTc3MDh9.7ljPAC2uP_T1H0figR_Kj_sSoKPMg-tjeVuS4ALCp5g";

const SHOP_LOGIN = "shoplogin";
const GENERATE_OTP = "generateotp";
const SHOP = "shop";

const FETCH_PRODUCTS = "products/115";
const GET_CUSTOMERS = "customers";
const POST_CUSTOMERS = "customer";

const POST_ORDER = "order";
const POST_ORDER_DATA = "orderproducts";

const GENERATE_LINK = "catalogue/generate";
const GET_CATALOGUE_LINKS = "catalogue";
const REGENERATE_OTP = "catalogue/regenerateOtp";
const DELETE_LINK = "catalogue";

const SHORT_LINK = "shorturl";

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

function generateOrder(order) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(POST_ORDER, order, {
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

function uploadProductsToOrder(orderId, products) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(`${POST_ORDER_DATA}/${orderId}`, products, {
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

function getCatalogueLinks(shopId) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.get(`${GET_CATALOGUE_LINKS}/${shopId}`, {
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

function generateCatalogueLink(link) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(GENERATE_LINK, link, {
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

function regenerateLinkOtp(link) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(REGENERATE_OTP, link, {
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

function expireCatalogueLink(linkId) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.delete(`${DELETE_LINK}/${linkId}`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      if (response.data.status) {
        resolve(response.data.status);
      } else {
        reject(response.data.message);
      }
    });
  } catch (error) {
    console.log("request error", error.message);
  }
}

function shortShareableLink(link) {
  try {
    return new Promise(async function (resolve, reject) {
      const response = await service.post(
        SHORT_LINK,
        { Url: link },
        {
          header: {
            Authorization: AUTH_TOKEN,
          },
        }
      );
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
  } catch (error) {
    console.log("request error", error.message);
  }
}

export {
  generateLoginOTP,
  loginToShop,
  getProductsFromShop,
  generateOrder,
  uploadProductsToOrder,
  getCatalogueLinks,
  generateCatalogueLink,
  regenerateLinkOtp,
  expireCatalogueLink,
  shortShareableLink,
  logoutFromShop,
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
let tokenCache = null;
const fetchAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (tokenCache && Date.now() < tokenCache.expiry) {
        return tokenCache.token;
    }
    try {
        const response = yield axios_1.default.post("https://api.petfinder.com/v2/oauth2/token", {
            grant_type: "client_credentials",
            client_id: process.env.PET_FINDER_CLIENT_ID,
            client_secret: process.env.PET_FINDER_CLIENT_SECRET,
        });
        const { access_token, expires_in } = response.data;
        tokenCache = {
            token: access_token,
            expiry: Date.now() + expires_in * 1000 - 60000,
        };
        return access_token;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error fetching access token:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
        else {
            console.error("Error fetching access token:", error);
        }
        throw new Error("Failed to fetch access token. Please try again later.");
    }
});
exports.fetchAccessToken = fetchAccessToken;

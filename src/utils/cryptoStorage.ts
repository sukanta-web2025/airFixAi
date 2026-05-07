// import CryptoJS from "crypto-js";
// Fallback to base64 encoding since crypto-js is missing
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "fallback_secret";

export const encryptData = (data: unknown): string => {
  const text = JSON.stringify(data);
  // return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return btoa(unescape(encodeURIComponent(text + ":" + SECRET_KEY)));
};

export const decryptData = <T = unknown>(cipherText: string | null): T | null => {
  if (!cipherText) return null;

  try {
    // const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const decoded = decodeURIComponent(escape(atob(cipherText)));
    const [text, key] = decoded.split(":");
    
    if (key !== SECRET_KEY) return null;
    if (!text) return null;

    return JSON.parse(text) as T;
  } catch (e) {
    console.warn("Decrypt failed:", e);
    return null;
  }
};


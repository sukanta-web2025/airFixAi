import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "fallback_secret";

export const encryptData = (data: unknown): string => {
  const text = JSON.stringify(data);
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptData = <T = unknown>(cipherText: string | null): T | null => {
  if (!cipherText) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) return null;

    return JSON.parse(decrypted) as T;
  } catch (e) {
    console.warn("Decrypt failed:", e);
    return null;
  }
};

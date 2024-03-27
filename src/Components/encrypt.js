import React from "react";
import { sha256 } from 'react-native-sha256';
import CryptoJS from 'react-native-crypto-js'

export const encryptdecrypt = async (data, isEncrypt) => {
  try {
    const generateSHA256 = async (data, length) => {
      if (length % 8 !== 0) {
        throw new Error("Invalid output length. Must be a multiple of 8 bits.");
      }
      const bytesNeeded = length / 2;
      try {
        const hash = await sha256(data);
        const hashHex = hash.toLowerCase();
        const truncatedHashHex = hashHex.slice(0, bytesNeeded * 2);
        return truncatedHashHex
      } catch (error) {
        throw new Error("SHA-256 hash generation failed.");
      }
    };
    const truncatedHashHex = await generateSHA256(secretKey, 32);
    if (isEncrypt) {
      let cipher = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(truncatedHashHex), {
        iv: CryptoJS.enc.Utf8.parse(iv),
      });
      return cipher.toString();
    } else {
      try {
        let cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(truncatedHashHex), {
          iv: CryptoJS.enc.Utf8.parse(iv),
        });
        const decryptedString = CryptoJS.enc.Utf8.stringify(cipher);
        return decryptedString
      } catch (error) {
        console.error("Error:", error);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

"use server";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxtCCWo3UGXR9N1WSAqoUUJIrqCLaaozsiK8Rnngjo3nCRPN9crMx6mIKfukBIBEii-Mg/exec";

let cache: any = null;
let lastFetch = 0;

export async function getMeniuData() {
  const now = Date.now();

  if (!cache || now - lastFetch > 1000 * 60) {
    const response = await fetch(API_URL, { cache: "no-store" });
    cache = await response.json();
    lastFetch = now;
  }

  return cache;
}

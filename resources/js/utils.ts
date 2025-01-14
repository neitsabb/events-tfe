import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AddressComponents } from './Components/Admin/Configure/Steps/LocationStep';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const capitalize = (s: string) => {
    return s
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
};

export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const compactAddress = (address: AddressComponents) => {
    let compactAddress = '';
    if (address.street) {
        compactAddress += `${address.street}, `;
    }

    if (address.zip_code) {
        compactAddress += `${address.zip_code} `;
    }
    if (address.city) {
        compactAddress += `${address.city}, `;
    }

    if (address.country) {
        compactAddress += `${address.country}`;
    }

    return capitalize(compactAddress);
};

export const isMobileDevice = () => {
    return window.innerWidth <= 468;
};

export const setCookie = (name: string, value: string, days: number) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const getCookie = (name: string) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};

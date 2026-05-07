export const PersistenceStorageKey = {
    TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user',
    LANGUAGE: 'language',
    THEME: 'theme',
    ACCENT_COLOR: 'accent_color',
    REMEMBER_ME: "remember_me",
} as const;

export type PersistenceStorageKey =
    typeof PersistenceStorageKey[keyof typeof PersistenceStorageKey];

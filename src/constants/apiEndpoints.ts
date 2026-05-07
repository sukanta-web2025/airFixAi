export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "admin/auth/login",
    LOGOUT: "admin/auth/logout",
    REFRESH_TOKEN: "admin/auth/refresh-token",
    PROFILE: "/auth/profile",
  },
  CONTENT_PAGES: {
    LIST: "admin/content-pages",
    CREATE: "admin/content-pages",
    UPDATE: (id: string) => `admin/content-pages/${id}`,
    DETAILS: (id: string) => `admin/content-pages/${id}`,
    DELETE: (id: string) => `admin/content-pages/${id}`,
  },
} as const;

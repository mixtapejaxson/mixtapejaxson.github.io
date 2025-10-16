// Simple cookie helper for browser usage
// Simple cookie helper for browser usage

/**
 * Sets a cookie with the given name, value, and optional options.
 * @param name Cookie name
 * @param value Cookie value
 * @param options Optional cookie attributes (expires, path, domain, secure, sameSite)
 */
export function setCookie(
  name: string,
  value: string,
  options?: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  },
) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options?.days) {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    cookieStr += `; expires=${date.toUTCString()}`;
  }
  if (options?.path) {
    cookieStr += `; path=${options.path}`;
  } else {
    cookieStr += `; path=/`;
  }
  if (options?.domain) {
    cookieStr += `; domain=${options.domain}`;
  }
  if (options?.secure) {
    cookieStr += `; secure`;
  }
  if (options?.sameSite) {
    cookieStr += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieStr;
}

/**
 * Gets the value of a cookie by name.
 * @param name Cookie name
 * @returns The cookie value, or null if not found
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(";");

  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

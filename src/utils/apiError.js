export function apiErrorMessage(error, fallback) {
  const payload = error?.response?.data;
  const message = payload?.message ?? (typeof payload === 'string' ? payload : error?.message);

  if (Array.isArray(message)) {
    const text = message.filter((item) => typeof item === 'string' && item.trim()).join(' ');
    return text || fallback;
  }

  if (typeof message === 'string' && message.trim()) {
    return message;
  }

  return fallback;
}

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';

export const showLogger = isDev ? true : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true';

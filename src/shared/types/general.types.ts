import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type TEmailRequest = { email: string };
export type TIdRequest = { id: number };

export type TDiv = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type TFavIcon = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

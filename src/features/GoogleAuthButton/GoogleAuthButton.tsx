import Image from 'next/image';

import styles from './styles.module.scss';
import GoogleIcon from '@/shared/asset/google-icon.svg';

export const GoogleAuthButton = () => (
  <div>
    <a className={styles.googleButton} href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}>
      <Image src={GoogleIcon} alt='google' width='25px' height='25px' />
      Login with Google
    </a>
  </div>
);

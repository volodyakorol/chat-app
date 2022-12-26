import styles from './styles.module.scss';
import GoogleIcon from '@/shared/asset/google-icon.svg';

export const GoogleAuthButton = () => {
  return (
    <a className={styles.googleButton} href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}>
      <GoogleIcon />
      Login with Google
    </a>
  );
};

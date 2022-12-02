import s from './styles.module.scss';
import GoogleIcon from '@/shared/asset/google-icon.svg';

export const GoogleAuthButton = () => {
  return (
    <div>
      <a className={s.googleButton} href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}>
        <GoogleIcon /> Login
      </a>
    </div>
  );
};

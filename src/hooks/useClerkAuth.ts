import { useAuth, useOAuth, useSignIn } from '@clerk/clerk-expo';
import { makeRedirectUri } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSnackBar } from '@/src/components/ui/snackbar';

type Mode = 'email' | 'phone';

type VerificationState = {
  step: 'identifier' | 'verify';
  strategy: 'email_code' | 'phone_code';
};

export function useClerkAuth() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });
  const facebookOAuth = useOAuth({ strategy: 'oauth_facebook' });
  const { showSnack } = useSnackBar();

  const [mode, setMode] = useState<Mode>('email');
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [verification, setVerification] = useState<VerificationState>({ step: 'identifier', strategy: 'email_code' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectUrl = useMemo(
    () =>
      makeRedirectUri({
        scheme: 'one-for-one-learning',
      }),
    [],
  );

  const showVerify = verification.step === 'verify';

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/loading');
    }
  }, [isSignedIn, router]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const selectMode = useCallback((nextMode: Mode) => {
    setMode(nextMode);
    setVerification({ step: 'identifier', strategy: nextMode === 'email' ? 'email_code' : 'phone_code' });
    setIdentifier('');
    setCode('');
    setError('');
  }, []);

  const onIdentifierChange = useCallback((value: string) => {
    setIdentifier(value);
    setError('');
  }, []);

  const onCodeChange = useCallback((value: string) => {
    setCode(value);
    setError('');
  }, []);

  const handleRequestCode = useCallback(async () => {
    if (!isLoaded) return;
    if (!identifier.trim()) {
      const message = mode === 'email' ? 'Enter your email address' : 'Enter your phone number';
      setError(message);
      showSnack({ message, variant: 'error' });
      return;
    }

    setLoading(true);
    setError('');
    try {
      const strategy = mode === 'email' ? 'email_code' : 'phone_code';
      await signIn?.create({ identifier: identifier.trim() });
      await signIn?.prepareFirstFactor({ strategy });
      setVerification({ step: 'verify', strategy });
    } catch (err: any) {
      const message = err?.errors?.[0]?.message ?? 'Unable to start sign-in. Please try again.';
      setError(message);
      showSnack({ message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [identifier, isLoaded, mode, showSnack, signIn]);

  const handleVerifyCode = useCallback(async () => {
    if (!isLoaded) return;
    if (!code.trim()) {
      const message = 'Enter the verification code';
      setError(message);
      showSnack({ message, variant: 'error' });
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await signIn?.attemptFirstFactor({ strategy: verification.strategy, code: code.trim() });
      if (result?.status === 'complete') {
        await setActive?.({ session: result.createdSessionId });
        router.replace('/loading');
      } else {
        const message = 'Check the code and try again.';
        setError(message);
        showSnack({ message, variant: 'error' });
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message ?? 'Invalid or expired code. Request a new one.';
      setError(message);
      showSnack({ message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [code, isLoaded, router, setActive, showSnack, signIn, verification.strategy]);

  const handleOAuth = useCallback(
    async (provider: 'google' | 'facebook') => {
      try {
        const flow = provider === 'google' ? googleOAuth : facebookOAuth;
        const { createdSessionId, setActive: setActiveOAuth } = await flow.startOAuthFlow({ redirectUrl });
        if (createdSessionId) {
          await setActiveOAuth?.({ session: createdSessionId });
          router.replace('/loading');
        }
      } catch (err) {
        const message = 'Social login failed. Please try again.';
        setError(message);
        showSnack({ message, variant: 'error' });
      }
    },
    [facebookOAuth, googleOAuth, redirectUrl, router, showSnack],
  );

  return {
    mode,
    identifier,
    code,
    verification,
    loading,
    error,
    showVerify,
    selectMode,
    onIdentifierChange,
    onCodeChange,
    handleRequestCode,
    handleVerifyCode,
    handleOAuth,
    clearError,
  };
}

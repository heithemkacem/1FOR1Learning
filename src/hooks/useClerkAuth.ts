import { useAuth, useOAuth, useSignIn } from '@clerk/clerk-expo';
import { makeRedirectUri } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSnackBar } from '@/src/components/ui/snackbar';
import i18n from '@/src/i18n';

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
        path: 'oauth-native-callback',
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
      const message = mode === 'email' ? i18n.t('errors.enterEmail') : i18n.t('errors.enterPhone');
      setError(message);
      showSnack({ message, variant: 'error' });
      return;
    }

    setLoading(true);
    setError('');
    try {
      const strategy = mode === 'email' ? 'email_code' : 'phone_code';
      const signInAttempt = await signIn?.create({ identifier: identifier.trim() });

      // Find the matching factor from supportedFirstFactors
      const factor = signInAttempt?.supportedFirstFactors?.find((f) => f.strategy === strategy);

      if (!factor) {
        throw new Error(i18n.t('errors.noVerificationMethod', { mode }));
      }

      if (strategy === 'email_code' && 'emailAddressId' in factor) {
        await signIn?.prepareFirstFactor({ strategy, emailAddressId: factor.emailAddressId });
      } else if (strategy === 'phone_code' && 'phoneNumberId' in factor) {
        await signIn?.prepareFirstFactor({ strategy, phoneNumberId: factor.phoneNumberId });
      }

      setVerification({ step: 'verify', strategy });
    } catch (err: any) {
      const message = err?.errors?.[0]?.message ?? i18n.t('errors.unableToSignIn');
      setError(message);
      showSnack({ message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [identifier, isLoaded, mode, showSnack, signIn]);

  const handleVerifyCode = useCallback(async () => {
    if (!isLoaded) return;
    if (!code.trim()) {
      const message = i18n.t('errors.enterCode');
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
        const message = i18n.t('errors.checkCode');
        setError(message);
        showSnack({ message, variant: 'error' });
      }
    } catch (err: any) {
      const message = err?.errors?.[0]?.message ?? i18n.t('errors.invalidCode');
      setError(message);
      showSnack({ message, variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [code, isLoaded, router, setActive, showSnack, signIn, verification.strategy]);

  const handleOAuth = useCallback(
    async (provider: 'google' | 'facebook') => {
      setLoading(true);
      setError('');
      try {
        const flow = provider === 'google' ? googleOAuth : facebookOAuth;
        const {
          createdSessionId,
          signIn: oAuthSignIn,
          signUp: oAuthSignUp,
          setActive: setActiveOAuth,
        } = await flow.startOAuthFlow({ redirectUrl });

        // Clerk may return the session on any of the payloads depending on provider/state
        const sessionId =
          createdSessionId ??
          oAuthSignIn?.createdSessionId ??
          oAuthSignUp?.createdSessionId;

        if (sessionId) {
          await setActiveOAuth?.({ session: sessionId });
          router.replace('/loading');
          return;
        }

        // If Clerk needs additional steps, surface a clearer message
        if (oAuthSignIn?.status === 'needs_first_factor' || oAuthSignUp?.status === 'missing_requirements') {
          const message = i18n.t('errors.additionalVerification');
          setError(message);
          showSnack({ message, variant: 'error' });
          return;
        }

        const message = i18n.t('errors.socialLoginNoSession');
        setError(message);
        showSnack({ message, variant: 'error' });
      } catch (err) {
        const message = (err as any)?.errors?.[0]?.message ?? i18n.t('errors.socialLoginFailed');
        setError(message);
        showSnack({ message, variant: 'error' });
      } finally {
        setLoading(false);
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

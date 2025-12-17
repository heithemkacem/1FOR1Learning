import { ThemedScreen } from '@/src/components/themed-screen';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/splash');
  }, [router]);

  return <ThemedScreen />;
}

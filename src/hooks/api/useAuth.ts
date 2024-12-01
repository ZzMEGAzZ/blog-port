import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useAuth = () => {
    const router = useRouter();
    const { toast } = useToast();

    const signIn = async ({ email, password }: { email: string; password: string }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Successfully signed in!',
            });

            router.push('/dashboard');
            return data;
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
        }
    };

    const signUp = async ({ email, password }: { email: string; password: string }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Check your email to confirm your account!',
            });

            return data;
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Successfully signed out!',
            });

            router.push('/');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
        }
    };

    const resetPassword = async (email: string) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) throw error;

            toast({
                title: 'Success',
                description: 'Password reset instructions sent to your email!',
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message,
            });
        }
    };

    return {
        signIn,
        signUp,
        signOut,
        resetPassword,
    };
};

import RegisterForm from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Sign up to your account</CardTitle>
          <CardAction>
            <Button asChild variant='link'>
              <Link href='/login'>Sign in</Link>
            </Button>
          </CardAction>
          <CardDescription>
            Enter your email and password below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}

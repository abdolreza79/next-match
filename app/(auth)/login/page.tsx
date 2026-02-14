import LoginForm from '@/components/auth/login-form';
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

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center h-full'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button asChild variant='link'>
              <Link href='/register'>Sign up</Link>
            </Button>
          </CardAction>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

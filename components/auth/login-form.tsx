'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Button } from '../ui/button';
import { LoginSchema, loginSchema } from '@/lib/schemas/login-schema';
import { Loader } from 'lucide-react';
import { signInUser } from '@/actions/auth-actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginSchema) {
    const result = await signInUser(data);
    if (result.status === 'success') {
      toast.success('Logged in successfully!');
      // reset();
      router.push('/members');
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form id='form-rhf-demo' onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                {...field}
                id='email'
                type='email'
                aria-invalid={fieldState.invalid}
                placeholder='Please enter your email address.'
                // autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <InputGroup>
                <Input
                  {...field}
                  id='password'
                  type='password'
                  placeholder='Please enter your password.'
                  aria-invalid={fieldState.invalid}
                  autoComplete='off'
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type='submit'
        className='w-full mt-8 mb-3 disabled:bg-gray-400'
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <div className='flex items-center justify-center gap-1'>
            <Loader className='size-4 animate-spin' />
            <span>Logging in...</span>
          </div>
        ) : (
          'Login'
        )}
      </Button>
      <Button variant='outline' className='w-full'>
        Login with Google
      </Button>
    </form>
  );
}

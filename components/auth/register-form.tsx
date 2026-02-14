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
import { RegisterSchema, registerSchema } from '@/lib/schemas/register-schema';
import { registerUser } from '@/actions/auth-actions';
import { Loader } from 'lucide-react';

export default function RegisterForm() {
  const {
    register,
    reset,
    setError,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterSchema) {
    const result = await registerUser(data);
    if (result.status === 'success') {
      toast.success('User registered successfully!');
      toast('Register User successfully!', {
        description: (
          <pre className='bg-green-500 text-white mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2',
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)',
        } as React.CSSProperties,
      });
      reset();
    } else if (result.status === 'error') {
      if (Array.isArray(result.error)) {
        result.error.forEach((err) => {
          const fieldName = err.path[0] as 'name' | 'email' | 'password';
          setError(fieldName, { message: err.message });
        });
      } else {
        setError('root.ServerError', { message: result.error });
      }
    }
  }
  return (
    <form id='form-rhf-demo' onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input
                {...field}
                id='name'
                aria-invalid={fieldState.invalid}
                placeholder='Please enter your name.'
                // autoComplete='off'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='confirmPassword'>
                Password Confirmation
              </FieldLabel>
              <InputGroup>
                <Input
                  {...field}
                  id='confirmPassword'
                  type='password'
                  placeholder='Please enter your password confirmation.'
                  aria-invalid={fieldState.invalid}
                  autoComplete='off'
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {errors.root?.ServerError && (
        <FieldError
          errors={[errors.root.ServerError]}
          className='mt-4 text-center bg-red-200 text-red-500 rounded-md p-2 text-sm'
        />
      )}
      <Button
        type='submit'
        className='w-full mt-8 mb-3 disabled:bg-gray-400'
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <div className='flex items-center justify-center'>
            <Loader className='size-4 animate-spin' />
            <span className='ml-2'>Registering...</span>
          </div>
        ) : (
          'Register'
        )}
      </Button>
      {/* <Button variant='outline' className='w-full'>
        Login with Google
      </Button> */}
    </form>
  );
}

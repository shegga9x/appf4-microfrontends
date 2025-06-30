'use client';
import { Formik, useField, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';
import { Button } from '@repo/ui';
import { TextInput } from '@repo/ui';
import { useAuthStore } from '@repo/zustand';

const fieldValidationSchema = yup.object({
  emailOrPhone: yup.string().required('Email or phone required'),
  password: yup.string().required('Password required'),
});

// Adapter for Formik + custom TextInput component
const FormikTextInput = ({ ...props }) => {
  const [field, meta] = useField(props.name);
  return (
    <div className="mb-4">
      <TextInput {...props} {...field} />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const profile = useAuthStore((state) => state.profile);
  const initialized = useAuthStore((state) => state.initialized);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [registrationMessage, setRegistrationMessage] = useState('');

  useEffect(() => {
    // Check for registration success message
    const message = searchParams?.get('message');
    if (message) {
      setRegistrationMessage(message);
    }

    if (initialized) {
      setIsChecking(false);
      if (profile) {
        console.log('User already logged in, redirecting to home');
        router.push('/');
      }
    }
  }, [initialized, profile, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(username, password);

    // Only redirect if login was successful (no error and profile is set)
    if (!error && useAuthStore.getState().profile) {
      router.push('/');
    }
  };

  // Show loading state while checking authentication
  if (isChecking || !initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="flex w-full max-w-4xl items-center justify-center gap-8">
        {/* Left: Brand/Info */}
        <div className="hidden w-1/2 flex-col justify-center md:flex">
          <h1 className="text-6xl font-extrabold text-blue-600 mb-4 font-sans">
            facebook
          </h1>
          <p className="text-2xl text-gray-100 font-normal">
            Facebook helps you connect and share
            <br />
            with the people in your life.
          </p>
        </div>
        {/* Right: Login Card */}
        <div className="w-full max-w-sm rounded-xl bg-neutral-800 p-8 shadow-2xl">
          <Formik
            initialValues={{ emailOrPhone: '', password: '' }}
            validationSchema={fieldValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await login(values.emailOrPhone, values.password);
              setSubmitting(false);
            }}
          >
            <Form>
              <FormikTextInput
                name="emailOrPhone"
                inputSize="large"
                type="text"
                placeholder="Email address or phone number"
                className="bg-neutral-900 text-gray-100 border-neutral-700 placeholder:text-gray-400"
              />
              <FormikTextInput
                name="password"
                inputSize="large"
                type="password"
                placeholder="Password"
                className="bg-neutral-900 text-gray-100 border-neutral-700 placeholder:text-gray-400"
              />
              {error && (
                <div className="mb-2 text-center text-red-500 text-sm">{error}</div>
              )}
              <Button
                type="submit"
                size="large"
                block
                fontSize="text-xl"
                fontWeight="font-bold"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                isLoading={loading}
                disabled={loading}
              >
                Log in
              </Button>
              <div className="text-center my-3">
                <a
                  href="#"
                  className="text-blue-400 text-sm hover:underline"
                >
                  Forgotten password?
                </a>
              </div>
              <div className="border-b border-neutral-700 my-4"></div>
              <Button
                type="button"
                size="large"
                block
                fontSize="text-md"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                <Link href="/register">Create new account</Link>
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className="fixed bottom-8 w-full text-center">
        <span className="text-gray-300 text-sm">
          <span className="font-semibold">Create a Page</span> for a celebrity,
          brand or business.
        </span>
      </div>
    </div>
  );
}

const LoginPage: React.FC = () => {
  return <LoginContent />;
};

export default LoginPage;

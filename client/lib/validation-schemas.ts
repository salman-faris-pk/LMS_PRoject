import { email, minLength, object, string, pipe, trim, maxLength } from 'valibot';

export const signInSchema = object({
  email: pipe(
    string('Email is required'),
    trim(),
    email('Please enter a valid email address')
  ),
  password: pipe(
    string('Password is required'),
    minLength(6, 'Password must be at least 6 characters'),
    maxLength(12, 'Password maximum 12 characters allowed'),
  ),
});

export interface SignInState {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
  };
  fieldValues?: {
    email: string;
    password: string;
  };
}

export const signUpSchema = object({
  name: pipe(
    string('name is required'),
    maxLength(15, 'username maximum 15 characters allowed'),
    minLength(5, 'username must be at least 5 characters')
  ),
  email: pipe(
    string('Email is required'),
    trim(),
    email('Please enter a valid email address')
  ),
  password: pipe(
    string('Password is required'),
    minLength(6, 'Password must be at least 6 characters'),
    maxLength(12, 'Password maximum 12 characters allowed'),
  ),
});

export interface SignUpState {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
    name?:string[];
  };
  fieldValues?: {
    email: string;
    password: string;
    name: string;
  };
}
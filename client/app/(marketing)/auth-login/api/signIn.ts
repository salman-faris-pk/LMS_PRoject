import { safeParse, flatten } from 'valibot';
import { signInSchema, SignInState } from '@/lib/validation-schemas';

export async function signIn(prevState: SignInState,formData: FormData): Promise<SignInState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const result = safeParse(signInSchema, rawData);

  if (!result.success) {
    const errors = flatten(result.issues);
    return {
      message: 'Please fix the validation errors',
      errors: {
        email: errors.nested?.email,
        password: errors.nested?.password,
      },
      fieldValues: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.output),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.message || 'SignIn failed',
        errors: errorData.errors || {},
        fieldValues: rawData,
      };
    }

    const data = await response.json();
    
    return {
      message: data.message,
      errors: {},
      fieldValues: { email: '', password: '' },
    };
  } catch (error) {
    return {
      message: 'Network error. Please try again.',
      errors: {},
      fieldValues: rawData,
    };
  }
}

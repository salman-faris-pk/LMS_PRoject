import { safeParse, flatten } from 'valibot';
import { signUpSchema, SignUpState } from '@/lib/validation-schemas';


export async function signUp(prevState: SignUpState,formData: FormData): Promise<SignUpState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
  };

  const result = safeParse(signUpSchema, rawData);

  if (!result.success) {
    const errors = flatten(result.issues);
    return {
      message: 'Please fix the validation errors',
      errors: {
        email: errors.nested?.email,
        password: errors.nested?.password,
        name: errors.nested?.name,
      },
      fieldValues: rawData,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.output),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("errorData",errorData);
      
      return {
        message: errorData.message || 'SignUp failed',
        errors: errorData.errors || {},
        fieldValues: rawData,
      };
    }

    const data = await response.json();
    console.log("successData",data);
    
    return {
      message: data.message,
      errors: {},
      fieldValues: { email: '', password: '',name:'' },
    };
  } catch (error) {
    return {
      message: 'Network error. Please try again.',
      errors: {},
      fieldValues: rawData,
    };
  }
}

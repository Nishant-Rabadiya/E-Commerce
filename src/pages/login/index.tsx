import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import FormFields from '../../components/form/FormFields';
import { LoginFormInputs, RegistrationFormInputs } from '../../@core/interfaces/Interface';
import { getRegistrationData } from '../../api/api';
import { useProduct } from '../../components/CommonFunction';
import { loginSchema } from '../../components/form/formSchema';

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const currentUser: RegistrationFormInputs | undefined = getUserData?.find((user: RegistrationFormInputs) => user?.email === data?.email && user?.password === data?.password);
    if (!(currentUser)) {
      toast.error(`Email or password dosn't match!`);
    } else {
      localStorage.setItem('loginData', JSON.stringify({ email: data?.email }));
      toast.success('Login successfully !');
      navigate(`/`);
    }
  };

  return (
    <div className='form-container p-3'>
      <div className='form-section border border-1 rounded p-4 bg-white'>
        <h1 className='text-center font-monospace'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFields title='Email:' data={{ ...register('email') }} placeholder='Enter your Last email!' error={errors?.email?.message} />

          <FormFields title='Password:' data={{ ...register('password') }} placeholder='Enter your password!' error={errors?.password?.message} />

          <div className='text-center mb-2'>
            <button type='submit' className='bg-primary text-white border border-0 rounded p-2 w-75'>
              Login
            </button>
            <p className='m-0 py-3'>No Account? <span className='login-registration-button text-primary' onClick={() => navigate('/registration')}>Register</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;



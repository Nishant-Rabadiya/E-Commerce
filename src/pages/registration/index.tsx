import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormFields from '../../components/form/FormFields';
import { useProduct, useProductMutation } from '../../components/CommonFunction';
import { RegistrationFormInputs } from '../../@core/interfaces/Interface';
import { getRegistrationData, sendRegistrationData } from '../../api/api';
import { registrationSchema } from '../../components/form/formSchema';

const Registration = () => {
  const navigate: NavigateFunction = useNavigate();
  const getUserData = useProduct('registration', getRegistrationData) as RegistrationFormInputs[];
  const mutation = useProductMutation('registration', sendRegistrationData);

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: any) => {
    if (getUserData?.find((email: RegistrationFormInputs) => email?.email === data?.email)) {
      toast?.error('Email must be unique!');
      return;
    } else {
      mutation?.mutate(data);
      toast?.success('Registration successfully!');
      navigate('/login');
    }
  };

  return (
    <div className='form-container p-3'>
      <div className='form-section border border-1 rounded p-4 bg-white'>
        <h1 className='text-center font-monospace'>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFields title='Last name:' data={{ ...register('lastName') }} placeholder='Enter your Last name!' error={errors?.lastName?.message} />

          <FormFields title='First name:' data={{ ...register('firstName') }} placeholder='Enter your First name!' error={errors?.firstName?.message} />

          <FormFields title='Email:' data={{ ...register('email') }} placeholder='Enter your email!' error={errors?.email?.message} />

          <FormFields title='Password:' data={{ ...register('password') }} placeholder='Enter your password!' error={errors?.password?.message} />

          <div className='text-center mb-2'>
            <button type='submit' className='bg-primary text-white border border-0 rounded p-2 w-75'>
              Register
            </button>
            <p className='m-0 py-3'>Already have an Account? <span className='text-primary login-registration-button' onClick={() => navigate('/login')}>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;





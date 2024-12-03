import React from 'react';

const FormFields = (props: any) => {
    const isPassword = props?.title === 'Password:';

    return (
        <div className='mb-3'>
            <p className='m-0 font-monospace fs-5'>{props?.title}</p>
            {isPassword ?
                <input {...props?.data}
                    className={`${props?.error ? 'error-inputs' : 'form-inputs'} w-100 rounded p-2`}
                    type='password'
                    placeholder={props?.placeholder}
                /> :
                <input {...props?.data}
                    className={`${props?.error ? 'error-inputs' : 'form-inputs'} w-100 rounded p-2`}
                    type='text'
                    placeholder={props?.placeholder}
                />
            }
            <p className='error-message font-monospace m-0 text-danger'>{props?.error}</p>
        </div>
    )
}

export default FormFields;

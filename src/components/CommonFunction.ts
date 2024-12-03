import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as yup from 'yup';

export const useProduct = (queryKey: string, queryFn: any) => {
    const { data } = useQuery({
        queryKey: [queryKey],
        queryFn: queryFn,
        staleTime: Infinity,
    });

    return data;
};

export const useProductMutation = (queryKey: string, queryFn: any) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: queryFn,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey as any);
        },
    });

    return mutation;
};

export const firstNameValidation: yup.StringSchema<string, yup.AnyObject, undefined, ''> = yup.string().required('First Name is required');

export const lastNameValidation: yup.StringSchema<string, yup.AnyObject, undefined, ''> = yup.string().required('Last Name is required');

export const emailValidation: yup.StringSchema<string, yup.AnyObject, undefined, ''> = yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^[a-z0-9]+@[a-z0-9]+\.[a-zA-Z]{2,4}$/, 'Invalid email format');

export const passwordValidation: yup.StringSchema<string, yup.AnyObject, undefined, ''> = yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).*$/,
        'Password must be strong.'
    );




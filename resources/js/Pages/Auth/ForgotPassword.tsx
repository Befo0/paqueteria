import InputError from '@/Components/Inputs/InputError';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Inputs/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link} from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Olvidaste tu contraseña? No te preocupes. Solo escribe tu dirección de correo y te enviaremos un correo con un link para cambiar la contraseña.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('main')}
                        className="inline-flex items-center rounded-lg border border-transparent bg-blue-800 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition duration-200 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
                    >
                        Volver
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar correo
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

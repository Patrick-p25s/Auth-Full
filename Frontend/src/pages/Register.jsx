import { RegisterForm } from "../features/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
